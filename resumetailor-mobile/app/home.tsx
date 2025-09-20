// app/home.tsx
import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router"
import Markdown from "react-native-markdown-display"

export default function HomeScreen() {
  const [jobDescription, setJobDescription] = useState("")
  const [resumeFile, setResumeFile] = useState<any>(null) // For now just text placeholder (file upload is separate in RN)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState("")
  const [error, setError] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const tok = await AsyncStorage.getItem("token")
      setIsAuthed(!!tok)
    }
    checkToken()
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    setIsAuthed(false)
    router.replace("/login")
  }

  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume (not implemented yet) and paste a job description.")
      return
    }

    setLoading(true)
    setSuggestions("")
    setError("")

    try {
      const token = await AsyncStorage.getItem("token")
      const formData = new FormData()
      formData.append("resume", {
        uri: resumeFile.uri,
        name: "resume.pdf",
        type: "application/pdf",
      } as any)
      formData.append("jobDescription", jobDescription)

      const response = await fetch("http://localhost:5000/api/generate-suggestions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const text = await response.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        throw new Error("Invalid response from server.")
      }

      if (!response.ok) {
        throw new Error(data?.message || `Error: ${response.status}`)
      }

      setSuggestions(data.suggestions || "No suggestions received.")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f9f9ff", padding: 20 }}>
      {/* Navbar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1e3a8a" }}>ResumeTailor</Text>
        {isAuthed && (
          <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: "#eee", borderRadius: 6 }}>
            <Text style={{ color: "#333" }}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Hero Section */}
      <View style={{ marginBottom: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
          Tailor Your Resume Instantly with AI
        </Text>
        <Text style={{ fontSize: 16, color: "#555", marginBottom: 20 }}>
          Upload your resume, paste a job description, and get smart suggestions.
        </Text>
      </View>

      {/* Job Description Input */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>Job Description</Text>
        <TextInput
          multiline
          placeholder="Paste the job description..."
          value={jobDescription}
          onChangeText={setJobDescription}
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            minHeight: 100,
            textAlignVertical: "top",
          }}
        />
      </View>

      {/* Error/Loading */}
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#1e3a8a" style={{ marginBottom: 10 }} /> : null}

      {/* Generate Button */}
      <TouchableOpacity
        onPress={handleGenerate}
        style={{ backgroundColor: "#1e3a8a", padding: 16, borderRadius: 10, alignItems: "center" }}
        disabled={loading}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{loading ? "Processing..." : "Generate Suggestions"}</Text>
      </TouchableOpacity>

      {/* Results */}
      {suggestions ? (
        <View style={{ marginTop: 20, padding: 16, borderColor: "#1e3a8a", borderWidth: 1, borderRadius: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>💡 Tailored AI Suggestions</Text>
          <Markdown>{suggestions}</Markdown>
        </View>
      ) : null}
    </ScrollView>
  )
}
