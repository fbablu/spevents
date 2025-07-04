// src/components/auth/LoginPage.tsx
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../config/firebase";
import { auth, GoogleAuthProvider, signInWithPopup } from "../../services/auth";

import { useNavigate } from "react-router-dom";

const ALLOWED_EMAIL = import.meta.env.VITE_ALLOWED_EMAIL;

if (!ALLOWED_EMAIL) {
  throw new Error("VITE_ALLOWED_EMAIL environment variable is not set");
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user.email && result.user.email === ALLOWED_EMAIL) {
        localStorage.setItem("spevents-auth", result.user.email);
        navigate("/host/gallery");
      } else {
        alert("No email found");
      }

      // if (result.user.email === ALLOWED_EMAIL) {
      //   localStorage.setItem("spevents-auth", result.user.email);
      //   navigate("/host/gallery");
      // } else {
      //   await auth.signOut();
      //   alert("Unauthorized access");
      // }
    } catch (error: any) {
      console.error("Firebase Auth Error:", {
        code: error.code,
        message: error.message,
        fullError: error,
      });

      if (error.code === "auth/popup-closed-by-user") {
        return; // Don't show error for user-closed popup
      }

      alert(`Authentication failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-white/60">Sign in to access your dashboard</p>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 px-4 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="space-y-4 pt-4">
          <a
            href="https://join.spevents.live"
            className="block w-full px-6 py-3 bg-white/10 text-white rounded-lg text-center font-medium hover:bg-white/20 transition-colors"
          >
            Guest? Join here
          </a>
          <a
            href="https://spevents.live"
            className="block text-white/60 text-sm text-center hover:text-white transition-colors"
          >
            Learn more at spevents.live
          </a>
        </div>
      </div>
    </div>
  );
};
