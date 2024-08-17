import * as React from "react";
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import UserDashboardLayout from "./UserDashboard";
import { useAuth } from "../../context/AuthContext";

function AppointmentBooking() {
  const theme = useTheme();
  const { userID } = useAuth(); // Get userID from AuthContext

  const [test, setTest] = React.useState(""); // Initialize with an empty string
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [tests, setTests] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]); // State to hold user's appointments

  // Base URL from environment variables
  const apiBaseUrl = "https://localhost:7093/api";

  React.useEffect(() => {
    // Fetch available tests
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

  React.useEffect(() => {
    // Fetch user's appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/appointments?patientId=${userID}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userID, apiBaseUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointment = {
      patientId: userID,
      testId: test || null, 
      date: `${date}T${time}`,
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
    <UserDashboardLayout>
      <Container maxWidth="sm" sx={{ py: 4 }}>
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
            mt: 4,
          }}
        >
          <FormControl fullWidth required>
            <InputLabel>Test</InputLabel>
            <Select
              value={test || ""}
              onChange={(e) => setTest(e.target.value)}
              label="Test"
            >
              {tests.map((test) => (
                <MenuItem key={test.testId} value={test.testId}>
                  {test.testName}
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

      <Container maxWidth="sm" sx={{ py: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Appointments
        </Typography>
        <List>
          {appointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              sx={{
                boxShadow: theme.shadows[1],
                borderRadius: theme.shape.borderRadius,
                mb: 2,
              }}
            >
              <ListItemText
                primary={`Test: ${appointment.test.testName}`} // Adjust if test name is stored differently
                secondary={`Date: ${new Date(
                  appointment.date
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </UserDashboardLayout>
  );
}

export default AppointmentBooking;