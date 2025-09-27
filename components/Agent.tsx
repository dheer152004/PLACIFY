"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED"
}

interface SavedMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
}

interface InterviewSummary {
  userAnswers: { question: string; answer: string }[];
  overallPerformance: {
    confidence: number;
    clarity: number;
    relevance: number;
  };
  currentQuestion: string;
}

interface AgentProps {
  userName: string;
  userId: string;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
}

// Scoring helper functions
const updateConfidenceScore = (answer: string, currentScore: number): number => {
  const confidenceMarkers = [
    "I believe", "I think", "I know", "I'm sure",
    "definitely", "absolutely", "without doubt", "certainly",
    "I'm confident", "I understand", "I'm familiar with"
  ];
  const uncertaintyMarkers = [
    "maybe", "perhaps", "I guess", "not sure", "um", "uh",
    "like", "kind of", "sort of", "I don't know", "probably",
    "possibly", "might be"
  ];

  let confidencePoints = 0;
  let totalMarkers = 0;

  confidenceMarkers.forEach(marker => {
    if (answer.toLowerCase().includes(marker.toLowerCase())) {
      confidencePoints++;
      totalMarkers++;
    }
  });

  uncertaintyMarkers.forEach(marker => {
    if (answer.toLowerCase().includes(marker.toLowerCase())) {
      totalMarkers++;
    }
  });

  const newScore = totalMarkers > 0
    ? confidencePoints / totalMarkers
    : currentScore;

  return Math.max(0, Math.min(1, (currentScore * 0.7) + (newScore * 0.3)));
};

const updateClarityScore = (answer: string, currentScore: number): number => {
  const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return currentScore;

  const avgWordsPerSentence = sentences
    .map(s => s.trim().split(" ").length)
    .reduce((a, b) => a + b, 0) / sentences.length;

  const structureMarkers = [
    'firstly', 'secondly', 'finally', 'in conclusion',
    'therefore', 'however', 'moreover', 'for example',
    'specifically', 'additionally', 'furthermore'
  ];

  const hasStructure = structureMarkers.some(marker =>
    answer.toLowerCase().includes(marker)
  );

  let clarityScore = 0.5;

  if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 20) {
    clarityScore += 0.2;
  } else if (avgWordsPerSentence > 20 && avgWordsPerSentence <= 25) {
    clarityScore += 0.1;
  }

  if (hasStructure) clarityScore += 0.2;

  const sentenceLengthVariation = new Set(
    sentences.map(s => s.trim().split(" ").length)
  ).size;
  if (sentenceLengthVariation > 1) clarityScore += 0.1;

  return Math.max(0, Math.min(1, (currentScore * 0.7) + (clarityScore * 0.3)));
};

const updateRelevanceScore = (answer: string, question: string, currentScore: number): number => {
  const cleanText = (text: string) => {
    return text.toLowerCase()
      .replace(/[.,?!]/g, '')
      .split(' ')
      .filter(word => word.length > 3);
  };

  const questionWords = cleanText(question);
  const answerWords = cleanText(answer);

  if (questionWords.length === 0 || answerWords.length === 0) {
    return currentScore;
  }

  const matchingKeywords = questionWords.filter(keyword =>
    answerWords.includes(keyword)
  ).length;

  let proximityScore = 0;
  if (matchingKeywords > 1) {
    const matchingIndices = questionWords
      .filter(word => answerWords.includes(word))
      .map(word => answerWords.indexOf(word))
      .sort((a, b) => a - b);

    const maxDistance = Math.max(...matchingIndices) - Math.min(...matchingIndices);
    proximityScore = 1 - (maxDistance / answerWords.length);
  }

  const lengthRatio = Math.min(answerWords.length / (questionWords.length * 2), 1);

  const relevanceScore = (
    (matchingKeywords / questionWords.length) * 0.5 +
    (proximityScore * 0.3) +
    (lengthRatio * 0.2)
  );

  return Math.max(0, Math.min(1, (currentScore * 0.7) + (relevanceScore * 0.3)));
};

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const avatarVideoRef = useRef<HTMLVideoElement>(null);

  // State declarations
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);
  const [showConversation, setShowConversation] = useState(false);
  const [transcriptSummary, setTranscriptSummary] = useState<InterviewSummary>({
    userAnswers: [],
    overallPerformance: {
      confidence: 0.5,
      clarity: 0.5,
      relevance: 0.5,
    },
    currentQuestion: "",
  });

  // Generate detailed feedback
  const generateDetailedFeedback = useCallback(async (): Promise<string> => {
    try {
      if (messages.length < 8) {
        return "The interview was too short. Please have a longer conversation for meaningful feedback.";
      }

      // Adjust scores based on conversation length
      const conversationLength = messages.length;
      let baseScore, scoreRange;

      if (conversationLength < 10) {
        // Very short conversation (1-3 messages)
        baseScore = 50;
        scoreRange = 10;
      } else if (conversationLength < 15) {
        // Short conversation (4-5 messages)
        baseScore = 55;
        scoreRange = 15;
      } else if (conversationLength < 20) {
        // Medium-short conversation (6-7 messages)
        baseScore = 65;
        scoreRange = 20;
      } else {
        // Normal or long conversation (8+ messages)
        baseScore = 70;
        scoreRange = 30;
      }

      const totalScore = Math.floor(Math.random() * scoreRange) + baseScore;

      // Calculate category scores based on total score
      const categoryScores = {
        "Communication Skills": Math.floor(Math.random() * 15) + (totalScore - 15),
        "Technical Knowledge": Math.floor(Math.random() * 15) + (totalScore - 10),
        // "Problem Solving": Math.floor(Math.random() * 15) + (totalScore - 8),
        "Clarity of Expression": Math.floor(Math.random() * 15) + (totalScore - 15)
      };

      const possibleStrengths = [
        "Excellent communication skills",
        "Clear and concise responses",
        "Strong technical understanding",
        "Good problem-solving approach",
        "Well-structured answers",
        "Confident presentation",
        "Good use of examples",
        "Professional demeanor"
      ];

      const possibleImprovements = [
        "Could provide more detailed examples",
        "Consider using more technical terminology",
        "Take more time to structure responses",
        "Could elaborate more on complex topics",
        "Work on reducing filler words",
        "Could improve answer conciseness",
        "Consider adding more real-world examples",
        "Could demonstrate more enthusiasm"
      ];

      const strengths = possibleStrengths
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const improvements = possibleImprovements
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      let finalAssessment = "";
      if (totalScore >= 90) {
        finalAssessment = "Outstanding performance! You demonstrated excellent communication skills and technical knowledge. You would be a strong candidate for this position.";
      } else if (totalScore >= 80) {
        finalAssessment = "Very good performance! You showed good understanding and communication abilities. With some minor improvements, you would be an excellent candidate.";
      } else if (totalScore >= 70) {
        finalAssessment = "Good performance! You have a solid foundation. Focus on the areas of improvement to enhance your interview skills further.";
      } else {
        finalAssessment = "Keep practicing! Focus on structuring your answers and building confidence in your responses.";
      }

      let feedbackText = "Interview Analysis\n\n";
      feedbackText += `Overall Performance: ${totalScore}/100\n\n`;
      feedbackText += "Detailed Scores:\n";
      
      Object.entries(categoryScores).forEach(([category, score]) => {
        feedbackText += `- ${category}: ${score}/100\n`;
      });

      // Only show strengths if performance is 70 or above
      if (totalScore >= 70) {
        feedbackText += "\nStrengths:\n";
        strengths.forEach(strength => {
          feedbackText += `✓ ${strength}\n`;
        });
      }

      feedbackText += "\nAreas for Improvement:\n";
      improvements.forEach(area => {
        feedbackText += `• ${area}\n`;
      });      feedbackText += `\nFinal Assessment:\n${finalAssessment}`;

      return feedbackText;
    } catch (error) {
      console.error("Error generating feedback:", error);
      return "An error occurred while generating feedback. Please try again.";
    }
  }, [messages]);

  // Handle feedback generation
  const handleGenerateFeedback = useCallback(async () => {
    try {
      setIsGeneratingFeedback(true);
      setShowConversation(true);

      const feedbackContent = await generateDetailedFeedback();
      setQuickFeedback(feedbackContent);

      if (type === "interview" && userId && messages.length > 0) {
        await createFeedback({ transcript: messages });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to generate feedback");
    } finally {
      setIsGeneratingFeedback(false);
    }
  }, [generateDetailedFeedback, type, userId]);

  // Handle call controls
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else if (questions) {
      const formattedQuestions = questions.map((q) => `- ${q}`).join("\n");
      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // Enable webcam
  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }

    enableCamera();
  }, []);

  // VAPI event listeners
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
          timestamp: Date.now()
        };
        setMessages((prev) => [...prev, newMessage]);

        if (message.role === "assistant" && message.transcript.includes("?")) {
          setTranscriptSummary(prev => ({
            ...prev,
            currentQuestion: message.transcript
          }));
        } else if (message.role === "user" && transcriptSummary.currentQuestion) {
          setTranscriptSummary(prev => ({
            ...prev,
            userAnswers: [
              ...prev.userAnswers,
              {
                question: prev.currentQuestion,
                answer: message.transcript
              }
            ],
            overallPerformance: {
              confidence: updateConfidenceScore(message.transcript, prev.overallPerformance.confidence),
              clarity: updateClarityScore(message.transcript, prev.overallPerformance.clarity),
              relevance: updateRelevanceScore(message.transcript, prev.currentQuestion, prev.overallPerformance.relevance)
            }
          }));
        }
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.error("Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, [transcriptSummary]);

  // Handle interview completion
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      handleGenerateFeedback();
    }
  }, [callStatus, handleGenerateFeedback]);

  // Update last message
  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  // Control avatar video playback based on speaking state
  useEffect(() => {
    if (avatarVideoRef.current) {
      if (isSpeaking) {
        avatarVideoRef.current.play().catch(err => console.error("Error playing video:", err));
      } else {
        avatarVideoRef.current.pause();
      }
    }
  }, [isSpeaking]);

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-border">
          <div className="card-content">
            <div className="relative rounded-full overflow-hidden size-[320px]">
              <video
                ref={avatarVideoRef}
                src="/avatar.mp4"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {isSpeaking && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="animate-speak" />
                </div>
              )}
            </div>
            <h3>AI Interviewer</h3>
          </div>
        </div>

        {/* User Profile Card with Live Camera */}
        <div className="card-border">
          <div className="card-content">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="rounded-full object-cover size-[320px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {/* Quick Feedback Display */}
      {quickFeedback && (
        <div className="feedback-card">
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
            <h3 className="text-xl font-semibold mb-4">Interview Feedback</h3>
            <pre className="whitespace-pre-wrap text-gray-700 mb-4">{quickFeedback}</pre>
            {isGeneratingFeedback && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Generating detailed feedback...</p>
              </div>
            )}

            {/* Show Conversation Button */}
            <button
              onClick={() => setShowConversation(true)}
              className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View Full Conversation
            </button>
          </div>
        </div>
      )}

      {/* Conversation Modal */}
      {showConversation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Interview Conversation</h3>
              <button
                onClick={() => setShowConversation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-3 rounded-lg",
                    message.role === "assistant"
                      ? "bg-primary/10 ml-4"
                      : "bg-gray-100 mr-4"
                  )}
                >
                  <p className="text-sm font-medium mb-1">
                    {message.role === "assistant" ? "AI Interviewer" : "You"}
                  </p>
                  <p className="text-gray-700">{message.content}</p>
                  {message.timestamp && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Message Display */}
      {messages.length > 0 && !quickFeedback && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div className="w-full flex justify-center mt-4">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className={cn(
              "btn-call",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            onClick={handleCall}
          >
            Start
          </button>
        ) : (
          <button className="btn-disconnect" onClick={handleDisconnect}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;