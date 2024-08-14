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
} from "@mui/material";
import axios from "axios";
import LabAssistantDashboardLayout from "./LabAssistantDashboardlayout";

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch upcoming appointments
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/labassistant/appointments/upcoming`
      )
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);

  return (
    <LabAssistantDashboardLayout>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Upcoming Appointments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.location}</TableCell>
                    <TableCell>{appointment.test}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No upcoming appointments
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
