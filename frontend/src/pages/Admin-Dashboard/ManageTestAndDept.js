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

export default function ManageTestsAndDepartments() {
  const [tests, setTests] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch tests and departments from API
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/tests`)
      .then((response) => setTests(response.data));
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/departments`)
      .then((response) => setDepartments(response.data));
  }, []);

  // CRUD operations for tests and departments would go here

  return (
    <AdminDashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Tests and Departments
        </Typography>
        <Typography variant="h6">Tests</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.description}</TableCell>
                  <TableCell>
                    {/* Add buttons for Edit/Delete here */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4 }}>
          Departments
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>{department.name}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>
                    {/* Add buttons for Edit/Delete here */}
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
