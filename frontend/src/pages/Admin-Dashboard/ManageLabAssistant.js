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

export default function ManageLabAssistants() {
  const [labAssistants, setLabAssistants] = useState([]);

  // Fetch lab assistants from API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/labassistants`)
      .then((response) => setLabAssistants(response.data))
      .catch((error) => console.error("Error fetching lab assistants:", error));
  }, []);

  // Handler functions for CRUD operations
  const handleEditLabAssistant = (id) => {
    // Logic for editing lab assistant
    console.log(`Edit lab assistant with id: ${id}`);
  };

  const handleDeleteLabAssistant = (id) => {
    // Logic for deleting lab assistant
    console.log(`Delete lab assistant with id: ${id}`);
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
              {labAssistants.map((assistant) => (
                <TableRow key={assistant.id}>
                  <TableCell>{assistant.name}</TableCell>
                  <TableCell>{assistant.email}</TableCell>
                  <TableCell>{assistant.department}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditLabAssistant(assistant.id)}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminDashboardLayout>
  );
}
