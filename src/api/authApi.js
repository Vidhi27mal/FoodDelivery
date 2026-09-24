import BASE_URL from "./api";

// =========================
// REGISTER
// =========================

export const registerUser = async ({
  email,
  password,
  confirmPassword,
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    console.log("REGISTER STATUS:", response.status);
    console.log("REGISTER RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Registration failed."
      );
    }

    return data;
  } catch (error) {
    console.log("REGISTER API ERROR:", error);
    throw error;
  }
};

// =========================
// VERIFY OTP
// =========================

export const verifyOtp = async ({ email, otp }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      }
    );

    const data = await response.json();

    console.log("VERIFY OTP STATUS:", response.status);
    console.log("VERIFY OTP RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "OTP verification failed."
      );
    }

    return data;
  } catch (error) {
    console.log("VERIFY OTP API ERROR:", error);
    throw error;
  }
};

// =========================
// RESEND OTP
// =========================

export const resendOtp = async ({ email }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/auth/resend-verification-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    const data = await response.json();

    console.log("RESEND OTP STATUS:", response.status);
    console.log("RESEND OTP RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          "Unable to resend OTP."
      );
    }

    return data;
  } catch (error) {
    console.log("RESEND OTP API ERROR:", error);
    throw error;
  }
};

// =========================
// Login
// =========================

export const loginUser = async ({email, password}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login API Error:', error);
    throw error;
  }
};