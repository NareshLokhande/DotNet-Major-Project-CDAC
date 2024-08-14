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

export default function HomeVisits() {
  const [homeVisits, setHomeVisits] = useState([]);

  // Fetch home visits data from API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/homevisits`)
      .then((response) => setHomeVisits(response.data));
  }, []);

  return (
    <LabAssistantDashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Home Visits
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Test Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homeVisits.map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell>{visit.patientName}</TableCell>
                  <TableCell>{visit.address}</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.time}</TableCell>
                  <TableCell>{visit.testType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </LabAssistantDashboardLayout>
  );
}
