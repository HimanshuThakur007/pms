import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { encryptCBC, decryptCBC } from "../../common/CryptoUtils";
import CryptoJS from "crypto-js";

// Fetch secret key from environment variable and ensure it's defined
const secretKey = process.env.REACT_APP_SECRET_KEY;
if (!secretKey) {
  throw new Error("Secret Key is not defined in environment variables.");
}

const key = CryptoJS.enc.Utf8.parse(secretKey);

// Function to get decrypted session data
export const getDecryptedSessionData = () => {
  const encryptedData = sessionStorage.getItem("encryptedData");
  if (!encryptedData) return null;

  // try {
  //   const { data, iv } = JSON.parse(encryptedData);
  //   const ivWordArray = CryptoJS.enc.Hex.parse(iv);
  //   const decrypted = decryptCBC(data, key, ivWordArray);

  //   return decrypted ? JSON.parse(decrypted) : null;
  // } catch (error) {
  //   console.error("Error decrypting session data:", error);
  //   return null;
  // }
};

const initialState = {
  user: getDecryptedSessionData(), // Initialize with decrypted data
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      const iv = CryptoJS.lib.WordArray.random(16);
      const encryptedData = encryptCBC(JSON.stringify(action.payload), key, iv);

      // Store encrypted data in sessionStorage
      sessionStorage.setItem(
        "encryptedData",
        JSON.stringify({ data: encryptedData, iv: iv.toString(CryptoJS.enc.Hex) })
      );

      // Store decrypted data in Redux state
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("encryptedData");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
