import React, { useState } from "react"
import axios from "axios"

const UploadCSV = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.")
      return
    }
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await axios.post("http://localhost:5000/api/upload/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setMessage(response.data.message)
    } catch (error) {
      setMessage(error.response?.data?.error || "Error uploading file")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Upload CSV</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <input type="file" onChange={handleFileChange} className="border p-2 rounded"/>
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default UploadCSV
