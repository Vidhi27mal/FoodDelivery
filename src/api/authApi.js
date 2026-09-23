import BASE_URL from "./api";

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