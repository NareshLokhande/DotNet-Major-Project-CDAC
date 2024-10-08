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
import KnowYourTestModal from "../../components/KnowYourTestModal";

export default function CallbackRequests() {
  const [callbacks, setCallbacks] = useState([]);
  const [selectedCallback, setSelectedCallback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Callbacks`)
      .then((response) => setCallbacks(response.data))
      .catch((error) =>
        console.error("Error fetching callback requests:", error)
      );
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCallback(null);
  };

  const handleMarkAsCompleted = async (callbackId) => {
    try {
      // Find the callback object you want to update
      const callbackToUpdate = callbacks.find(
        (callback) => callback.id === callbackId
      );

      if (!callbackToUpdate) {
        console.error("Callback not found");
        return;
      }

      // Send the full updated object to the API
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/Callbacks/${callbackId}`,
        {
          ...callbackToUpdate,
          isCompleted: true,
        }
      );

      // Update the callback status locally
      setCallbacks(
        callbacks.map((callback) =>
          callback.id === callbackId
            ? { ...callback, isCompleted: true }
            : callback
        )
      );

      // Close the modal after updating
      handleCloseModal();
    } catch (error) {
      console.error("Error updating callback status:", error);
    }
  };

  // Filter the callbacks to only show the ones that are pending (isCompleted: false)
  const pendingCallbacks = callbacks.filter(
    (callback) => !callback.isCompleted
  );

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
                <TableCell>Symptoms</TableCell>
                <TableCell>Date of Call</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingCallbacks.length > 0 ? (
                pendingCallbacks.map((callback) => (
                  <TableRow key={callback.id}>
                    <TableCell>{callback.id}</TableCell>
                    <TableCell>{callback.name}</TableCell>
                    <TableCell>{callback.number}</TableCell>
                    <TableCell>{callback.symptoms}</TableCell>
                    <TableCell>
                      {new Date(callback.dateOfCall).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleMarkAsCompleted(callback.id)}
                      >
                        Handle Callback
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No pending callback requests available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Know Your Test Modal */}
      {selectedCallback && (
        <KnowYourTestModal
          open={modalOpen}
          handleClose={handleCloseModal}
          formData={{
            name: selectedCallback.name,
            phoneNumber: selectedCallback.number,
            symptoms: selectedCallback.symptoms,
            callbackTime: new Date(selectedCallback.dateOfCall)
              .toISOString()
              .slice(0, 16), // Format date for input
          }}
          onComplete={() => handleMarkAsCompleted(selectedCallback.id)}
        />
      )}
    </LabAssistantDashboardLayout>
  );
}