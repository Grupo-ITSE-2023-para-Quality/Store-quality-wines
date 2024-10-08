"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Billboard, Product } from "@/types";
import ProductSearch from "@/components/ui/search-bar"; 

interface MainNavProps {
  data: Billboard[];
  products: Product[];
}

const MainNav: React.FC<MainNavProps> = ({ data, products }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/billboard/${route.id}`,
    label: route.label,
    active: pathname === `/billboard/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center gap-2.5 space-x-4 lg:space-x-6 h-16">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
      <ProductSearch items={products} className="ml-auto" />
    </nav>
  );
};

export default MainNav;