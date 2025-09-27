export const codeQuestions = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    testCases: [
      {
        input: "[2,7,11,15], 9",
        output: "[0,1]"
      },
      {
        input: "[3,2,4], 6",
        output: "[1,2]"
      }
    ],
    starterCode: {
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}`
    }
  },
  {
    id: "2",
    title: "Palindrome Number",
    difficulty: "Easy",
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.
An integer is a palindrome when it reads the same forward and backward.

Example:
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.`,
    testCases: [
      {
        input: "121",
        output: "true"
      },
      {
        input: "-121",
        output: "false"
      }
    ],
    starterCode: {
      python: `def is_palindrome(x):
    # Your code here
    pass`,
      javascript: `function isPalindrome(x) {
    // Your code here
}`,
      java: `public class Solution {
    public boolean isPalindrome(int x) {
        // Your code here
        return false;
    }
}`,
      cpp: `bool isPalindrome(int x) {
    // Your code here
}`
    }
  },
  {
    id: "3",
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.
Given n, calculate F(n).

Example:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3`,
    testCases: [
      {
        input: "4",
        output: "3"
      },
      {
        input: "8",
        output: "21"
      }
    ],
    starterCode: {
      python: `def fibonacci(n):
    # Your code here
    pass`,
      javascript: `function fibonacci(n) {
    // Your code here
}`,
      java: `public class Solution {
    public int fibonacci(int n) {
        // Your code here
        return 0;
    }
}`,
      cpp: `int fibonacci(int n) {
    // Your code here
}`
    }
  },
  {
    id: "4",
    title: "Reverse String",
    difficulty: "Easy",
    description: `Write a function that reverses a string. The input is given as an array of characters s.
You must do this by modifying the input array in-place with O(1) extra memory.

Example:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]`,
    testCases: [
      {
        input: '["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]'
      },
      {
        input: '["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    starterCode: {
      python: `def reverse_string(s):
    # Your code here
    pass`,
      javascript: `function reverseString(s) {
    // Your code here
}`,
      java: `public class Solution {
    public void reverseString(char[] s) {
        // Your code here
    }
}`,
      cpp: `void reverseString(vector<char>& s) {
    // Your code here
}`
    }
  },
  {
    id: "5",
    title: "FizzBuzz",
    difficulty: "Easy",
    description: `Given an integer n, return a string array answer (1-indexed) where:
- answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
- answer[i] == "Fizz" if i is divisible by 3.
- answer[i] == "Buzz" if i is divisible by 5.
- answer[i] == i (as a string) if none of the above conditions are true.

Example:
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]`,
    testCases: [
      {
        input: "5",
        output: '["1","2","Fizz","4","Buzz"]'
      },
      {
        input: "15",
        output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]'
      }
    ],
    starterCode: {
      python: `def fizz_buzz(n):
    # Your code here
    pass`,
      javascript: `function fizzBuzz(n) {
    // Your code here
}`,
      java: `public class Solution {
    public List<String> fizzBuzz(int n) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      cpp: `vector<string> fizzBuzz(int n) {
    // Your code here
}`
    }
  }
];