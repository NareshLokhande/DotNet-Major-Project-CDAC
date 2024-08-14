import React, { useState } from "react";
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
import DashboardLayout from "./UserDashboard"; 

function createData(sampleId, testName, dateSubmitted, status) {
  return { sampleId, testName, dateSubmitted, status };
}

const rows = [
  createData("001", "Blood Test", "2024-08-01", "Processing"),
  createData("002", "Urine Test", "2024-08-02", "Completed"),
  createData("003", "X-Ray", "2024-08-05", "Pending"),
];

export default function SampleTracking() {
  return (
    <DashboardLayout>
      <Box
        sx={{
          mt: 10,
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 5 }}>
          Sample Tracking
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table aria-label="sample tracking table">
            <TableHead>
              <TableRow>
                <TableCell>Sample ID</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Date Submitted</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.sampleId}>
                  <TableCell>{row.sampleId}</TableCell>
                  <TableCell>{row.testName}</TableCell>
                  <TableCell>{row.dateSubmitted}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
}
