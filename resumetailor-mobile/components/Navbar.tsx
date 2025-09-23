// resumetailor-mobile/components/Navbar.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NavbarProps {
  variant?: "login" | "register" | "homeBlock"; // used only if not logged in
}

export default function Navbar({ variant }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname(); // current route
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      if (token) {
        setIsLoggedIn(true);
        if (user) {
          try {
            const parsed = JSON.parse(user);
            setUserName(parsed.fullName || null);
          } catch {
            setUserName(null);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName(null);
      }
    };
    checkAuth();
  }, [pathname]); // re-check when route changes

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName(null);
    router.replace("/login");
  };

  return (
    <View style={styles.navbar}>
      {/* Left: Logo */}
      <View style={styles.navLeft}>
        <Ionicons name="document-text-outline" size={26} color="#2563eb" />
        <Text style={styles.logoText}>ResumeTailor</Text>
      </View>

      {/* Right side */}
      <View style={styles.navRight}>

        {/* { variant === "homeBlock" ? null : 

        (<TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>)
        } */}

        {isLoggedIn ? (
          <>
            {userName && <Text style={styles.userName}>Hi, {userName}</Text>}
            <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
              <Text style={styles.authText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : variant === "login" ? (
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.authText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.authText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  authButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  authText: { color: "#fff", fontWeight: "600" },
  userName: { marginRight: 12, color: "#374151", fontWeight: "500" },
});
