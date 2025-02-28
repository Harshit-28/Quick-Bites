import { useState } from "react";
import "./App.css";
import backgroundImage from "./image.jpg";
import authService from "./services/authService";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    registerType: "user",
  });

  const openModal = (register = false) => {
    setIsRegister(register);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${search}" in "${city}"`);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await authService.register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.registerType,
        });
        alert("Registration successful! Please login.");
      } else {
        await authService.login({
          email: formData.email,
          password: formData.password,
        });
        alert("Login successful!");
        closeModal();
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <ul>
            <li>
              <button onClick={scrollToTop}>Home</button>
            </li>
            <li>
              <button>About</button>
            </li>
            <li>
              <button onClick={() => openModal(false)}>Login</button>
            </li>
            <li>
              <button onClick={() => openModal(true)}>Register</button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="landing" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <h1>Welcome to Quick Bites</h1>
        <p>Find the best restaurants near you</p>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="">Select City</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Jodhpur">Jodhpur</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jaisalmer">Jaisalmer</option>
          </select>
          <input
            type="text"
            placeholder="Search for restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Restaurant Cards */}
      <div className="restaurant-list">
        <div className="restaurant-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcHvDBGLWu3kuEuUVq6JtoFSBzxkQp-aporw&s" alt="Restaurant 1" />
          <h3>Delicious Bites</h3>
          <p>Best fast food in town</p>
        </div>
        <div className="restaurant-card">
          <img src="data:image/png;base64,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" alt="Restaurant 2" />
          <h3>Pizza Paradise</h3>
          <p>Authentic Italian pizzas</p>
        </div>
        <div className="restaurant-card">
          <img src="data:image/jpeg;base64,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" alt="Restaurant 3" />
          <h3>Sushi World</h3>
          <p>Fresh sushi and sashimi</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span onClick={closeModal} className="close-btn">&times;</span>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    required
                  />
                </>
              )}
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
              {isRegister && (
                <>
                  <label htmlFor="confirm-password">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                  />
                  <label htmlFor="registerType">Register as:</label>
                  <select
                    id="registerType"
                    name="registerType"
                    value={formData.registerType}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="user">User</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </>
              )}
              <button type="submit">{isRegister ? "Register" : "Login"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;