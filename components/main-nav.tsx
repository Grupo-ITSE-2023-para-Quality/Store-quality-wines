"use client";
import React, { useState } from "react";
import Link from "next/link";
import useCart from "@/hooks/use-cart";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import Button from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { Billboard, Product, Category } from "@/types";
import ProductSearch from "@/components/ui/search-bar";
import logo from "@/app/wine.png";
import Image from "next/image";

interface MainNavProps {
  data: Billboard[];
  products: Product[];
  categories: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data, products, categories }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const cart = useCart();

  const createNavItems = (data: Billboard[]) => {
    return data
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((item) => {
        const relatedCategories = categories.filter(
          (category) => category.billboardId === item.id
        );
        return {
          name: item.label,
          href: `/billboard/${item.id}`,
          dropdownItems: relatedCategories.map((category) => ({
            name: category.name,
            href: `/category/${category.id}`,
          })),
        };
      });
  };

  const routes = createNavItems(data).map((route) => ({
    ...route,
    active: pathname === route.href,
  }));

  const styles: { [key: string]: React.CSSProperties }  = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      backgroundColor: "white",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
      zIndex: 50,
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    search: {
      flex: 1,
      display: "none",
    },
    searchMobile: {
      display: "flex",
      padding: "1rem",
      margin: "0 auto",
      width: "80%",
      justifyContent: "center",
    },
    searchMobileInput: {
      width: "100%",
      textAlign: "center",
    },
    cart: {
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    cartBadge: {
      position: "absolute",
      top: "-5px",
      right: "-10px",
      backgroundColor: "red",
      color: "white",
      fontSize: "10px",
      fontWeight: "bold",
      borderRadius: "50%",
      padding: "2px 5px",
    },
    menuButton: {
      display: "none",
    },
    categoriesContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
    },
    menu: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease-in-out",
      padding: " 0",
      width: "100%",
      maxWidth: "1200px",
    },
    menuMobile: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      width: "100%",
      padding: "0.5rem 0",
      backgroundColor: "white",
    },
    link: {
      fontSize: "14px",
      fontWeight: "500",
      textDecoration: "none",
      color: "black",
      padding: "0.5rem",
      textAlign: "center",
      display: "block",
      width: "100%",
    },
    linkMobile: {
      width: "100%",
      textAlign: "center",
      padding: "0.5rem 0",
    },
    pageMargin: {
      marginTop: "64px", // Altura aproximada de la navbar
    },
  };

  const mediaQueries = {
    "@media (max-width: 768px)": {
      pageMargin: {
        marginTop: "96px", // Mayor margen para dispositivos móviles
      },
    },
  };
  
  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <Link href="/" style={styles.logo}>
            <Image src={logo.src} alt="Logo" height={48} width={48} />
          </Link>
          <button
            className="lg:hidden"
            style={{ ...styles.menuButton, display: "block" }}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <Search className="h-6 w-6" />
          </button>

          <div className="lg:flex" style={styles.search}>
            <ProductSearch className="w-full" />
          </div>

          <Link href="/cart" style={styles.cart}>
            <Button
              onClick={() => router.push("/cart")}
              className="flex items-center rounded-full bg-black px-4 py-2"
            >
              <ShoppingBag size={20} color="white" />
              <span className="ml-2 text-sm font-medium text-white">
                {cart.items.length}
              </span>
            </Button>
          </Link>
        </div>

        {menuOpen && (
          <div className="lg:hidden" style={styles.searchMobile}>
            <ProductSearch
              className="w-full text-center"
              style={styles.searchMobileInput}
            />
          </div>
        )}

        <div style={styles.categoriesContainer}>
          <div
            className={`lg:flex ${menuOpen ? "flex" : "hidden"}`}
            style={{
              ...styles.menu,
              ...(menuOpen && styles.menuMobile),
            }}
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                style={{
                  ...styles.link,
                  ...(menuOpen && styles.linkMobile),
                  color: route.active ? "black" : "#888",
                }}
              >
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div style={{ ...styles.pageMargin, ...mediaQueries["@media (max-width: 768px)"].pageMargin }}></div>
    </>
  );
};

export default MainNav;
