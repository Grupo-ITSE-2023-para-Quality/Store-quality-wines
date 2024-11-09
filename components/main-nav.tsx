"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Billboard, Product, Category } from "@/types";
import ProductSearch from "@/components/ui/search-bar";
import { ChevronDown } from "lucide-react";

interface MainNavProps {
  data: Billboard[];
  products: Product[];
  categories: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data, products, categories }) => {
  const pathname = usePathname();

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
          dropdownItems: relatedCategories.map((category) => category.name),
        };
      });
  };

  const routes = createNavItems(data).map((route) => ({
    ...route,
    active: pathname === route.href,
  }));

  return (
    <nav className="mx-auto flex flex-col items-center space-y-4 lg:space-y-6 py-4">
      <div className="w-full flex justify-center">
        <ProductSearch items={products} className="w-full max-w-[400px]" />
      </div>

      <div className="flex space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <div key={route.href} className="relative group">
            <Link
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                route.active ? "text-black" : "text-neutral-500"
              )}
            >
              {route.name}
              <ChevronDown
                className="ml-1 h-4 w-4 inline-block"
                aria-hidden="true"
              />
            </Link>

            {/* Dropdown Items */}
            <div className="absolute z-10 left-0 mt-2 w-56 opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity duration-300 ease-in-out">
              <div className="rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {route.dropdownItems.map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;
