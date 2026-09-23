import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  useWindowDimensions,
} from "react-native";

import { verifyOtp, resendOtp } from "../../api/authApi";

const OtpVerification = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const email = route?.params?.email || "";

  // =========================
  // 6 DIGIT OTP
  // =========================
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  // =========================
  // RESPONSIVE OTP BOX SIZE
  // =========================

  const otpBoxSize = Math.min(
    55,
    Math.max(43, (width - 80) / 6)
  );

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // =========================
  // OTP INPUT
  // =========================

  const handleOtpChange = (value, index) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");

    const newOtp = [...otp];

    newOtp[index] = numericValue.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (numericValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =========================
  // BACKSPACE
  // =========================

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (
      nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Please enter the complete 6-digit OTP."
      );
      return;
    }

    if (!email) {
      Alert.alert(
        "Error",
        "Email address is missing."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOtp({
        email,
        otp: enteredOtp,
      });

      console.log("OTP VERIFIED:", response);

      Alert.alert(
        "Verification Successful",
        "Your email has been verified successfully.",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.replace("Login");
            },
          },
        ]
      );
    } catch (error) {
      console.log("OTP VERIFY ERROR:", error);

      Alert.alert(
        "Verification Failed",
        error?.message || "Invalid or expired OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================

  const handleResendOtp = async () => {
    if (timer > 0) {
      return;
    }

    if (!email) {
      Alert.alert(
        "Error",
        "Email address is missing."
      );
      return;
    }

    try {
      await resendOtp({ email });

      // Clear OTP
      setOtp(["", "", "", "", "", ""]);

      // Restart timer
      setTimer(60);

      // Focus first box
      inputRefs.current[0]?.focus();

      Alert.alert(
        "OTP Sent",
        "A new OTP has been sent to your email."
      );
    } catch (error) {
      console.log("RESEND OTP ERROR:", error);

      Alert.alert(
        "Error",
        error?.message || "Unable to resend OTP."
      );
    }
  };

  // =========================
  // FORMAT TIMER
  // =========================

  const formattedTimer = `00:${String(timer).padStart(2, "0")}`;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* ================= TITLE ================= */}

          <Text style={styles.title}>
            Verify your email
          </Text>

          {/* ================= DESCRIPTION ================= */}

          <Text style={styles.description}>
            Enter the 6-digit code sent to
          </Text>

          {/* ================= EMAIL ================= */}

          <Text
            style={styles.email}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {email}
          </Text>

          {/* ================= OTP BOXES ================= */}

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  {
                    width: otpBoxSize,
                    height: otpBoxSize,
                  },
                ]}
                value={digit}
                onChangeText={(value) =>
                  handleOtpChange(value, index)
                }
                onKeyPress={(event) =>
                  handleKeyPress(event, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                editable={!loading}
              />
            ))}
          </View>

          {/* ================= RESEND ================= */}

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't receive the code?
            </Text>

            <TouchableOpacity
              disabled={timer > 0}
              onPress={handleResendOtp}
            >
              <Text
                style={[
                  styles.resendButton,
                  timer > 0 &&
                    styles.resendDisabled,
                ]}
              >
                {timer > 0
                  ? `Resend in ${formattedTimer}`
                  : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* ================= VERIFY BUTTON ================= */}

          <TouchableOpacity
            style={[
              styles.verifyButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleVerifyOtp}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>
              {loading
                ? "Verifying..."
                : "Verify"}
            </Text>
          </TouchableOpacity>

          {/* ================= CHANGE EMAIL ================= */}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>
              Change email
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  card: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    width: "100%",
    fontSize: 28,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
  },

  description: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    color: "#777777",
    lineHeight: 24,
  },

  email: {
    width: "100%",
    fontSize: 17,
    fontWeight: "700",
    color: "#E33228",
    marginTop: 4,
    marginBottom: 28,
  },

  otpContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  otpInput: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 6,
    fontSize: 24,
    fontWeight: "600",
    color: "#111111",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },

  resendContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },

  resendText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#777777",
    marginBottom: 6,
  },

  resendButton: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E33228",
  },

  resendDisabled: {
    color: "#999999",
  },

  verifyButton: {
    width: "100%",
    height: 54,
    borderRadius: 8,
    backgroundColor: "#E33228",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  verifyButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  backButton: {
    marginTop: 22,
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E33228",
  },
});