"use client";

import { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import toast from "react-hot-toast";

interface CheckoutData {
  name: string;
  lastName: string;
  phone: string;
  email: string;
}

const ClientForm = () => {
  const cart = useCart();
  const items = useCart((state) => state.items);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const checkoutData: CheckoutData = { name, lastName, phone, email };

    if (items.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
          checkoutData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onCheckoutSuccess(response.data.url);
    } catch (error) {
      console.error("Error durante el checkout:", error);
      toast.error(
        "Ocurrió un error durante el checkout. Por favor, inténtalo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckoutSuccess = (url: string) => {
    toast.success(
      "¡Gracias por tu compra! Pronto recibirás un mensaje vía WhatsApp."
    );
    cart.removeAll(); // Vaciar el carrito
    window.location.href = "/";
  };

  return (
    <Box mt={4} className="bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Datos del cliente
        </h2>
        <TextField
          fullWidth
          required
          label="Número de teléfono"
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
            className="w-full bg-blue-500 text-white py-2 rounded-md"
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
