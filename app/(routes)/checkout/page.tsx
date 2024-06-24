"use client";


import React from "react";
import Checkout from "./components/checkout";
import { Container, Grid } from "@mui/material";
import CartItem from "../cart/components/cart-item";
import useCart from "@/hooks/use-cart";

const CheckoutPage: React.FC = () => {
  const cart = useCart();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Checkout />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "16px" }}>
          {cart.items.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
