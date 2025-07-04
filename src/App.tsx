// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext";
import { AuthGuard } from "./components/auth/AuthGuard";
import { HostRoutes } from "./pages/HostRoutes/HostRoutes";
import { GuestRoutes } from "./pages/guest/GuestRoutes";
import { LandingPage } from "./pages/landing/LandingPage";
import { LoginPage } from "./components/auth/LoginPage";
import { isHostDomain, isGuestDomain } from "./components/config/routes";
import { GuestLanding } from "./pages/guest/GuestLanding";

export default function App() {
  // Debug logs check
  console.log("Current domain:", window.location.hostname);
  console.log("Is guest domain?", isGuestDomain());
  console.log("Is host domain?", isHostDomain());
  console.log("Current path:", window.location.pathname);

  // Guest domain handling (join.spevents.live or /guest/ paths)
  if (isGuestDomain()) {
    return (
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GuestLanding />} />
            <Route path="/:eventId/*" element={<GuestRoutes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    );
  }

  // Host domain handling (app.spevents.live) - excluding localhost
  if (isHostDomain() && window.location.hostname !== "localhost") {
    return (
      <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route element={<AuthGuard />}>
              <Route path="/host/*" element={<HostRoutes />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SessionProvider>
    );
  }

  // Localhost handling - support both host and guest routes for development
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AuthGuard />}>
            <Route path="/host/*" element={<HostRoutes />} />
          </Route>
          {/* Guest routes for localhost development */}
          <Route path="/:eventId/guest/*" element={<GuestRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );
}
