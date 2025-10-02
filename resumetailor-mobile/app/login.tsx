// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { Stack } from "expo-router";
// import Navbar from "@/components/Navbar";

// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async () => {
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("http://192.168.1.104:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");

//       await AsyncStorage.setItem("token", data.token);
//       await AsyncStorage.setItem("user", JSON.stringify(data.user));
//       // setToken(data.token);

//       router.replace("/home");
//       Alert.alert("Success", `Welcome ${data.user.fullName}!`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* <Stack.Screen options={{ headerShown: false }} />

//            <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>

//     <LinearGradient
//       colors={["#f8fafc", "#e0f2fe", "#eef2ff"]}
//       style={styles.container}
//     > */}

//       <Stack.Screen options={{ headerShown: false }} />
//       <SafeAreaView style={{ flex: 1 }}>
//         <LinearGradient
//           colors={["#f8fafc", "#e0f2fe", "#eef2ff"]}
//           style={styles.container}
//         >
//           {/* Navbar */}
//           {/* <View style={styles.navbar}>
//         <View style={styles.navLeft}>
//           <Ionicons name="document-text-outline" size={26} color="#2563eb" />
//           <Text style={styles.logoText}>ResumeTailor</Text>
//         </View>
//         <View style={styles.navRight}>
//           <TouchableOpacity onPress={() => router.replace("/")}>
//             <Text style={styles.navLink}>Home</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.registerButton}
//             onPress={() => router.push("/register")}
//           >
//             <Text style={styles.registerText}>Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View> */}
//           <Navbar variant="register" />

//           {/* Main card */}
//           <View style={styles.card}>
//             <Text style={styles.title}>Welcome back</Text>
//             <Text style={styles.subtitle}>
//               Sign in to your account to continue tailoring your resume with AI
//             </Text>

//             {error ? (
//               <View style={styles.errorBox}>
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             ) : null}

//             {/* Email Input */}
//             <View style={styles.inputWrapper}>
//               <Ionicons name="mail-outline" size={20} color="#888" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="you@example.com"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>

//             {/* Password Input */}
//             <View style={styles.inputWrapper}>
//               <Ionicons name="lock-closed-outline" size={20} color="#888" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="••••••••"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Sign in Button */}
//             <TouchableOpacity
//               style={[styles.button, loading && styles.disabledButton]}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Sign in</Text>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerRow}>
//               <View style={styles.divider} />
//               <Text style={styles.dividerText}>Or continue with</Text>
//               <View style={styles.divider} />
//             </View>

//             {/* Google Login Button (placeholder for now) */}
//             <TouchableOpacity style={styles.googleButton}>
//               <Ionicons name="logo-google" size={18} color="#DB4437" />
//               <Text style={styles.googleText}>Sign in with Google</Text>
//             </TouchableOpacity>

//             {/* Register Link */}
//             <TouchableOpacity onPress={() => router.push("/register")}>
//               <Text style={styles.link}>
//                 Don't have an account? Create one now
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   navbar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderBottomWidth: 1,
//     borderBottomColor: "#e5e7eb",
//     marginBottom: 20,
//   },
//   navLeft: { flexDirection: "row", alignItems: "center" },
//   logoText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginLeft: 6,
//     color: "#111827",
//   },
//   navRight: { flexDirection: "row", alignItems: "center" },
//   navLink: { color: "#374151", fontSize: 15, marginRight: 12 },
//   registerButton: {
//     backgroundColor: "#2563eb",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   registerText: { color: "#fff", fontWeight: "600" },

//   card: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 16,
//     padding: 20,
//     margin: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#111827",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#4b5563",
//     textAlign: "center",
//     marginTop: 6,
//     marginBottom: 20,
//   },
//   errorBox: {
//     backgroundColor: "#fee2e2",
//     borderColor: "#fca5a5",
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   errorText: { color: "#b91c1c", textAlign: "center", fontSize: 13 },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   input: { flex: 1, height: 45, marginLeft: 6 },
//   button: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   disabledButton: { opacity: 0.7 },
//   buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
//   dividerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   divider: { flex: 1, height: 1, backgroundColor: "#d1d5db" },
//   dividerText: {
//     marginHorizontal: 10,
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   googleButton: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 8,
//     paddingVertical: 12,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   googleText: {
//     marginLeft: 8,
//     fontWeight: "500",
//     color: "#374151",
//   },
//   link: {
//     color: "#2563eb",
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });



// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { Stack } from "expo-router";
// import Navbar from "@/components/Navbar";
// import { SafeAreaView } from "react-native-safe-area-context";

// import * as WebBrowser from "expo-web-browser";

// import * as AuthSession from "expo-auth-session";


// const redirectUri = AuthSession.makeRedirectUri();
// console.log("Redirect URI =>", redirectUri);

 
// // Google OAuth config
// const CLIENT_ID = "872721848273-r9q77t8orsqpekgsq9opp48g7cjf314d.apps.googleusercontent.com";
// // const CLIENT_ID = "567161115414-pe1tt2q6v0n64dg0kgqplmfl6a8d9nki.apps.googleusercontent.com";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   // Google Auth request
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       redirectUri,
//       scopes: ["openid", "profile", "email"],
//       responseType: "id_token",
//     },
//     { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
//   );

//   // Handle Google response
//   useEffect(() => {
//     const handleGoogleLogin = async () => {
//       if (response?.type === "success") {
//         const { id_token } = response.params;
//         try {
//           const res = await fetch("http://192.168.1.103:5000/api/auth/google", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ idToken: id_token }),
//           });

//           const data = await res.json();
//           if (!res.ok) throw new Error(data.message || "Google login failed");

//           await AsyncStorage.setItem("token", data.token);
//           await AsyncStorage.setItem("user", JSON.stringify(data.user));

//           router.replace("/home");
//           Alert.alert("Success", `Welcome ${data.user.fullName}!`);
//         } catch (err: any) {
//           setError(err.message);
//           Alert.alert("Error", err.message);
//         }
//       }
//     };

//     handleGoogleLogin();
//   }, [response]);

//   // Email/Password Login
//   const handleSubmit = async () => {
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     try {
//       const res = await fetch("http://192.168.1.103:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Login failed");

//       await AsyncStorage.setItem("token", data.token);
//       await AsyncStorage.setItem("user", JSON.stringify(data.user));

//       router.replace("/home");
//       Alert.alert("Success", `Welcome ${data.user.fullName}!`);
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
//           style={styles.container}
//         >
//           <Navbar variant="register" />

//           <View style={styles.card}>
//             <Text style={styles.title}>Welcome back</Text>
//             <Text style={styles.subtitle}>
//               Sign in to your account to continue tailoring your resume with AI
//             </Text>

//             {error ? (
//               <View style={styles.errorBox}>
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             ) : null}

//             {/* Email */}
//             <View style={styles.inputWrapper}>
//               <Ionicons name="mail-outline" size={20} color="#888" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="you@example.com"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//             </View>

//             {/* Password */}
//             <View style={styles.inputWrapper}>
//               <Ionicons name="lock-closed-outline" size={20} color="#888" />
//               <TextInput
//                 style={styles.input}
//                 placeholder="••••••••"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                 <Ionicons
//                   name={showPassword ? "eye-off-outline" : "eye-outline"}
//                   size={20}
//                   color="#888"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Login Button */}
//             <TouchableOpacity
//               style={[styles.button, loading && styles.disabledButton]}
//               onPress={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Sign in</Text>
//               )}
//             </TouchableOpacity>

//             {/* Divider */}
//             <View style={styles.dividerRow}>
//               <View style={styles.divider} />
//               <Text style={styles.dividerText}>Or continue with</Text>
//               <View style={styles.divider} />
//             </View>

//             {/* Google Login Button */}
//             <TouchableOpacity
//               style={styles.googleButton}
//               disabled={!request}
//               onPress={() => promptAsync()}
//             >
//               <Ionicons name="logo-google" size={18} color="#DB4437" />
//               <Text style={styles.googleText}>Sign in with Google</Text>
//             </TouchableOpacity>

//             {/* Register link */}
//             <TouchableOpacity onPress={() => router.push("/register")}>
//               <Text style={styles.link}>
//                 Don't have an account? Create one now
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </LinearGradient>
//       </SafeAreaView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   card: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     borderRadius: 16,
//     padding: 20,
//     margin: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#111827",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#4b5563",
//     textAlign: "center",
//     marginTop: 6,
//     marginBottom: 20,
//   },
//   errorBox: {
//     backgroundColor: "#fee2e2",
//     borderColor: "#fca5a5",
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 15,
//   },
//   errorText: { color: "#b91c1c", textAlign: "center", fontSize: 13 },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     backgroundColor: "#fff",
//   },
//   input: { flex: 1, height: 45, marginLeft: 6 },
//   button: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   disabledButton: { opacity: 0.7 },
//   buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
//   dividerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   divider: { flex: 1, height: 1, backgroundColor: "#d1d5db" },
//   dividerText: {
//     marginHorizontal: 10,
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   googleButton: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#d1d5db",
//     borderRadius: 8,
//     paddingVertical: 12,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   googleText: {
//     marginLeft: 8,
//     fontWeight: "500",
//     color: "#374151",
//   },
//   link: {
//     color: "#2563eb",
//     textAlign: "center",
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });






import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import Navbar from "@/components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

// ✅ Use only the Web Client ID from Google Cloud Console
const WEB_CLIENT_ID =
  // "872721848273-amlsjhgj1e91n9iq9jhj2sg5b0tvfd32.apps.googleusercontent.com";
  "567161115414-pe1tt2q6v0n64dg0kgqplmfl6a8d9nki.apps.googleusercontent.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Google auth hook
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID, // only Web client ID required
  });

  // ✅ Handle Google login result
  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;

        try {
          const res = await fetch("http://192.168.1.103:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: id_token }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Google login failed");

          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("user", JSON.stringify(data.user));

          router.replace("/home");
          Alert.alert("Success", `Welcome ${data.user.fullName}!`);
        } catch (err: any) {
          setError(err.message);
          Alert.alert("Error", err.message);
        }
      }
    };

    handleGoogleLogin();
  }, [response]);

  // ✅ Email/Password login
  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://192.168.1.103:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      router.replace("/home");
      Alert.alert("Success", `Welcome ${data.user.fullName}!`);
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
          <Navbar variant="register" />

          <View style={styles.card}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in to your account to continue tailoring your resume with AI
            </Text>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

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

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.button, loading && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign in</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.divider} />
            </View>

            {/* ✅ Google Login Button */}
            <TouchableOpacity
              style={styles.googleButton}
              disabled={!request}
              onPress={() => promptAsync()}
            >
              <Ionicons name="logo-google" size={18} color="#DB4437" />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            {/* Register link */}
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.link}>
                Don't have an account? Create one now
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderColor: "#fca5a5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: { color: "#b91c1c", textAlign: "center", fontSize: 13 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  input: { flex: 1, height: 45, marginLeft: 6 },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: { opacity: 0.7 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: { flex: 1, height: 1, backgroundColor: "#d1d5db" },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: "#6b7280",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  googleText: {
    marginLeft: 8,
    fontWeight: "500",
    color: "#374151",
  },
  link: {
    color: "#2563eb",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
});
