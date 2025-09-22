// // app/home.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Stack, useRouter } from "expo-router";
// import Markdown from "react-native-markdown-display";
// import Navbar from "../components/Navbar";
// import { LinearGradient } from "expo-linear-gradient";

// export default function HomeScreen() {
//   const [jobDescription, setJobDescription] = useState("");
//   const [resumeFile, setResumeFile] = useState<any>(null); // TODO: file upload later
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState("");
//   const [error, setError] = useState("");
//   const [isAuthed, setIsAuthed] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const checkToken = async () => {
//       const tok = await AsyncStorage.getItem("token");
//       setIsAuthed(!!tok);
//     };
//     checkToken();
//   }, []);

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("token");
//     setIsAuthed(false);
//     router.replace("/login");
//   };

//   const handleGenerate = async () => {
//     if (!resumeFile || !jobDescription.trim()) {
//       setError(
//         "Please upload a resume (not implemented yet) and paste a job description."
//       );
//       return;
//     }

//     setLoading(true);
//     setSuggestions("");
//     setError("");

//     try {
//       const token = await AsyncStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("resume", {
//         uri: resumeFile.uri,
//         name: "resume.pdf",
//         type: "application/pdf",
//       } as any);
//       formData.append("jobDescription", jobDescription);

//       const response = await fetch(
//         "http://localhost:5000/api/generate-suggestions",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (e) {
//         throw new Error("Invalid response from server.");
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || `Error: ${response.status}`);
//       }

//       setSuggestions(data.suggestions || "No suggestions received.");
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <SafeAreaView style={{ flex: 1 }}>
//         <LinearGradient
//           colors={["#f8fafc", "#e0f2fe", "#eef2ff"]}
//           style={{ flex: 1 }}
//         >
//           {/* Navbar */}
//           <Navbar variant="homeBlock" />

//           <ScrollView
//             style={styles.scroll}
//             contentContainerStyle={{ paddingBottom: 40 }}
//           >
//             {/* Hero Section */}
//             <View style={styles.hero}>
//               <Text style={styles.heroTitle}>
//                 Tailor Your Resume Instantly with AI
//               </Text>
//               <Text style={styles.heroSubtitle}>
//                 Upload your resume, paste a job description, and get smart
//                 suggestions.
//               </Text>
//             </View>

//             {/* Job Description Input */}
//             <View style={styles.card}>
//               <Text style={styles.label}>Job Description</Text>
//               <TextInput
//                 multiline
//                 placeholder="Paste the job description..."
//                 value={jobDescription}
//                 onChangeText={setJobDescription}
//                 style={styles.textArea}
//               />

//               {/* Error/Loading */}
//               {error ? (
//                 <Text style={styles.errorText}>{error}</Text>
//               ) : null}
//               {loading ? (
//                 <ActivityIndicator
//                   size="large"
//                   color="#1e3a8a"
//                   style={{ marginBottom: 10 }}
//                 />
//               ) : null}

//               {/* Generate Button */}
//               <TouchableOpacity
//                 onPress={handleGenerate}
//                 style={[styles.button, loading && styles.disabledButton]}
//                 disabled={loading}
//               >
//                 <Text style={styles.buttonText}>
//                   {loading ? "Processing..." : "Generate Suggestions"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Results */}
//             {suggestions ? (
//               <View style={styles.resultsCard}>
//                 <Text style={styles.resultsTitle}>
//                   💡 Tailored AI Suggestions
//                 </Text>
//                 <Markdown>{suggestions}</Markdown>
//               </View>
//             ) : null}
//           </ScrollView>
//         </LinearGradient>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
  
//   scroll: { flex: 1, padding: 20 },
//   hero: { marginBottom: 20 },
//   heroTitle: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#111827",
//     textAlign: "center",
//   },
//   heroSubtitle: {
//     fontSize: 15,
//     color: "#4b5563",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//     marginBottom: 20,
//   },
//   label: { fontWeight: "600", marginBottom: 6, color: "#374151" },
//   textArea: {
//     borderColor: "#d1d5db",
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     minHeight: 100,
//     textAlignVertical: "top",
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   errorText: { color: "#b91c1c", marginBottom: 10 },
//   button: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   disabledButton: { opacity: 0.7 },
//   buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
//   resultsCard: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   resultsTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#111827",
//   },
// });


// app/home.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={["#f8fafc", "#e0f2fe", "#eef2ff"]}
          style={{ flex: 1 }}
        >
          <Navbar />

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            {/* Hero Section */}
            <View style={styles.hero}>
              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>
                  Optimize Your Resume with AI
                </Text>
                <Text style={styles.heroSubtitle}>
                  Land your dream job with tailored resume suggestions powered
                  by AI.
                </Text>
                <TouchableOpacity style={styles.heroButton}>
                  <Text style={styles.heroButtonText}>Get Started</Text>
                </TouchableOpacity>
              </View>
              {/* Right side graphic placeholder */}
              <View style={styles.heroGraphic}>
                <Ionicons name="document-text-outline" size={80} color="#2563eb" />
              </View>
            </View>

            {/* How It Works */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              <View style={styles.stepRow}>
                <Ionicons name="cloud-upload-outline" size={32} color="#2563eb" />
                <Text style={styles.stepText}>Upload your resume</Text>
              </View>
              <View style={styles.stepRow}>
                <Ionicons name="briefcase-outline" size={32} color="#2563eb" />
                <Text style={styles.stepText}>
                  Paste the job description
                </Text>
              </View>
              <View style={styles.stepRow}>
                <Ionicons name="sparkles-outline" size={32} color="#2563eb" />
                <Text style={styles.stepText}>
                  Get AI-powered suggestions
                </Text>
              </View>
            </View>

            {/* Why Use */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why Use ResumeTailor?</Text>
              <View style={styles.grid}>
                <View style={styles.card}>
                  <Ionicons name="bulb-outline" size={28} color="#2563eb" />
                  <Text style={styles.cardText}>Smart AI Insights</Text>
                </View>
                <View style={styles.card}>
                  <Ionicons name="time-outline" size={28} color="#2563eb" />
                  <Text style={styles.cardText}>Save Time</Text>
                </View>
                <View style={styles.card}>
                  <Ionicons name="checkmark-done-outline" size={28} color="#2563eb" />
                  <Text style={styles.cardText}>Improve Success Rate</Text>
                </View>
                <View style={styles.card}>
                  <Ionicons name="shield-checkmark-outline" size={28} color="#2563eb" />
                  <Text style={styles.cardText}>Secure & Private</Text>
                </View>
              </View>
            </View>

            {/* Try It Now */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Try It Now</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.uploadText}>Upload Resume</Text>
              </TouchableOpacity>

              <TextInput
                multiline
                placeholder="Paste the job description..."
                value={jobDescription}
                onChangeText={setJobDescription}
                style={styles.textArea}
              />

              <TouchableOpacity style={styles.generateButton}>
                <Text style={styles.generateText}>Generate Suggestions</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                © 2025 ResumeTailor. All rights reserved.
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, padding: 20 },

  /* Hero */
  hero: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  heroSubtitle: { fontSize: 16, color: "#4b5563", marginBottom: 16 },
  heroButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: 160,
  },
  heroButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  heroGraphic: { marginLeft: 20 },

  /* Sections */
  section: { marginBottom: 40 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },

  /* Steps */
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stepText: { marginLeft: 10, fontSize: 16, color: "#374151" },

  /* Grid (Why Use) */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "47%",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: { marginTop: 10, fontWeight: "500", color: "#374151" },

  /* Try It Now */
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  uploadText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
  textArea: {
    borderColor: "#d1d5db",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  generateButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  generateText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  /* Footer */
  footer: {
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  footerText: { fontSize: 12, color: "#6b7280" },
});
