// // resumetailor-mobile/pages/Register.tsx
// import React, { useState } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native"
// import { useNavigation } from "@react-navigation/native"
// import { Ionicons } from "@expo/vector-icons"
// import { router } from "expo-router"

// export default function Register() {
//   const [fullName, setFullName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const navigation = useNavigation()

//   const handleSubmit = async () => {
//     if (!fullName || !email || !password) {
//       Alert.alert("Error", "Please fill in all fields")
//       return
//     }

//     setLoading(true)
//     try {
//       const res = await fetch("http://192.168.1.103:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fullName, email, password }),
//       })
//       const data = await res.json()

//       if (!res.ok) throw new Error(data.message || "Registration failed")

//       Alert.alert("Success", "Registration successful! Please login.")
//       // navigation.navigate("Login" as never)
//       router.push("/login");
//     } catch (err: any) {
//       Alert.alert("Error", err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create your account</Text>
//       <Text style={styles.subtitle}>
//         Join professionals landing jobs with AI-powered resumes
//       </Text>

//       {/* Full Name */}
//       <View style={styles.inputWrapper}>
//         <Ionicons name="person-outline" size={20} color="#888" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="John Doe"
//           value={fullName}
//           onChangeText={setFullName}
//         />
//       </View>

//       {/* Email */}
//       <View style={styles.inputWrapper}>
//         <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="you@example.com"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
//         />
//       </View>

//       {/* Password */}
//       <View style={styles.inputWrapper}>
//         <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="••••••••"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <Ionicons
//             name={showPassword ? "eye-off-outline" : "eye-outline"}
//             size={20}
//             color="#888"
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Register Button */}
//       <TouchableOpacity
//         style={[styles.button, loading && styles.disabledButton]}
//         onPress={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>Create Account</Text>
//         )}
//       </TouchableOpacity>

//       {/* Login Link */}
//       <TouchableOpacity onPress={() => router.push("/login")}>
//         <Text style={styles.link}>Already have an account? Sign in</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f8faff" },
//   title: { fontSize: 26, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
//   subtitle: { fontSize: 14, color: "#666", marginBottom: 20, textAlign: "center" },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   icon: { marginRight: 6 },
//   input: { flex: 1, height: 45 },
//   button: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   disabledButton: { opacity: 0.7 },
//   buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
//   link: { color: "#2563eb", textAlign: "center" },
// })



// resumetailor-mobile/pages/Register.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import Navbar from "@/components/Navbar";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.104:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      Alert.alert("Success", "Registration successful! Please login.");
      router.push("/login");
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
          style={styles.container}
        >
          {/* Navbar */}
          {/* <View style={styles.navbar}>
            <View style={styles.navLeft}>
              <Ionicons
                name="document-text-outline"
                size={26}
                color="#2563eb"
              />
              <Text style={styles.logoText}>ResumeTailor</Text>
            </View>
            <View style={styles.navRight}>
              <TouchableOpacity onPress={() => router.replace("/")}>
                <Text style={styles.navLink}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <Navbar variant="login"/>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Join thousands of professionals landing their dream jobs with
              AI-powered resume optimization
            </Text>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>
              Must be at least 8 characters long
            </Text>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create account</Text>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By creating an account, you agree to our{" "}
              <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>

          {/* Login link */}
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.bottomLink}>
              Already have an account?{" "}
              <Text style={styles.linkText}>Sign in instead</Text>
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 20,
  },
  navLeft: { flexDirection: "row", alignItems: "center" },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 6,
    color: "#111827",
  },
  navRight: { flexDirection: "row", alignItems: "center" },
  navLink: { color: "#374151", fontSize: 15, marginRight: 12 },
  loginButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  loginText: { color: "#fff", fontWeight: "600" },

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderColor: "#fca5a5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: { color: "#b91c1c", textAlign: "center", fontSize: 13 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  input: { flex: 1, height: 45, marginLeft: 6 },
  helperText: { fontSize: 12, color: "#6b7280", marginBottom: 14 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: { opacity: 0.7 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 10,
  },
  linkText: { color: "#2563eb", fontWeight: "500" },
  bottomLink: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 8,
  },
});
