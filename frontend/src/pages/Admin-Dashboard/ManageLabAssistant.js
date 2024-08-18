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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboardlayout";

export default function ManageLabAssistants() {
  const [labAssistants, setLabAssistants] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  // Fetch all users from API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Users`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setLabAssistants(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter lab assistants based on role number
  const filteredLabAssistants = labAssistants.filter(
    (assistant) => assistant.role === 3 // Assuming 3 corresponds to LABASSISTANT
  );

  // Handler functions for CRUD operations
  const handleEditLabAssistant = (assistant) => {
    setSelectedAssistant(assistant);
    setEditDialogOpen(true);
  };

  const handleDeleteLabAssistant = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/Users/${id}`)
      .then(() => {
        setLabAssistants(
          labAssistants.filter((assistant) => assistant.id !== id)
        );
      })
      .catch((error) => console.error("Error deleting lab assistant:", error));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/Users/${selectedAssistant.id}`,
        selectedAssistant
      )
      .then(() => {
        setLabAssistants(
          labAssistants.map((assistant) =>
            assistant.id === selectedAssistant.id
              ? selectedAssistant
              : assistant
          )
        );
        setEditDialogOpen(false);
      })
      .catch((error) => console.error("Error updating lab assistant:", error));
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
    setSelectedAssistant(null);
  };

  const handleInputChange = (e) => {
    setSelectedAssistant({
      ...selectedAssistant,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Lab Assistants
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLabAssistants.length > 0 ? (
                filteredLabAssistants.map((assistant) => (
                  <TableRow key={assistant.id}>
                    <TableCell>{assistant.name}</TableCell>
                    <TableCell>{assistant.email}</TableCell>
                    <TableCell>{assistant.department}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditLabAssistant(assistant)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteLabAssistant(assistant.id)}
                        sx={{ ml: 1 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No lab assistants found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Edit Lab Assistant</DialogTitle>
          <DialogContent>
            {selectedAssistant && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedAssistant.name}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={selectedAssistant.email}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="department"
                  label="Department"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={selectedAssistant.department}
                  onChange={handleInputChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminDashboardLayout>
  );
}