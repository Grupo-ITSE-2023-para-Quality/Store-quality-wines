export async function sendOrder(name: string, lastName: string, phone: string, email: string | null, cartItems: any[]) {
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
          productId: item.id, // Asegurarse de enviar el ID correcto
        })),
      }),
    });

    if (!response.ok) {
      throw new Error('Error al procesar el pedido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    throw error;
  }
}
