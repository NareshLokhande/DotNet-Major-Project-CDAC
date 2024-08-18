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
  const { userID } = useAuth();

  const [test, setTest] = React.useState("");
  const [departmentID, setDepartmentID] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [tests, setTests] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);


  React.useEffect(() => {
    // Fetch tests
    const fetchTests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/tests`
        );
        console.log("Fetched tests:", response.data);
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, [process.env.REACT_APP_API_BASE_URL]);

  React.useEffect(() => {
    // Fetch user's appointments
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/appointments?patientId=${userID}`
        );
        console.log("Fetched appointments:", response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userID, process.env.REACT_APP_API_BASE_URL]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const appointment = {
      patientId: userID,
      testId: test || null,
      departmentID: departmentID || null,
      date: `${date}T${time}`,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/appointments`,
        appointment,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Appointment booked successfully!");

      // Fetch updated appointments after booking
      const updatedAppointments = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/appointments?patientId=${userID}`
      );
      setAppointments(updatedAppointments.data);
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
              onChange={(e) => {
                const selectedTest = tests.find(
                  (test) => test.testID === e.target.value
                );
                if (selectedTest) {
                  setTest(selectedTest.testID);
                  setDepartmentID(selectedTest.departmentID); 
                }
              }}
              label="Test"
            >
              {tests.map((test) => (
                <MenuItem key={test.testID} value={test.testID}>
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
              key={appointment.appointmentId}
              sx={{
                boxShadow: theme.shadows[1],
                borderRadius: theme.shape.borderRadius,
                mb: 2,
              }}
            >
              <ListItemText
                primary={`Test: ${appointment.test?.testName || "N/A"}`}
                secondary={`Date: ${new Date(appointment.date).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </UserDashboardLayout>
  );
}

export default AppointmentBooking;