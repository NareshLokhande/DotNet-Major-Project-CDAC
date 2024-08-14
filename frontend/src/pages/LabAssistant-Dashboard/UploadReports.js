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
  Input,
} from "@mui/material";
import axios from "axios";
import LabAssistantDashboardLayout from "./LabAssistantDashboardlayout";

export default function UploadReports() {
  const [appointments, setAppointments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch the list of appointments from the API
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/labassistant/appointments`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (appointmentId) => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("report", selectedFile);

    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/labassistant/appointments/${appointmentId}/uploadReport`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        alert("Report uploaded successfully!");
        setSelectedFile(null); // Reset the file input
      })
      .catch((error) => console.error("Error uploading report:", error));
  };

  return (
    <LabAssistantDashboardLayout>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Upload User Reports
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Appointment ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Upload Report</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.id}</TableCell>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.test}</TableCell>
                    <TableCell>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        sx={{ mr: 2 }}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpload(appointment.id)}
                      >
                        Upload
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No appointments available for report upload
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
