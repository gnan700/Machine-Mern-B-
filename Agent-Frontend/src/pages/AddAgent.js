import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  })
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState("")
  const [fileError, setFileError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]

    if (selectedFile) {
      const fileType = selectedFile.name.split(".").pop().toLowerCase()
      const allowedTypes = ["csv", "xlsx", "xls"]

      if (!allowedTypes.includes(fileType)) {
        setFileError("Invalid file type! Only CSV, XLSX, or XLS files are allowed.")
        setFile(null)
      } else {
        setFileError("")
        setFile(selectedFile)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")
  
    try {
      const agentResponse = await axios.post("https://machine-mern-b-zbgj.onrender.com/api/agents/add", formData)
      
      if (agentResponse.status === 201) {
        if (file) {
          const formDataFile = new FormData()
          formDataFile.append("file", file)
          const uploadResponse = await axios.post("https://machine-mern-b-zbgj.onrender.com/api/upload/upload-file", formDataFile, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          if (uploadResponse.status === 200) {
            setMessage("Agent added & file uploaded successfully!")
          }
        } else {
          setMessage("Agent added successfully!")
        }
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Error adding agent or uploading file.")
      } else {
        setMessage("Server not reachable.")
      }
      console.error("Add Agent Error:", error)
    }
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add Agent</h1>

      {message && <p className="text-red-500 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded"/>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Mobile</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-2 border rounded"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded"/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload CSV/XLSX File (Optional)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls"
            className="w-full p-2 border rounded"
          />
          {fileError && <p className="text-red-500">{fileError}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Add Agent & Upload File
        </button>
      </form>
    </div>
  )
}

export default AddAgent
