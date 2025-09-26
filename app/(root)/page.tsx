import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Reusable Card component


type InterviewCardProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

function InterviewCard({ title, description, buttonText, href }: InterviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-88">
      <h3 className="text-blue-600 font-semibold mb-2">{title}</h3>
      <p className="mb-3 text-gray-800 text-sm">{description}</p>
      <Link href={href}>
        <Button className="btn-primary text-sm">{buttonText}</Button>
      </Link>
    </div>
  );
}


export default function Home() {
  return (
    <>
      <section className="card-cta ">
        <div className="flex flex-col gap-4 max-w-lg ">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>
          <Link href="/interview">
            <Button className="btn">Start Interview</Button>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src="/robot.png"
            alt="AI Interview Assistant"
            width={400}
            height={400}
          />
        </div>
      </section>

      {/* New Cards Section */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-6">Explore More</h2>
        <div className="flex flex-wrap gap-6">
          <InterviewCard
            title="Behavioral Interview Prep"
            description="Practice common behavioral questions and improve your soft skills."
            buttonText="Start Behavioral"
            href="/behavioral"
          />
          <InterviewCard
            title="Technical Interview Questions"
            description="Solve coding problems and technical questions ."
            buttonText="Start Technical"
            href="/codeeditor"
          />
          <InterviewCard
            title="Mock Interviews"
            description="Simulate real interviews with AI-powered feedback."
            buttonText="Start Mock Interview"
            href="/mock"
          />
        </div>
      </section>
    </>
  );
}
