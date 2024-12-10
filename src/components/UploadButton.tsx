import React from "react";

interface UploadButtonProps {
  onUpload: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10 }}>
      {/* Invisible file input */}
      <input
        type="file"
        accept=".ifc,.frag"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      {/* Button to trigger file input */}
      <label htmlFor="file-upload">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload File
        </button>
      </label>
    </div>
  );
};

export default UploadButton;
