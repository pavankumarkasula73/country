import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import axios from 'axios';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Check if token is available in localStorage
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // If token exists, fetch user data (including role and country)
    if (authToken) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get('/user/data', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setCountry(res.data.country);
          setRole(res.data.role); // Save the user's role (Viewer/Admin)
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }

    // Fetch all countries (for dropdown)
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [authToken]);

  return (
    <div style={styles.appContainer}>
      <h1 style={styles.appTitle}>Multi-Country App</h1>

      {/* If the user is not authenticated, show login and register components */}
      {!authToken ? (
        <>
          <Login setAuthToken={setAuthToken} />
          <Register />
        </>
      ) : (
        <div style={styles.dashboardContainer}>
          <h2>Welcome to the Dashboard</h2>
          <p>You are logged in as: {role}</p>

          {/* Country selection dropdown */}
          <h3>Select Country</h3>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={styles.countryDropdown}
            disabled={role === 'Viewer'} // Disable dropdown for Viewer
          >
            {countries.map((countryData) => (
              <option key={countryData.cca2} value={countryData.cca2}>
                {countryData.name.common}
              </option>
            ))}
          </select>

          {/* Display CRUD options if user is an Admin */}
          {role === 'Admin' && (
            <div style={styles.adminActions}>
              <button style={styles.adminBtn}>Create Data</button>
              <button style={styles.adminBtn}>Update Data</button>
              <button style={styles.adminBtn}>Delete Data</button>
            </div>
          )}

          {/* Display view only message if user is a Viewer */}
          {role === 'Viewer' && (
            <div style={styles.viewerInfo}>
              <p>You have view-only access to data for the selected country.</p>
            </div>
          )}

          <button style={styles.logoutBtn} onClick={() => setAuthToken(null)}>
            Logout
          </button>
        </div>
      )}

      <style>
        {`
          /* App Styles */
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
          }

          .app-container {
            width: 100%;
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .app-title {
            text-align: center;
            color: #333;
            font-size: 2rem;
            margin-bottom: 20px;
            color: #004d40;
          }

          .dashboard-container {
            padding: 20px;
            text-align: center;
          }

          h2 {
            color: #004d40;
          }

          h3 {
            margin-bottom: 10px;
            color: #00796b;
          }

          .country-dropdown {
            padding: 10px;
            font-size: 1rem;
            width: 100%;
            max-width: 300px;
            margin-top: 10px;
            border-radius: 5px;
            border: 1px solid #00796b;
            background-color: #f1f1f1;
            color: #004d40;
            transition: all 0.3s ease;
          }

          .country-dropdown:hover {
            background-color: #00796b;
            color: white;
            cursor: pointer;
          }

          .admin-btn,
          .viewer-info {
            margin-top: 20px;
            font-size: 1rem;
          }

          .admin-btn {
            background-color: #004d40;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
            font-size: 1rem;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .admin-btn:hover {
            background-color: #00796b;
            transform: scale(1.05);
          }

          .admin-btn:active {
            transform: scale(0.98);
          }

          .logout-btn {
            background-color: #004d40;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 1rem;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .logout-btn:hover {
            background-color: #00796b;
            transform: scale(1.05);
          }

          .logout-btn:active {
            transform: scale(0.98);
          }

          /* Animation for smoother transitions */
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .app-container {
            animation: fadeIn 1s ease-out;
          }

          h1,
          h2,
          h3 {
            animation: fadeIn 1.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  appContainer: {
    width: '100%',
    maxWidth: '900px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  appTitle: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#004d40',
  },
  dashboardContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  countryDropdown: {
    padding: '10px',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '300px',
    marginTop: '10px',
    borderRadius: '5px',
    border: '1px solid #00796b',
    backgroundColor: '#f1f1f1',
    color: '#004d40',
    transition: 'all 0.3s ease',
  },
  logoutBtn: {
    backgroundColor: '#004d40',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  adminActions: {
    marginTop: '20px',
    textAlign: 'center',
  },
  adminBtn: {
    backgroundColor: '#004d40',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '1rem',
  },
  viewerInfo: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#00796b',
  },
};

export default App;
