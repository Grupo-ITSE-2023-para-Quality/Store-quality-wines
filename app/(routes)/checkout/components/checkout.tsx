import React from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";

const Checkout: React.FC = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        style={{ marginTop: "20px", fontWeight: "bold" }}
      >
        Checkout
      </Typography>

      <Box mt={4}>
        <Typography variant="h6">Contacto</Typography>
        <TextField fullWidth label="Número de teléfono" margin="normal" />
        <TextField fullWidth label="Email (opcional)" margin="normal" />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre (optional)"
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Apellido" margin="normal" />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Button variant="contained" color="primary">
          Finalizar pedido
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
