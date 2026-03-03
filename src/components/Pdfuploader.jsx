import React, { useState } from "react";

const PdfUploader = () => {
  const [pdfText, setPdfText] = useState("");

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload/pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        console.log("Extracted text:", data.text);
        setPdfText(data.text); // display in UI
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (err) {
      console.error("Error uploading PDF:", err);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
        {pdfText}
      </div>
    </div>
  );
};

export default PdfUploader;