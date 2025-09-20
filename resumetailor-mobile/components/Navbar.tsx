// resumetailor-mobile/components/Navbar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <View style={styles.navLeft}>
        <Ionicons name="document-text-outline" size={26} color="#2563eb" />
        <Text style={styles.logoText}>ResumeTailor</Text>
      </View>
      <View style={styles.navRight}>
        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.navLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>
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
});
