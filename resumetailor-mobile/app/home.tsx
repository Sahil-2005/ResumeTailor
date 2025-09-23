import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import Navbar from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🔑 Import AsyncStorage

export default function HomeScreen() {
  // const [jobDescription, setJobDescription] = useState("");
  // const [resumeFile, setResumeFile] = useState<any>(null);

  // // Handle Resume Upload
  // const handleUpload = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  //       copyToCacheDirectory: true,
  //     });

  //     if (result.canceled) return; // user cancelled

  //     setResumeFile(result.assets?.[0] || result);
  //     Alert.alert("File Selected", `You picked: ${result.assets?.[0]?.name || "Unknown file"}`);
  //   } catch (err) {
  //     console.error(err);
  //     Alert.alert("Error", "Failed to pick a file");
  //   }
  // };

  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [error, setError] = useState("");

  // Handle Resume Upload
  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) return; // user cancelled

      setResumeFile(result.assets?.[0] || result);
      Alert.alert(
        "File Selected",
        `You picked: ${result.assets?.[0]?.name || "Unknown file"}`
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to pick a file");
    }
  };

  // 🔑 Handle Generate Suggestions (backend call with AsyncStorage)
  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      Alert.alert(
        "Error",
        "Please upload a resume and paste a job description."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuggestions("");

      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", {
        uri: resumeFile.uri,
        name: resumeFile.name || "resume.pdf",
        type: resumeFile.mimeType || "application/pdf",
      } as any);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "http://192.168.1.103:5000/api/generate-suggestions",
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
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
      console.error("Fetch error:", err);
      setError(err.message);
      Alert.alert("Error", err.message);
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
              <View style={styles.heroGraphic}>
                <Ionicons
                  name="document-text-outline"
                  size={80}
                  color="#2563eb"
                />
              </View>
            </View>

            {/* How It Works */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              <View style={styles.stepRow}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color="#2563eb"
                />
                <Text style={styles.stepText}>Upload your resume</Text>
              </View>
              <View style={styles.stepRow}>
                <Ionicons name="briefcase-outline" size={32} color="#2563eb" />
                <Text style={styles.stepText}>Paste the job description</Text>
              </View>
              <View style={styles.stepRow}>
                <Ionicons name="sparkles-outline" size={32} color="#2563eb" />
                <Text style={styles.stepText}>Get AI-powered suggestions</Text>
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
                  <Ionicons
                    name="checkmark-done-outline"
                    size={28}
                    color="#2563eb"
                  />
                  <Text style={styles.cardText}>Improve Success Rate</Text>
                </View>
                <View style={styles.card}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={28}
                    color="#2563eb"
                  />
                  <Text style={styles.cardText}>Secure & Private</Text>
                </View>
              </View>
            </View>

            {/* Try It Now */}
            {/* <View style={styles.section}>
              <Text style={styles.sectionTitle}>Try It Now</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.uploadText}>
                  {resumeFile ? resumeFile.name : "Upload Resume"}
                </Text>
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
            </View> */}
            {/* Try It Now */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Try It Now</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
              >
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.uploadText}>
                  {resumeFile ? resumeFile.name : "Upload Resume"}
                </Text>
              </TouchableOpacity>

              <TextInput
                multiline
                placeholder="Paste the job description..."
                value={jobDescription}
                onChangeText={setJobDescription}
                style={styles.textArea}
              />

              {error ? (
                <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
              ) : null}
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#2563eb"
                  style={{ marginBottom: 10 }}
                />
              )}

              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerate}
                disabled={loading}
              >
                <Text style={styles.generateText}>
                  {loading ? "Processing..." : "Generate Suggestions"}
                </Text>
              </TouchableOpacity>

              {suggestions ? (
                <View style={styles.suggestionBox}>
                  <Text style={styles.suggestionTitle}>💡 AI Suggestions</Text>
                  {suggestions
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, idx) => (
                      <Text key={idx} style={styles.suggestionText}>
                        {line.startsWith("-") || line.startsWith("•")
                          ? `• ${line.replace(/^[-•]\s*/, "")}`
                          : line}
                      </Text>
                    ))}
                </View>
              ) : null}
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

  suggestionBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
  },
  suggestionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    color: "#111827",
  },
  suggestionText: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 22,
  },

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
