"use client";

import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { Image as ImageType } from "@/types";
import GalleryTab from "@/components/gallery/gallery-tab";
import React, { useState } from "react";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageLoadError(true);
  };

  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hiddn w-full max-w-2x1 sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {(images || []).map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full">
        {(images || []).map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              {!imageLoadError ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={image.url}
                  alt="Product Image"
                  onError={handleImageError}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-200">
                  <Image
                    src="/images/vistaPrevia.jpg"
                    alt="Backup Image"
                    className="object-cover object-center"
                  />
                </div>
              )}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
