"use client";

import { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { sendOrder } from "@/app/api/orders/sendOrder";

const ClientForm = () => {
  const cart = useCart();
  const items = cart.items;
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (items.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

  // Validar el número de teléfono
  const phonePattern = /^\d{10}$/; // Debe tener exactamente 10 dígitos
  const invalidPattern = /^\d{2}1[5]/; // Tercera y cuarta posición no pueden ser 15

  if (!phonePattern.test(phone) || invalidPattern.test(phone)) {
    toast.error("El número de teléfono debe tener 10 dígitos sin el 0 y sin el 15.");
    return;
  }

    setIsLoading(true);

    try {
      // Enviar los datos del formulario y el carrito al backend
      const response = await sendOrder(
        name,
        lastName,
        phone,
        email || null, // si el email es opcional
        items
      );
      onCheckoutSuccess(response);
    } catch (error) {
      console.error("Error durante el checkout:", error);
      toast.error("Ocurrió un error durante el checkout. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckoutSuccess = (url?: string) => {
    toast.success("¡Gracias por tu compra! Pronto recibirás un mensaje.");
    cart.removeAll(); // Vaciar el carrito
    window.location.href = "/";
  };
  
  return (
    <Box mt={4}>
      <form onSubmit={handleSubmit}>
        <h2>Datos del cliente</h2>
        <TextField
          fullWidth
          required
          label="Número de teléfono"
          placeholder="Ingrese su número sin 0 y sin 15"
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
        />
        <TextField
          fullWidth
          label="Email (opcional)"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Nombre"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Apellido"
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Finalizar pedido"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ClientForm;