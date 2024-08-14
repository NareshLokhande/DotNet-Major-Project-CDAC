import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function CartPage() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const handleCheckout = () => {
    // Handle checkout process
    console.log("Proceeding to checkout with items:", cart);
  };

  return (
    <Box sx={{ mt: 10, p: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Cart
      </Typography>
      <Grid container spacing={2}>
        {cart.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Price: ${item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}
