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
import { registerUser } from "../../api/authApi";


const Register = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSmallScreen = height < 700;

  const handleSignup = async () => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    Alert.alert("Required", "Please enter your email address.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return;
  }

  if (!password) {
    Alert.alert("Required", "Please enter your password.");
    return;
  }

 if (password.length < 8) {
  Alert.alert(
    "Invalid Password",
    "Password must be at least 8 characters."
  );
  return;
}

  if (!confirmPassword) {
    Alert.alert("Required", "Please confirm your password.");
    return;
  }

 if (password !== confirmPassword) {
  Alert.alert(
    "Password Mismatch",
    "Password and confirm password must match."
  );
  return;
}

  try {
    setLoading(true);

    const data = await registerUser({
      email: trimmedEmail,
      password,
      confirmPassword,
    });

    Alert.alert(
      "Registration Successful",
      data?.message || "Your account has been created successfully.",
      [
        {
          text: "OK",
          onPress: () => {
            navigation?.navigate("Login");
          },
        },
      ]
    );
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    Alert.alert(
      "Registration Failed",
      error.message || "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                marginTop: isSmallScreen ? 12 : 25,
              },
            ]}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={[
                styles.logo,
                {
                  width: Math.min(width * 0.42, 155),
                  height: Math.min(width * 0.42, 155) * 0.62,
                },
              ]}
              resizeMode="contain"
            />
          </View>

          {/* ================= TITLE ================= */}

          <Text style={styles.title}>Create your account</Text>

          {/* ================= FORM ================= */}

          <View
            style={[
              styles.formContainer,
              {
                marginTop: isSmallScreen ? 25 : 34,
              },
            ]}
          >
            {/* EMAIL */}

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

            {/* PASSWORD */}

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
                textContentType="newPassword"
                returnKeyType="next"
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
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

            {/* CONFIRM PASSWORD */}

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={23}
                color="#555"
                style={styles.inputIcon}
              />

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={handleSignup}
              />

              <Pressable
                style={styles.eyeButton}
                onPress={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? "eye-outline"
                      : "eye-off-outline"
                  }
                  size={22}
                  color="#555"
                />
              </Pressable>
            </View>

            {/* ================= SIGN UP BUTTON ================= */}

            <Pressable
              style={({ pressed }) => [
                styles.signupButton,
                pressed && styles.buttonPressed,
                loading && styles.disabledButton,
              ]}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </Pressable>
          </View>

          {/* ================= DIVIDER ================= */}

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.dividerText}>or continue with</Text>

            <View style={styles.divider} />
          </View>

          {/* ================= SOCIAL BUTTONS ================= */}

          <View style={styles.socialContainer}>
            <Pressable style={styles.socialItem}>
              <View style={styles.socialCircle}>
                <Text style={styles.googleIcon}>G</Text>
              </View>

              <Text style={styles.socialText}>Google</Text>
            </Pressable>

            <Pressable style={styles.socialItem}>
              <View style={styles.socialCircle}>
                <Ionicons
                  name="call"
                  size={27}
                  color="#111"
                />
              </View>

              <Text style={styles.socialText}>Phone</Text>
            </Pressable>

            <Pressable style={styles.socialItem}>
              <View style={styles.socialCircle}>
                <Ionicons
                  name="logo-apple"
                  size={30}
                  color="#111"
                />
              </View>

              <Text style={styles.socialText}>Apple</Text>
            </Pressable>
          </View>

          {/* ================= LOGIN ================= */}

          <View style={styles.loginContainer}>
            <Text style={styles.loginQuestion}>
              Already have an account?
            </Text>

            <Pressable
              onPress={() => navigation?.navigate("Login")}
              hitSlop={10}
            >
              <Text style={styles.loginText}>Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

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

  /* ================= LOGO ================= */

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    alignSelf: "center",
  },

  /* ================= TITLE ================= */

  title: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "700",
    color: "#333333",
    textAlign: "center",
  },

  /* ================= FORM ================= */

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

  /* ================= SIGN UP ================= */

  signupButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#DC3026",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  disabledButton: {
    opacity: 0.6,
  },

  signupText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ================= DIVIDER ================= */

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

  /* ================= SOCIAL ================= */

  socialContainer: {
    width: "100%",
    maxWidth: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  socialItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
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

  /* ================= LOGIN ================= */

  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },

  loginQuestion: {
    fontSize: 13,
    color: "#999999",
    fontWeight: "600",
  },

  loginText: {
    marginLeft: 7,
    fontSize: 13,
    color: "#DC3026",
    fontWeight: "700",
  },
});