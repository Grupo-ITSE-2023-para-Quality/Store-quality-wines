import Image from "next/image";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

import { Image as ImageType } from "@/types";

interface GalleryTabProps {
  image: ImageType;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full inset-0 overflow-hidden rounded-md">
            {image?.url ? (
              <Image
                src={image.url}
                alt=""
                layout="fill"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200">
                {/* Imagen por defecto o placeholder */}
                <span>No image</span>
              </div>
            )}
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
