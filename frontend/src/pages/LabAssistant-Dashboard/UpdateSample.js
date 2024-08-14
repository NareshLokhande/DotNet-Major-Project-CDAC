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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import axios from "axios";
import LabAssistantDashboardLayout from "./LabAssistantDashboardlayout";

export default function SampleTracking() {
  const [samples, setSamples] = useState([]);
  const [statusOptions] = useState([
    "Pending",
    "In Progress",
    "Completed",
    "Error",
  ]);

  useEffect(() => {
    // Replace this with your actual API endpoint to fetch sample data
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/labassistant/samples`)
      .then((response) => setSamples(response.data))
      .catch((error) => console.error("Error fetching samples:", error));
  }, []);

  const handleStatusChange = (sampleId, newStatus) => {
    // Update the status in the backend
    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}/labassistant/samples/${sampleId}`,
        {
          status: newStatus,
        }
      )
      .then((response) => {
        // Update the local state to reflect the change
        setSamples((prevSamples) =>
          prevSamples.map((sample) =>
            sample.id === sampleId ? { ...sample, status: newStatus } : sample
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <LabAssistantDashboardLayout>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Sample Tracking
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sample ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Test</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {samples.length > 0 ? (
                samples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell>{sample.id}</TableCell>
                    <TableCell>{sample.patientName}</TableCell>
                    <TableCell>{sample.test}</TableCell>
                    <TableCell>{sample.status}</TableCell>
                    <TableCell>
                      <FormControl>
                        <Select
                          value={sample.status}
                          onChange={(e) =>
                            handleStatusChange(sample.id, e.target.value)
                          }
                        >
                          {statusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        onClick={() =>
                          handleStatusChange(sample.id, sample.status)
                        }
                        sx={{ ml: 2 }}
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No samples available for tracking
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
