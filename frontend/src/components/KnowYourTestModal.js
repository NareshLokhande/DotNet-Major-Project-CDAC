import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const KnowYourTestModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    number: "", // Update to match the `Number` property in your model
    symptoms: "",
    dateOfCall: "", // Update to match the `DateOfCall` property in your model
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7093/api/Callbacks",
        formData
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Your test information has been submitted successfully!");
        setFormData({
          name: "",
          number: "",
          symptoms: "",
          dateOfCall: "",
        });
        handleClose(); // Close the modal after successful submission
      }
    } catch (error) {}
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Know Your Test</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please fill out the details below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            name="number" // Updated to match the `Number` property in your model
            value={formData.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            label="Preferred Callback Time"
            name="dateOfCall" // Updated to match the `DateOfCall` property in your model
            type="datetime-local"
            value={formData.dateOfCall}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true, // Ensure the label stays above the input for date-time picker
            }}
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default KnowYourTestModal;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Typography,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import axios from "axios";

// const KnowYourTestModal = ({ open, handleClose }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     number: "",
//     symptoms: "",
//     dateOfCall: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://localhost:7093/api/Callbacks",
//         formData
//       );
//       if (response.status === 200) {
//         toast.success("Your test information has been submitted successfully!");
//         setFormData({
//           name: "",
//           number: "",
//           symptoms: "",
//           dateOfCall: "",
//         });
//         handleClose(); // Close the modal after successful submission
//       }
//     } catch (error) {
//       toast.error("An error occurred while submitting your information.");
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//       <DialogTitle>Know Your Test</DialogTitle>
//       <DialogContent>
//         <Typography variant="body1" gutterBottom>
//           Please fill out the details below.
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Phone Number"
//             name="phoneNumber"
//             value={formData.number}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Symptoms"
//             name="symptoms"
//             value={formData.symptoms}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//             multiline
//             rows={4}
//           />
//           <TextField
//             label=""
//             name="callbackTime"
//             type="datetime-local"
//             value={formData.dateOfCall}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button type="submit" color="primary">
//               Submit
//             </Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default KnowYourTestModal;
