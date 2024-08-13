import * as React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

function AppointmentBooking() {
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [test, setTest] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [tests, setTests] = React.useState([]);

  // Base URL from environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  React.useEffect(() => {
    // Fetch available tests when component mounts
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/tests`);
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [apiBaseUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointment = {
      patientName: name, // Use patient name instead of ID
      testID: test,
      appointmentDate: `${date}T${time}`,
      status: "Scheduled",
      createdBy: "",
      createdDate: new Date().toISOString(),
      modifiedBy: "",
      modifiedDate: new Date().toISOString(),
    };

    try {
      await axios.post(`${apiBaseUrl}/appointments`, appointment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4, mt: 8 }}>
      {" "}
      {/* Add margin-top to create space below the navbar */}
      <Typography variant="h4" component="h1" gutterBottom>
        Book an Appointment
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          mt: 4, // Add margin-top to create space between the heading and form
        }}
      >
        <TextField
          label="Patient Name" // Changed from "Patient ID" to "Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormControl fullWidth required>
          <InputLabel>Test</InputLabel>
          <Select
            value={test}
            onChange={(e) => setTest(e.target.value)}
            label="Test"
          >
            {tests.map((testItem) => (
              <MenuItem key={testItem.id} value={testItem.id}>
                {testItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Book Appointment
        </Button>
      </Box>
    </Container>
  );
}

export default AppointmentBooking;
