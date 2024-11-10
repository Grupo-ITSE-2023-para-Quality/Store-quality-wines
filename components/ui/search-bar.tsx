"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { Product } from "@/types";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import getProducts from "@/actions/get-products";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface ProductSearchProps extends PopoverTriggerProps {
  className?: string;
}

export default function ProductSearch({ className }: ProductSearchProps) {
  const params = useParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts({});
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const formattedItems = products
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((item) => ({
      label: item.name,
      value: item.id,
      images: item.images,
    }));

  const currentProduct = formattedItems.find(
    (item) => item.value === params.productId
  );

  const onProductSelect = (product: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/product/${product.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Search product"
          className={cn(
            "w-[400px] justify-center items-center flex space-x-2 text-neutral-500 border-neutral-500",
            className
          )}
        >
          <MagnifyingGlassIcon className="h-4 w-4 text-neutral-500" />
          <p className="text-neutral-500">Buscar</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-white">
        <Command className="bg-white">
          <CommandList>
            <CommandInput
              placeholder="Ingrese producto..."
              className="text-neutral-500"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandEmpty>No encontrado</CommandEmpty>
            <CommandGroup>
              {formattedItems.map((product) => (
                <CommandItem
                  key={product.value}
                  onSelect={() => onProductSelect(product)}
                  className="text-sm text-neutral-500"
                >
                  <Image
                    src={product?.images?.[0]?.url}
                    alt="Product image"
                    width={50}
                    height={50}
                    className="mr-2"
                  />
                  {product.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-neutral-500",
                      currentProduct?.value === product.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}