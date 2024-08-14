import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UserDashboardLayout from "./UserDashboard";


const ProfileCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: "100%",
  margin: "auto",
  textAlign: "center",
}));

export default function Profile() {
  // State for user profile information
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
    avatarUrl: "https://i.pravatar.cc/300", // Placeholder for user avatar
  });

  // State for editing profile fields
  const [editMode, setEditMode] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    // Save logic can be implemented here (e.g., API call to update the user's profile)
  };

  return (
    <UserDashboardLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 8,
          mb: 8,
        }}
      >
        <ProfileCard>
          <Avatar
            src={profile.avatarUrl}
            alt={profile.name}
            sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
          <Box mt={4}>
            {editMode ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
            ) : (
              <Button variant="contained" onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </Box>
        </ProfileCard>
      </Box>
    </UserDashboardLayout>
  );
}
