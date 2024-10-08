"use client";

import { useState } from "react";
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

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface ProductSearchProps extends PopoverTriggerProps {
  items: Product[];
  className?: string;
}

export default function ProductSearch({
  className,
  items = [],
}: ProductSearchProps) {
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
    images: item.images,
  }));

  const displayedItems = formattedItems.slice(0, 2);

  const currentProduct = formattedItems.find(
    (item) => item.value === params.productId
  );

  const [open, setOpen] = useState(false);

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
            "w-[200px] justify-center items-center flex space-x-2",
            className
          )}
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
          <p>Buscar</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white">
          <CommandList>
            <CommandInput placeholder="Busque producto..." />
            <CommandEmpty>No encontrado</CommandEmpty>
            <CommandGroup>
              {displayedItems.map((product) => (
                <CommandItem
                  key={product.value}
                  onSelect={() => onProductSelect(product)}
                  className="text-sm"
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
                      "ml-auto h-4 w-4",
                      currentProduct?.value === product.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup></CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}