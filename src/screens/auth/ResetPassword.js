import React, { useState } from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { resetPassword } from '../../api/authApi';

const ResetPassword = ({ navigation, route }) => {
  const { resetToken } = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password) {
      Alert.alert('Required', 'Please enter your new password.');
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Required', 'Please confirm your new password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      // Do not log the actual password
      console.log('RESET PASSWORD DATA:', {
        resetToken,
      });

      const data = await resetPassword({
        resetToken,
        password,
        confirmPassword,
      });

      console.log('RESET PASSWORD SUCCESS:', data);

      Alert.alert(
        'Password Reset',
        data?.message || 'Your password has been reset successfully.',
        [
          {
            text: 'Login',
            onPress: () => {
              navigation.replace('Login');
            },
          },
        ],
      );
    } catch (error) {
      console.log('RESET PASSWORD ERROR:', error);

      Alert.alert(
        'Reset Password Failed',
        error?.message || 'Unable to reset password. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* ================= TITLE ================= */}

          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.subtitle}>Enter your new password below.</Text>

          {/* ================= NEW PASSWORD ================= */}

          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="New Password"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={10}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#555"
              />
            </Pressable>
          </View>

          {/* ================= CONFIRM PASSWORD ================= */}

          <View style={styles.inputContainer}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              hitSlop={10}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#555"
              />
            </Pressable>
          </View>

          {/* ================= RESET BUTTON ================= */}

          <Pressable
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  form: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },

  // ================= TITLE =================

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },

  // ================= PASSWORD INPUT =================

  inputContainer: {
    height: 52,
    borderWidth: 2,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 2,
    fontSize: 15,
    color: '#222222',
  },

  // ================= EYE BUTTON =================

  eyeButton: {
    width: 35,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ================= RESET BUTTON =================

  button: {
    height: 52,
    borderRadius: 8,
    backgroundColor: '#DC3026',
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ResetPassword;
