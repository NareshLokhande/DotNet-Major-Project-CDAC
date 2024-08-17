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
  Modal,
  MenuItem,
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
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(""); 
  const [openTestModal, setOpenTestModal] = useState(false);
  const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

  // Fetch Tests and Departments
  useEffect(() => {
    axios
      .get("https://localhost:7093/api/Tests")
      .then((response) => setTests(response.data))
      .catch((error) => console.error("Error fetching tests:", error));

    axios
      .get("https://localhost:7093/api/Departments")
      .then((response) => {
        console.log("Departments fetched:", response.data);
        setDepartments(response.data);
      })

      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  // Create Department
  const handleCreateDepartment = () => {
    axios
      .post("https://localhost:7093/api/Departments", {
        departmentName: newDepartmentName, // Fix typo here
      })
      .then((response) => {
        setDepartments([...departments, response.data]);
        setNewDepartmentName("");
        setOpenDepartmentModal(false);
      })
      .catch((error) => console.error("Error creating department:", error));
  };

  // Create Test
  const handleCreateTest = () => {
    //looging the data being sent  
    console.log("Creating Test with data:", {
        testName: newTestName,
        price: newTestPrice,
        departmentId: selectedDepartmentId,
      });

    axios
      .post("https://localhost:7093/api/Tests", {
        testName: newTestName,
        price: newTestPrice,
        departmentId: selectedDepartmentId,
      })
      .then((response) => {
        setTests([...tests, response.data]);
        setNewTestName("");
        setNewTestPrice("");
        setSelectedDepartmentId(""); // Clear selection after creation
        setOpenTestModal(false);
      })
      .catch((error) => {
        console.error(
          "Error creating test:",
          error.response ? error.response.data : error.message
        );
      });
  }

  // Delete Test
  const handleDeleteTest = (id) => {
    axios
      .delete(`https://localhost:7093/api/Tests/${id}`)
      .then(() => {
        setTests(tests.filter((test) => test.testID !== id));
      })
      .catch((error) => console.error("Error deleting test:", error));
  };

  // Delete Department
  const handleDeleteDepartment = (id) => {
    axios
      .delete(`https://localhost:7093/api/Departments/${id}`)
      .then(() => {
        setDepartments(
          departments.filter((department) => department.departmentId !== id)
        );
      })
      .catch((error) => console.error("Error deleting department:", error));
  };

  // Modal Handlers
  const handleOpenTestModal = () => {
    console.log("Departments state before opening modal:", departments);
    setOpenTestModal(true);
  }

  const handleCloseTestModal = () => setOpenTestModal(false);

  const handleOpenDepartmentModal = () => {
    console.log("Departments state before opening department modal:", departments); 
    setOpenDepartmentModal(true);
  }
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.departmentId}>
                  <TableCell>{department.departmentName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleDeleteDepartment(department.departmentId)
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
              InputProps={{ inputProps: { min: 0 } }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartmentId || ""}
                onChange={(e) => {
                  console.log("Selected Department ID:", e.target.value);
                  setSelectedDepartmentId(e.target.value);
                }}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department.departmentId}
                    value={department.departmentId}
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

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Modal,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
// } from "@mui/material";
// import axios from "axios";
// import AdminDashboardLayout from "./AdminDashboardlayout";

// export default function ManageTestsAndDepartments() {
//   const [tests, setTests] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [newTestName, setNewTestName] = useState("");
//   const [newTestPrice, setNewTestPrice] = useState("");
//   const [newDepartmentName, setNewDepartmentName] = useState("");
//   const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
//   const [openTestModal, setOpenTestModal] = useState(false);
//   const [openDepartmentModal, setOpenDepartmentModal] = useState(false);

//   // Fetch Tests and Departments
//   useEffect(() => {
//     axios
//       .get("https://localhost:7093/api/Tests")
//       .then((response) => setTests(response.data))
//       .catch((error) => console.error("Error fetching states:", error));

//     axios
//       .get("https://localhost:7093/api/Departments")
//       .then((response) => setDepartments(response.data))
//       .catch((error) => console.error("Error fetching cities:", error));
//   }, []);

//   // Create Department
//   const handleCreateDepartment = () => {
//     axios
//       .post("https://localhost:7093/api/Departments", {
//         departmentNameName: newDepartmentName,
//       })
//       .then((response) => {
//         setDepartments([...departments, response.data]);
//         setNewDepartmentName("");
//         setOpenDepartmentModal(false);
//       })
//       .catch((error) => console.error("Error creating state:", error));
//   };

//   //create test
//   const handleCreateTest = () => {
//     axios
//       .post("https://localhost:7093/api/Tests", {
//         testName: newTestName,
//         price: newTestPrice,
//         departmentID: selectedDepartmentId,
//       })
//       .then((response) => {
//         setTests([...tests, response.data]);
//         setNewTestName("");
//         setNewTestPrice("");
//         setSelectedDepartmentId("");
//         setOpenTestModal(false);
//       })
//       .catch((error) => console.error("Error creating state:", error));
//   };

//   // Delete Test
//   const handleDeleteTest = (id) => {
//     axios
//     .delete(`https://localhost:7093/api/Tests/${id}`)
//     .then(() => {
//       setTests(tests.filter((test) => test.id !== id));
//     })
//     .catch((error) => console.error("Error deleting Test :",error));
//   };

//   // Delete Department
//   const handleDeleteDepartment = (id) => {
//     axios
//     .delete(`https://localhost:7093/api/Departments/${id}`)
//     .then(() => {
//       setDepartments(departments.filter((department) => department.id !== id));
//     })
//     .catch ((error) => console.error("Error deleting department:", error));
//   };

//   // Modal Handlers
//   const handleOpenTestModal = () => setOpenTestModal(true);
//   const handleCloseTestModal = () => setOpenTestModal(false);
//   const handleOpenDepartmentModal = () => setOpenDepartmentModal(true);
//   const handleCloseDepartmentModal = () => setOpenDepartmentModal(false);

//   return (
//     <AdminDashboardLayout>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" sx={{ mb: 4 }}>
//           Manage Tests and Departments
//         </Typography>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenTestModal}
//         >
//           Add Test
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenDepartmentModal}
//           sx={{ ml: 2 }}
//         >
//           Add Department
//         </Button>

//         <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
//           Tests
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tests.map((test) => (
//                 <TableRow key={test.testID}>
//                   <TableCell>{test.testName}</TableCell>
//                   <TableCell>{test.price}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteTest(test.testID)}
//                       sx={{ ml: 1 }}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
//           Departments
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {departments.map((department) => (
//                 <TableRow key={department.departmentID}>
//                   <TableCell>{department.departmentName}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteDepartment(department.departmentID)
//                       }
//                       sx={{ ml: 1 }}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Department Creation Modal */}
//         <Modal open={openDepartmentModal} onClose={handleCloseDepartmentModal}>
//           <Box
//             sx={{
//               p: 3,
//               maxWidth: 400,
//               margin: "auto",
//               mt: 10,
//               bgcolor: "white",
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Add Department
//             </Typography>
//             <TextField
//               label="Department Name"
//               value={newDepartmentName}
//               onChange={(e) => setNewDepartmentName(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateDepartment}
//               sx={{ mr: 1 }}
//             >
//               Create
//             </Button>
//             <Button variant="outlined" onClick={handleCloseDepartmentModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Modal>

//         {/* Test Creation Modal */}
//         <Modal open={openTestModal} onClose={handleCloseTestModal}>
//           <Box
//             sx={{
//               p: 3,
//               maxWidth: 400,
//               margin: "auto",
//               mt: 10,
//               bgcolor: "white",
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Add Test
//             </Typography>
//             <TextField
//               label="Test Name"
//               value={newTestName}
//               onChange={(e) => setNewTestName(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Price"
//               value={newTestPrice}
//               onChange={(e) => setNewTestPrice(e.target.value)}
//               fullWidth
//               sx={{ mb: 2 }}
//               type="number"
//               InputProps={{ inputProps: { min: 0 } }}
//             />
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Department</InputLabel>
//               <Select
//                 value={selectedDepartmentId}
//                 onChange={(e) => setSelectedDepartmentId(e.target.value)}
//               >
//                 {departments.map((department) => (
//                   <MenuItem
//                     key={department.departmentID}
//                     value={department.departmentID}
//                   >
//                     {department.departmentName}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleCreateTest}
//               sx={{ mr: 1 }}
//             >
//               Create
//             </Button>
//             <Button variant="outlined" onClick={handleCloseTestModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Modal>
//       </Box>
//     </AdminDashboardLayout>
//   );
// }
