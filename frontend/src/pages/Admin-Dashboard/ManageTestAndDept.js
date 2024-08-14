import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import AdminDashboardLayout from "./AdminDashboardlayout";

export default function ManageTestsAndDepartments() {
  const [tests, setTests] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newTestName, setNewTestName] = useState("");
  const [newTestPrice, setNewTestPrice] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentDescription, setNewDepartmentDescription] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [openTestModal, setOpenTestModal] = useState(false);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

  useEffect(() => {
    // Fetch tests
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Tests`)
      .then((response) => setTests(response.data))
      .catch((error) => console.error("Error fetching tests:", error));

    // Fetch departments
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Departments`)
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleCreateTest = () => {
    if (!newTestName || !newTestPrice || !selectedDepartmentId) {
      console.error("All fields are required");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/Tests`, {
        testName: newTestName, // Ensure this matches your backend model's field name
        price: parseFloat(newTestPrice),
        departmentID: selectedDepartmentId, // Ensure this matches your backend model's field name
      })
      .then((response) => {
        setTests([...tests, response.data]);
        setNewTestName("");
        setNewTestPrice("");
        setSelectedDepartmentId("");
        setOpenTestModal(false);
      })
      .catch((error) => {
        console.error("Error creating test:", error);
        if (error.response) {
          console.log(error.response.data.errors);
        }
      });
  };

  const handleCreateDepartment = () => {
    if (!newDepartmentName || !newDepartmentDescription) {
      console.error("All fields are required");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/Departments`, {
        departmentName: newDepartmentName, // Ensure this matches your backend model's field name
        description: newDepartmentDescription, // Ensure this matches your backend model's field name
      })
      .then((response) => {
        setDepartments([...departments, response.data]);
        setNewDepartmentName("");
        setNewDepartmentDescription("");
        setOpenDepartmentModal(false);
      })
      .catch((error) => {
        console.error("Error creating department:", error);
        if (error.response) {
          console.log(error.response.data.errors);
        }
      });
  };

  const handleDeleteTest = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/Tests/${id}`)
      .then(() => {
        setTests(tests.filter((test) => test.testID !== id));
      })
      .catch((error) => console.error("Error deleting test:", error));
  };

  const handleDeleteDepartment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/Departments/${id}`)
      .then(() => {
        setDepartments(
          departments.filter((department) => department.departmentID !== id)
        );
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  const handleOpenTestModal = () => setOpenTestModal(true);
  const handleCloseTestModal = () => setOpenTestModal(false);
  const handleOpenDepartmentModal = () => setOpenDepartmentModal(true);
  const handleCloseDepartmentModal = () => setOpenDepartmentModal(false);

  return (
    <AdminDashboardLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Manage Tests and Departments
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenTestModal}
        >
          Add Test
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDepartmentModal}
          sx={{ ml: 2 }}
        >
          Add Department
        </Button>

        <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
          Tests
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.testID}>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{test.price}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteTest(test.testID)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
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
                <TableRow key={department.departmentID}>
                  <TableCell>{department.departmentName}</TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteDepartment(department.departmentID)
                      }
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Department Creation Modal */}
        <Modal open={openDepartmentModal} onClose={handleCloseDepartmentModal}>
          <Box
            sx={{
              p: 3,
              maxWidth: 400,
              margin: "auto",
              mt: 10,
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Department
            </Typography>
            <TextField
              label="Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              value={newDepartmentDescription}
              onChange={(e) => setNewDepartmentDescription(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateDepartment}
              sx={{ mr: 1 }}
            >
              Create
            </Button>
            <Button variant="outlined" onClick={handleCloseDepartmentModal}>
              Cancel
            </Button>
          </Box>
        </Modal>

        {/* Test Creation Modal */}
        <Modal open={openTestModal} onClose={handleCloseTestModal}>
          <Box
            sx={{
              p: 3,
              maxWidth: 400,
              margin: "auto",
              mt: 10,
              bgcolor: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Test
            </Typography>
            <TextField
              label="Test Name"
              value={newTestName}
              onChange={(e) => setNewTestName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Price"
              value={newTestPrice}
              onChange={(e) => setNewTestPrice(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              type="number"
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartmentId}
                onChange={(e) => setSelectedDepartmentId(e.target.value)}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department.departmentID}
                    value={department.departmentID}
                  >
                    {department.departmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTest}
              sx={{ mr: 1 }}
            >
              Create
            </Button>
            <Button variant="outlined" onClick={handleCloseTestModal}>
              Cancel
            </Button>
          </Box>
        </Modal>
      </Box>
    </AdminDashboardLayout>
  );
}