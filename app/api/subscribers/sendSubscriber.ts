export async function subscribe(email: string): Promise<Response> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message === "Este email ya está suscrito") {
        throw new Error("Este email ya está registrado.");
      }
      throw new Error(errorData.message || 'Error al suscribirse');
    }

    return response; // Retornamos toda la respuesta para usar en el manejo en newsletter.tsx
  } catch (error) {
    console.error('Error al suscribirse:', error);
    throw error;
  }
}
