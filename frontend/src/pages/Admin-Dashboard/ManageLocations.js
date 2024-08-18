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
  TextField,
  Modal,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboardlayout";

export default function ManageLocations() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newStateName, setNewStateName] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [openStateModal, setOpenStateModal] = useState(false);  
  const [openCityModal, setOpenCityModal] = useState(false);

  // Get State and City
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/States`)
      .then((response) => setStates(response.data))
      .catch((error) => console.error("Error fetching states:", error));

    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Cities`)
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  // Create State
  const handleCreateState = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/States`, {
        stateName: newStateName,
      })
      .then((response) => {
        setStates([...states, response.data]);
        setNewStateName("");
        setOpenStateModal(false);
      })
      .catch((error) => console.error("Error creating state:", error));
  };

  //create City
  const handleCreateCity = () => {
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/Cities`, {
        cityName: newCityName,
        stateId: selectedStateId,
      })
      .then((response) => {
        setCities([...cities, response.data]);
        setNewCityName("");
        setSelectedStateId("");
        setOpenCityModal(false);
      })
      .catch((error) => console.error("Error creating city:", error));
  };

  // Delete state
    const handleDeleteState = (id) => {
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/States/${id}`)
        .then(() => {
          setStates(states.filter((state) => state.stateId !== id));
        })
        .catch((error) => console.error("Error deleting state:", error));
    };
    
  // Delete city
    const handleDeleteCity = (id) => {
      axios
        .delete(`${process.env.REACT_APP_API_BASE_URL}/Cities/${id}`)
        .then(() => {
          setCities(cities.filter((city) => city.cityId !== id));
        })
        .catch((error) => console.error("Error deleting city:", error));
    };

  const handleOpenStateModal = () => setOpenStateModal(true);
  const handleCloseStateModal = () => setOpenStateModal(false);
  const handleOpenCityModal = () => setOpenCityModal(true);
  const handleCloseCityModal = () => setOpenCityModal(false);

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Locations
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenStateModal}
        >
          Add State
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCityModal}
          sx={{ ml: 2 }}
        >
          Add City
        </Button>

        <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
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
                <TableRow key={state.stateId}>
                  <TableCell>{state.stateName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteState(state.stateId)}
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
                <TableRow key={city.cityId}>
                  <TableCell>{city.cityName}</TableCell>
                  <TableCell>
                    {
                      states.find((state) => state.stateId === city.stateId)
                        ?.stateName
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteCity(city.cityId)}
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

        {/* State Creation Modal */}
        <Modal open={openStateModal} onClose={handleCloseStateModal}>
          <Box
            sx={{
              p: 3,
              maxWidth: 400,
              margin: "auto",
              mt: 10,
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add State
            </Typography>
            <TextField
              label="State Name"
              value={newStateName}
              onChange={(e) => setNewStateName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateState}
              sx={{ mr: 1 }}
            >
              Create
            </Button>
            <Button variant="outlined" onClick={handleCloseStateModal}>
              Cancel
            </Button>
          </Box>
        </Modal>

        {/* City Creation Modal */}
        <Modal open={openCityModal} onClose={handleCloseCityModal}>
          <Box
            sx={{
              p: 3,
              maxWidth: 400,
              margin: "auto",
              mt: 10,
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add City
            </Typography>
            <TextField
              label="City Name"
              value={newCityName}
              onChange={(e) => setNewCityName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>State</InputLabel>
              <Select
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
              >
                {states.map((state) => (
                  <MenuItem key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateCity}
              sx={{ mr: 1 }}
            >
              Create
            </Button>
            <Button variant="outlined" onClick={handleCloseCityModal}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </AdminDashboardLayout>
  );
}