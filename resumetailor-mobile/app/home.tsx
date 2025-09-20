// // app/home.tsx
// import React, { useEffect, useState } from "react"
// import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context";

// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { Stack, useRouter } from "expo-router"
// import Markdown from "react-native-markdown-display"
// import Navabr from "../components/Navbar"
// import Navbar from "../components/Navbar";



// export default function HomeScreen() {
//   const [jobDescription, setJobDescription] = useState("")
//   const [resumeFile, setResumeFile] = useState<any>(null) // For now just text placeholder (file upload is separate in RN)
//   const [loading, setLoading] = useState(false)
//   const [suggestions, setSuggestions] = useState("")
//   const [error, setError] = useState("")
//   const [isAuthed, setIsAuthed] = useState(false)
//   const router = useRouter()

//   useEffect(() => {
//     const checkToken = async () => {
//       const tok = await AsyncStorage.getItem("token")
//       setIsAuthed(!!tok)
//     }
//     checkToken()
//   }, [])

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token")
//     setIsAuthed(false)
//     router.replace("/login")
//   }

//   const handleGenerate = async () => {
//     if (!resumeFile || !jobDescription.trim()) {
//       setError("Please upload a resume (not implemented yet) and paste a job description.")
//       return
//     }

//     setLoading(true)
//     setSuggestions("")
//     setError("")

//     try {
//       const token = await AsyncStorage.getItem("token")
//       const formData = new FormData()
//       formData.append("resume", {
//         uri: resumeFile.uri,
//         name: "resume.pdf",
//         type: "application/pdf",
//       } as any)
//       formData.append("jobDescription", jobDescription)

//       const response = await fetch("http://localhost:5000/api/generate-suggestions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       })

//       const text = await response.text()
//       let data
//       try {
//         data = JSON.parse(text)
//       } catch (e) {
//         throw new Error("Invalid response from server.")
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || `Error: ${response.status}`)
//       }

//       setSuggestions(data.suggestions || "No suggestions received.")
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
// <>
//     <Stack.Screen options={{ headerShown: false }} />
//       <SafeAreaView style={{ flex: 1 }}>

//         <Navbar/>
      
//     <ScrollView style={{ flex: 1, backgroundColor: "#f9f9ff", padding: 20 }}>
//       {/* Navbar */}
//       <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
//         <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1e3a8a" }}>ResumeTailor</Text>
//         {isAuthed && (
//           <TouchableOpacity onPress={handleLogout} style={{ padding: 8, backgroundColor: "#eee", borderRadius: 6 }}>
//             <Text style={{ color: "#333" }}>Logout</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Hero Section */}
//       <View style={{ marginBottom: 30 }}>
//         <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
//           Tailor Your Resume Instantly with AI
//         </Text>
//         <Text style={{ fontSize: 16, color: "#555", marginBottom: 20 }}>
//           Upload your resume, paste a job description, and get smart suggestions.
//         </Text>
//       </View>

//       {/* Job Description Input */}
//       <View style={{ marginBottom: 20 }}>
//         <Text style={{ fontWeight: "600", marginBottom: 6 }}>Job Description</Text>
//         <TextInput
//           multiline
//           placeholder="Paste the job description..."
//           value={jobDescription}
//           onChangeText={setJobDescription}
//           style={{
//             borderColor: "#ccc",
//             borderWidth: 1,
//             borderRadius: 8,
//             padding: 12,
//             minHeight: 100,
//             textAlignVertical: "top",
//           }}
//         />
//       </View>

//       {/* Error/Loading */}
//       {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}
//       {loading ? <ActivityIndicator size="large" color="#1e3a8a" style={{ marginBottom: 10 }} /> : null}

//       {/* Generate Button */}
//       <TouchableOpacity
//         onPress={handleGenerate}
//         style={{ backgroundColor: "#1e3a8a", padding: 16, borderRadius: 10, alignItems: "center" }}
//         disabled={loading}
//       >
//         <Text style={{ color: "white", fontSize: 16 }}>{loading ? "Processing..." : "Generate Suggestions"}</Text>
//       </TouchableOpacity>

//       {/* Results */}
//       {suggestions ? (
//         <View style={{ marginTop: 20, padding: 16, borderColor: "#1e3a8a", borderWidth: 1, borderRadius: 10 }}>
//           <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>💡 Tailored AI Suggestions</Text>
//           <Markdown>{suggestions}</Markdown>
//         </View>
//       ) : null}
//     </ScrollView>
//     </SafeAreaView>
//     </>
//   )
// }


// app/home.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import Markdown from "react-native-markdown-display";
import Navbar from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<any>(null); // TODO: file upload later
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const tok = await AsyncStorage.getItem("token");
      setIsAuthed(!!tok);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthed(false);
    router.replace("/login");
  };

  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError(
        "Please upload a resume (not implemented yet) and paste a job description."
      );
      return;
    }

    setLoading(true);
    setSuggestions("");
    setError("");

    try {
      const token = await AsyncStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", {
        uri: resumeFile.uri,
        name: "resume.pdf",
        type: "application/pdf",
      } as any);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "http://localhost:5000/api/generate-suggestions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok) {
        throw new Error(data?.message || `Error: ${response.status}`);
      }

      setSuggestions(data.suggestions || "No suggestions received.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#f8fafc", "#e0f2fe", "#eef2ff"]}
          style={{ flex: 1 }}
        >
          {/* Navbar */}
          <Navbar variant="homeBlock" />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>
                Tailor Your Resume Instantly with AI
              </Text>
              <Text style={styles.heroSubtitle}>
                Upload your resume, paste a job description, and get smart
                suggestions.
              </Text>
            </View>

            {/* Job Description Input */}
            <View style={styles.card}>
              <Text style={styles.label}>Job Description</Text>
              <TextInput
                multiline
                placeholder="Paste the job description..."
                value={jobDescription}
                onChangeText={setJobDescription}
                style={styles.textArea}
              />

              {/* Error/Loading */}
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#1e3a8a"
                  style={{ marginBottom: 10 }}
                />
              ) : null}

              {/* Generate Button */}
              <TouchableOpacity
                onPress={handleGenerate}
                style={[styles.button, loading && styles.disabledButton]}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Processing..." : "Generate Suggestions"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Results */}
            {suggestions ? (
              <View style={styles.resultsCard}>
                <Text style={styles.resultsTitle}>
                  💡 Tailored AI Suggestions
                </Text>
                <Markdown>{suggestions}</Markdown>
              </View>
            ) : null}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  
  scroll: { flex: 1, padding: 20 },
  hero: { marginBottom: 20 },
  heroTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  label: { fontWeight: "600", marginBottom: 6, color: "#374151" },
  textArea: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  errorText: { color: "#b91c1c", marginBottom: 10 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: { opacity: 0.7 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  resultsCard: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
});
