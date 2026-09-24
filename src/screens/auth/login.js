import React, { useState } from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

import { loginUser } from "../../api/authApi";

const Login = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  // =====================================================
  // STATE
  // =====================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSmallScreen = height < 700;

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    // Email validation
    if (!trimmedEmail) {
      Alert.alert(
        "Required",
        "Please enter your email address."
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // Password validation
    if (!password) {
      Alert.alert(
        "Required",
        "Please enter your password."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("LOGIN DATA:", {
        email: trimmedEmail,
        password,
      });

      const data = await loginUser({
        email: trimmedEmail,
        password,
      });

      console.log("LOGIN SUCCESS:", data);

      // Navigate after successful login
      navigation.replace("Home");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      Alert.alert(
        "Login Failed",
        error?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      console.log("GOOGLE LOGIN CLICKED");

      // Google authentication will be connected here.

      Alert.alert(
        "Google Sign-In",
        "Google Sign-In will be connected here."
      );
    } catch (error) {
      console.log("GOOGLE LOGIN ERROR:", error);

      Alert.alert(
        "Google Sign-In Failed",
        error?.message ||
          "Unable to sign in with Google."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // APPLE LOGIN
  // =====================================================

  const handleAppleLogin = async () => {
    if (loading) return;

    try {
      setLoading(true);

      console.log("APPLE LOGIN CLICKED");

      // Apple authentication will be connected here.

      Alert.alert(
        "Apple Sign-In",
        "Apple Sign-In will be connected here."
      );
    } catch (error) {
      console.log("APPLE LOGIN ERROR:", error);

      Alert.alert(
        "Apple Sign-In Failed",
        error?.message ||
          "Unable to sign in with Apple."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              minHeight: height,
              paddingHorizontal: width * 0.045,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ================= LOGO ================= */}

          <View
            style={[
              styles.logoContainer,
              {
                marginTop: isSmallScreen ? 12 : 30,
              },
            ]}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={[
                styles.logo,
                {
                  width: Math.min(width * 0.42, 155),
                  height:
                    Math.min(width * 0.42, 155) *
                    0.62,
                },
              ]}
              resizeMode="contain"
            />
          </View>

          {/* ================= TITLE ================= */}

          <Text style={styles.title}>
            Welcome back!
          </Text>

          <Text style={styles.subtitle}>
            Log in to continue
          </Text>

          {/* ================= FORM ================= */}

          <View
            style={[
              styles.formContainer,
              {
                marginTop: isSmallScreen ? 28 : 35,
              },
            ]}
          >
            {/* ================= EMAIL ================= */}

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={23}
                color="#555"
                style={styles.inputIcon}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#999"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                returnKeyType="next"
              />
            </View>

            {/* ================= PASSWORD ================= */}

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color="#555"
                style={styles.inputIcon}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() =>
                  setShowPassword(!showPassword)
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-outline"
                      : "eye-off-outline"
                  }
                  size={22}
                  color="#555"
                />
              </Pressable>
            </View>

            {/* ================= FORGOT PASSWORD ================= */}

            <Pressable
              style={styles.forgotButton}
              onPress={() =>
                navigation.navigate("ForgotPassword")
              }
            >
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </Pressable>

            {/* ================= LOGIN BUTTON ================= */}

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
                loading && styles.disabledButton,
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading
                  ? "Logging in..."
                  : "Log in"}
              </Text>
            </Pressable>
          </View>

          {/* ================= DIVIDER ================= */}

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>
              or continue with
            </Text>

            <View style={styles.divider} />
          </View>

          {/* ================= SOCIAL BUTTONS ================= */}

          <View style={styles.socialContainer}>
            {/* GOOGLE */}

            <Pressable
              style={[
                styles.socialItem,
                loading && styles.socialDisabled,
              ]}
              onPress={handleGoogleLogin}
              disabled={loading}
            >
              <View style={styles.socialCircle}>
                <Text style={styles.googleIcon}>
                  G
                </Text>
              </View>

              <Text style={styles.socialText}>
                Google
              </Text>
            </Pressable>

            {/* APPLE */}

            <Pressable
              style={[
                styles.socialItem,
                loading && styles.socialDisabled,
              ]}
              onPress={handleAppleLogin}
              disabled={loading}
            >
              <View style={styles.socialCircle}>
                <Ionicons
                  name="logo-apple"
                  size={30}
                  color="#111"
                />
              </View>

              <Text style={styles.socialText}>
                Apple
              </Text>
            </Pressable>
          </View>

          {/* ================= REGISTER ================= */}

          <View style={styles.registerContainer}>
            <Text style={styles.registerQuestion}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() =>
                navigation.navigate("register")
              }
              hitSlop={10}
            >
              <Text style={styles.registerText}>
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 25,
  },

  // ================= LOGO =================

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    alignSelf: "center",
  },

  // ================= TITLE =================

  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "600",
    color: "#444444",
    textAlign: "center",
  },

  // ================= FORM =================

  formContainer: {
    width: "100%",
    maxWidth: 430,
  },

  inputContainer: {
    width: "100%",
    minHeight: 49,
    borderWidth: 2,
    borderColor: "#AFAFAF",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    paddingHorizontal: 13,
  },

  inputIcon: {
    width: 30,
    marginRight: 8,
  },

  input: {
    flex: 1,
    minHeight: 48,
    fontSize: 15,
    color: "#222222",
    paddingVertical: 0,
  },

  eyeButton: {
    width: 35,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  // ================= FORGOT PASSWORD =================

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 20,
  },

  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#DC3026",
  },

  // ================= LOGIN BUTTON =================

  loginButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#DC3026",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // ================= DIVIDER =================

  dividerContainer: {
    width: "100%",
    maxWidth: 430,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDDDDD",
  },

  dividerText: {
    marginHorizontal: 12,
    color: "#999999",
    fontSize: 13,
    fontWeight: "600",
  },

  // ================= SOCIAL =================

  socialContainer: {
    width: "100%",
    maxWidth: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  socialItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
  },

  socialDisabled: {
    opacity: 0.5,
  },

  socialCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  googleIcon: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4285F4",
  },

  socialText: {
    marginTop: 5,
    fontSize: 11,
    color: "#333333",
    fontWeight: "500",
  },

  // ================= REGISTER =================

  registerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  registerQuestion: {
    fontSize: 13,
    color: "#999999",
    fontWeight: "600",
  },

  registerText: {
    marginLeft: 7,
    fontSize: 13,
    color: "#DC3026",
    fontWeight: "700",
  },
});

export default Login;