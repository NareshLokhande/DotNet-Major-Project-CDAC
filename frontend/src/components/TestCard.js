import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TestsPage() {
  const [tests, setTests] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/Tests`)
      .then((response) => setTests(response.data))
      .catch((error) => console.error("Error fetching tests:", error));
  }, []);

  const addToCart = (test) => {
    setCart((prevCart) => [...prevCart, test]);
  };

  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  return (
    <Box sx={{ mt: 10, p: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Available Tests
      </Typography>
      <Grid container spacing={2}>
        {tests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.testID}>
            <Card>
              <CardContent>
                <Typography variant="h6">{test.testName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {test.department?.departmentName}{" "}
                  {/* Display department name */}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Price: ₹{test.price}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => addToCart(test)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={goToCart}
      >
        Go to Cart
      </Button>
    </Box>
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function TestsPage() {
//   const [tests, setTests] = useState([]);
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${process.env.REACT_APP_API_BASE_URL}/Tests`)
//       .then((response) => setTests(response.data))
//       .catch((error) => console.error("Error fetching tests:", error));
//   }, []);

//   const addToCart = (test) => {
//     setCart((prevCart) => [...prevCart, test]);
//   };

//   const goToCart = () => {
//     navigate("/cart", { state: { cart } });
//   };

//   return (
//     <Box sx={{ mt: 10, p: 5 }}>
//       <Typography variant="h4" sx={{ mb: 4 }}>
//         Available Tests
//       </Typography>
//       <Grid container spacing={2}>
//         {tests.map((test) => (
//           <Grid item xs={12} sm={6} md={4} key={test.testID}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{test.testName}</Typography>
//                 {/* Display the department name here */}
//                 <Typography variant="body2" color="text.secondary">
//                   Department: {test.deaprtment?.departmentName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mt: 2 }}>
//                   Price: ₹{test.price}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{ mt: 2 }}
//                   onClick={() => addToCart(test)}
//                 >
//                   Add to Cart
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 4 }}
//         onClick={goToCart}
//       >
//         Go to Cart
//       </Button>
//     </Box>
//   );
// }

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Button,
// // } from "@mui/material";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// // export default function TestsPage() {
// //   const [tests, setTests] = useState([]);
// //   const [cart, setCart] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     axios
// //       .get(`${process.env.REACT_APP_API_BASE_URL}/Tests`)
// //       .then((response) => setTests(response.data))
// //       .catch((error) => console.error("Error fetching tests:", error));
// //   }, []);

// //   const addToCart = (test) => {
// //     setCart((prevCart) => [...prevCart, test]);
// //   };

// //   const goToCart = () => {
// //     navigate("/cart", { state: { cart } });
// //   };

// //   return (
// //     <Box sx={{ mt: 10, p: 5 }}>
// //       <Typography variant="h4" sx={{ mb: 4 }}>
// //         Available Tests
// //       </Typography>
// //       <Grid container spacing={2}>
// //         {tests.map((test) => (
// //           <Grid item xs={12} sm={6} md={4} key={test.testID}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6">{test.testName}</Typography>
// //                 <Typography variant="body2" color="text.secondary">{departmentname}
// //                 </Typography>
// //                 <Typography variant="body1" sx={{ mt: 2 }}>
// //                   Price: ${test.price}
// //                 </Typography>
// //                 <Button
// //                   variant="contained"
// //                   sx={{ mt: 2 }}
// //                   onClick={() => addToCart(test)}
// //                 >
// //                   Add to Cart
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>
// //       <Button
// //         variant="contained"
// //         color="primary"
// //         sx={{ mt: 4 }}
// //         onClick={goToCart}
// //       >
// //         Go to Cart
// //       </Button>
// //     </Box>
// //   );
// // }
