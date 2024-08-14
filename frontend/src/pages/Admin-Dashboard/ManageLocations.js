import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboardlayout"; 

export default function ManageLocations() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch states and cities from API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/states`) // Ensure correct API base URL
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/cities`)
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Handler functions for CRUD operations
  const handleEditState = (id) => {
    // Logic for editing state
    console.log(`Edit state with id: ${id}`);
  };

  const handleDeleteState = (id) => {
    // Logic for deleting state
    console.log(`Delete state with id: ${id}`);
  };

  const handleEditCity = (id) => {
    // Logic for editing city
    console.log(`Edit city with id: ${id}`);
  };

  const handleDeleteCity = (id) => {
    // Logic for deleting city
    console.log(`Delete city with id: ${id}`);
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Locations
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          States
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {states.map((state) => (
                <TableRow key={state.id}>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditState(state.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteState(state.id)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Cities
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell>{city.name}</TableCell>
                  <TableCell>{city.stateName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditCity(city.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCity(city.id)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminDashboardLayout>
  );
}
