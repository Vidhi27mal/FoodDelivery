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

import { forgotPassword } from '../../api/authApi';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert('Required', 'Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      console.log('FORGOT PASSWORD DATA:', {
        email: trimmedEmail,
      });

      const data = await forgotPassword({
        email: trimmedEmail,
      });

      console.log('FORGOT PASSWORD SUCCESS:', data);

      navigation.navigate('ResetPasswordOtp', {
        email: trimmedEmail,
      });
    } catch (error) {
      console.log('FORGOT PASSWORD ERROR:', error?.response?.data || error);

      Alert.alert(
        'Forgot Password Failed',
        error?.response?.data?.message ||
          error?.message ||
          'Unable to process your request. Please try again.',
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
        <Text style={styles.title}>Forgot Password?</Text>

        <Text style={styles.subtitle}>
          Enter your registered email address to receive a verification OTP.
        </Text>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email Address"
            placeholderTextColor="#999"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleForgotPassword}
          />

          <Pressable
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back to Login</Text>
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
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },

  form: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
  },

  input: {
    height: 52,
    borderWidth: 2,
    borderColor: '#AFAFAF',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    color: '#222222',
    marginBottom: 18,
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

export default ForgotPassword;
