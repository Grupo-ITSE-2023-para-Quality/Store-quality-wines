"use client";

import { Suspense } from 'react';
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import ClientForm from "./components/client-form";

function CartPageContent() {
  const cart = useCart();

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-8 sm:px-6 lg:px-8 mt-28">
          <h1 className="text-3xl font-bold text-black">Carrito de compras</h1>
          <div className="mt-4 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">
                  No hay productos en el carrito
                </p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 space-y-8 mb-24">
              <Summary />
              <ClientForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CartPageContent />
    </Suspense>
  );
}