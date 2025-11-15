import { useState } from "react";

type Props = {
  handleFormSubmit: (data: {
    resumeDetails: string;
    jobDescription: string;
  }) => Promise<void>;
};

export default function Form({ handleFormSubmit }: Props) {
  const [resumeDetails, setResumeDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  // handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeDetails || !jobDescription) {
      console.error("Fill in the boxes");
      return;
    }

    handleFormSubmit({ resumeDetails, jobDescription });

    setResumeDetails("");
    setJobDescription("");
  };

  // Clear out input fields
  const handleClear = () => {
    setResumeDetails("");
    setFile(null);
    setJobDescription("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="input-form">
        <p>Upload or paste your resume here</p>
        <textarea
          className="input"
          placeholder="Paste resume details here"
          value={resumeDetails}
          onChange={(e) => setResumeDetails(e.target.value)}
        ></textarea>

        <label htmlFor="resume-upload">Choose file:</label>
        <input
          disabled={!resumeDetails}
          type="file"
          id="resume-upload"
          multiple
          accept=".pdf, .docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <textarea
          className="input"
          placeholder="Enter job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <button className="submit btn">Submit</button>
        <button className="clear btn" type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </>
  );
}
