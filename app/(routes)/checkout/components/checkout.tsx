import React from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import Button from "@/components/ui/button";

const Checkout: React.FC = () => {

  const boxStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginTop: '16px',
  };

  const textFieldStyle: React.CSSProperties = {
    backgroundColor: 'white',
  };

    return (
    <Box style={boxStyle}>

      <h1 className="text-3xl font-bold text-black">Checkout</h1>

      <Box mt={4}>
        <h2>Contacto</h2>
    
        <TextField
          fullWidth
          label="Número de teléfono"
          margin="normal"
          InputProps={{
            style: textFieldStyle
          }}
        />
        <TextField
          fullWidth
          label="Email (opcional)"
          margin="normal"
          InputProps={{
            style: textFieldStyle
          }}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Nombre (opcional)"
              margin="normal"
              InputProps={{
                style: textFieldStyle
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Apellido"
              margin="normal"
              InputProps={{
                style: textFieldStyle
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <Button color="primary" className="w-full">
          Finalizar pedido
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
