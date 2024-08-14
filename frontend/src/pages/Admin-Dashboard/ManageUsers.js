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

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`).then((response) => setUsers(response.data));
  }, []);

  return (
    <AdminDashboardLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Users
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
