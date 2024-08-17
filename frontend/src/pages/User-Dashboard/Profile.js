import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import UserDashboardLayout from "./UserDashboard";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { userID } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stateID: "", 
    cityID: "", 
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch states on component mount
  useEffect(() => {
    fetch("https://localhost:7093/api/States")
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.error("Failed to fetch states:", error));
  }, []);

  // Fetch cities based on the selected stateID
  useEffect(() => {
    if (formData.stateID) {
      fetch(`https://localhost:7093/api/Cities?stateID=${formData.stateID}`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error("Failed to fetch cities:", error));
    }
  }, [formData.stateID]);

  // Fetch user data based on userID
  useEffect(() => {
    if (userID) {
      fetch(`https://localhost:7093/api/Users/${userID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data.");
          }
          return response.json();
        })
        .then((data) => {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            stateID: data.stateID || "", 
            cityID: data.cityID || "", 
          });
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [userID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      name: formData.name,
      cityID: formData.cityID,
      phone: formData.phone,
      stateID: formData.stateID,
    };
    console.log("Data being sent to the API:", dataToSend);


    fetch(`https://localhost:7093/api/Users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <UserDashboardLayout />
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profile Page
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* State Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                name="stateID"
                value={formData.stateID} 
                onChange={handleChange}
                label="State"
              >
                {states.map((state) => (
                  <MenuItem key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* City Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="city-select-label">City</InputLabel>
              <Select
                labelId="city-select-label"
                name="cityID" 
                value={formData.cityID} 
                onChange={handleChange}
                label="City"
                disabled={!formData.stateID} 
              >
                {cities.map((city) => (
                  <MenuItem key={city.cityId} value={city.cityId}>
                    {city.cityName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProfilePage;
