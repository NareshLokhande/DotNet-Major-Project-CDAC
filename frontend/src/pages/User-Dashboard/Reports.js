import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import UserDashboardLayout from "./UserDashboard";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch the reports from the API
    axios
      .get("/api/reports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  }, []);

  return (
    <UserDashboardLayout>
      <Box
        sx={{
          p: 2,
          mt: 10, // Adjust space for the navbar
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Your Reports
        </Typography>

        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{report.name}</Typography>
                <Typography>Status: {report.status}</Typography>
                <Typography>Date: {report.date}</Typography>
                {report.status === "Pending" && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    The report will be available on {report.expectedTime}.
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </UserDashboardLayout>
  );
}

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, Paper } from "@mui/material";
// import UserDashboardLayout from "./UserDashboard";

// const mockReports = [
//   {
//     id: 1,
//     name: "Blood Test",
//     status: "Completed",
//     date: "2024-08-14",
//     expectedTime: null,
//   },
//   {
//     id: 2,
//     name: "Urine Test",
//     status: "Pending",
//     date: "2024-08-13",
//     expectedTime: "2024-08-14 10:00 AM",
//   },
//   {
//     id: 3,
//     name: "X-Ray",
//     status: "Completed",
//     date: "2024-08-12",
//     expectedTime: null,
//   },
// ];

// export default function Reports() {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     // Fetch the reports from an API or use mock data
//     setReports(mockReports);
//   }, []);

//   return (
//     <UserDashboardLayout>
//       <Box
//         sx={{
//           p: 2,
//           mt: 10, // Adjust space for the navbar
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Typography component="h1" variant="h4" sx={{ mb: 6 }}>
//           Your Reports
//         </Typography>

//         <Grid container spacing={3}>
//           {reports.map((report) => (
//             <Grid item xs={12} sm={6} md={4} key={report.id}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography variant="h6">{report.name}</Typography>
//                 <Typography>Status: {report.status}</Typography>
//                 <Typography>Date: {report.date}</Typography>
//                 {report.status === "Pending" && (
//                   <Typography
//                     variant="body2"
//                     color="textSecondary"
//                     sx={{ mt: 1 }}
//                   >
//                     The report will be available on {report.expectedTime}.
//                   </Typography>
//                 )}
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </UserDashboardLayout>
//   );
// }
