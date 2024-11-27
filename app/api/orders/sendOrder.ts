export async function sendOrder(
  name: string,
  lastName: string,
  phone: string,
  email: string | null,
  cartItems: any[]
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        lastName,
        phone,
        email,
        cartItems: cartItems.map(item => ({
          productId: item.id,  // ID del producto
          quantity: item.quantity,  // Cantidad
          price: item.price,  // Precio
        })),
      }),
    });

    // Verificar si la respuesta no es OK
    if (!response.ok) {
      const errorData = await response.json(); // Intentar obtener el mensaje de error
      throw new Error(errorData.error || 'Error al procesar el pedido'); // Usar el mensaje del servidor si está disponible
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
  }
}