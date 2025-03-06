import { useState, useEffect } from "react";
import "./App.css";
import authService from "./services/authService";
import UserLandingPage from "./UserLandingPage";
import AdminLandingPage from "./AdminLandingPage";

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(localStorage.getItem("email"));

  useEffect(() => {
    // ✅ Clear localStorage on refresh
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    const fetchUserRole = async () => {
      try {
        if (!email) {
          setLoading(false);
          return;
        }

        const userData = await authService.getUserByEmail(email);
        setRole(userData.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{role === "restaurant" ? <AdminLandingPage /> : <UserLandingPage setEmail={setEmail} />}</div>;
}

export default App;
