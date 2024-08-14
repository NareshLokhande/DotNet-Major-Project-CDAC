import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import LabAssistantDashboardLayout from "./LabAssistantDashboardlayout";

export default function CallbackRequests() {
  const [callbacks, setCallbacks] = useState([]);

  useEffect(() => {
    // Fetch the list of callback requests from the API
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/callbacks`)
      .then((response) => setCallbacks(response.data))
      .catch((error) =>
        console.error("Error fetching callback requests:", error)
      );
  }, []);

  const handleCall = (phoneNumber) => {
    // Handle the call action (this could be more complex, depending on requirements)
    alert(`Calling ${phoneNumber}...`);
  };

  return (
    <LabAssistantDashboardLayout>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Callback Requests
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Reason for Callback</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {callbacks.length > 0 ? (
                callbacks.map((callback) => (
                  <TableRow key={callback.id}>
                    <TableCell>{callback.id}</TableCell>
                    <TableCell>{callback.patientName}</TableCell>
                    <TableCell>{callback.phoneNumber}</TableCell>
                    <TableCell>{callback.reason}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCall(callback.phoneNumber)}
                      >
                        Call
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No callback requests available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LabAssistantDashboardLayout>
  );
}
