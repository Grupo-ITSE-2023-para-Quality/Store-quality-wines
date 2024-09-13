export async function sendOrder(storeId: string, name: string, lastName: string, phone: string, email: string | null, cartItems: any[]) {
    try {
      const response = await fetch(`/api/${storeId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastName,
          phone,
          email,
          cartItems,
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
  