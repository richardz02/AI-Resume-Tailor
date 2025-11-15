"use client";

import Form from "@/components/Form";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const model = "gemini-2.5-pro";
const systemInstruction = "Tailor resume to match the job description";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleFormSubmit = async (formData: {
    resumeDetails: string;
    jobDescription: string;
  }) => {
    setLoading(true);
    const result = await ai.models.generateContent({
      model: model,
      contents: JSON.stringify(formData),
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const outputText = result.text ?? "";
    setResponse(outputText);
    setLoading(false);

    console.log(outputText);
  };

  return (
    <>
      <div>
        <Form handleFormSubmit={handleFormSubmit} />

        {loading && <p>Loading...</p>}
        {response && <ReactMarkdown>{response}</ReactMarkdown>}
      </div>
    </>
  );
}
