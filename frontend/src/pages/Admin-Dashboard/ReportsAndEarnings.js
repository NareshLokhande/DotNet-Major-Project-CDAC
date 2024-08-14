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
import AdminDashboardLayout from "./AdminDashboardlayout"; 


export default function ReportsAndEarnings() {
  const [reports, setReports] = useState([]);
  const [earnings, setEarnings] = useState([]);

  // Fetch reports and earnings from API
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/reports`).then((response) => setReports(response.data));
    
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/earnings`).then((response) => setEarnings(response.data));
  }, []);

  return (
    <AdminDashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Reports and Earnings
        </Typography>
        <Typography variant="h6">Reports</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    {/* Add buttons for View Details here */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Earnings
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earnings.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{earning.date}</TableCell>
                  <TableCell>{earning.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </AdminDashboardLayout>
  );
}
