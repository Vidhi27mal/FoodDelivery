import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { verifyForgotPasswordOTP } from '../../api/authApi';

const ResetPasswordOtp = ({ navigation, route }) => {
  const { email } = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    const trimmedOtp = otp.trim();

    if (!trimmedOtp) {
      Alert.alert('Required', 'Please enter the OTP.');
      return;
    }

    if (trimmedOtp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP.');
      return;
    }

    try {
      setLoading(true);

      console.log('VERIFY FORGOT PASSWORD DATA:', {
        email,
        otp: trimmedOtp,
      });

      const data = await verifyForgotPasswordOTP({
        email,
        otp: trimmedOtp,
      });

      console.log('VERIFY FORGOT PASSWORD SUCCESS:', data);

      const resetToken = data?.data?.resetToken || data?.resetToken;

      if (!resetToken) {
        console.log('RESET TOKEN NOT FOUND IN RESPONSE:', data);

        Alert.alert(
          'OTP Verified',
          'OTP verified, but reset token was not returned by the API.',
        );

        return;
      }

      navigation.navigate('ResetPassword', {
        resetToken,
      });
    } catch (error) {
      console.log('VERIFY OTP ERROR:', error);

      Alert.alert(
        'OTP Verification Failed',
        error?.message || 'Invalid or expired OTP.',
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
      >
        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit verification code sent to
        </Text>

        <Text style={styles.email}>{email}</Text>

        <View style={styles.form}>
          <TextInput
            value={otp}
            onChangeText={text =>
              setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))
            }
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
          />

          <Pressable
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleVerifyOTP}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back</Text>
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

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
  },

  email: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC3026',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  form: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },

  input: {
    height: 55,
    borderWidth: 2,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 8,
    color: '#222222',
    marginBottom: 20,
  },

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

  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  backText: {
    color: '#DC3026',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default ResetPasswordOtp;
