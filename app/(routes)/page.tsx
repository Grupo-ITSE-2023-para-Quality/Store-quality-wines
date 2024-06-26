import Link from 'next/link'; // Importar el componente Link
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import IframeMap from "@/components/iframe-map";
import VideoOverlay from "@/components/video-overlay";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("86098839-91f9-40fb-a6aa-ebad5b196947");
  const billboard2 = await getBillboard("0f57c0c5-554f-448d-91c4-614bdb2b8c6f");
  const billboard3 = await getBillboard("fae0f63a-d675-477f-a192-01c04e18911c");

  return (
    <Container>
      <VideoOverlay />
      <div className="space-y-3 pb-10 mb-100">
        <Link href="/delicatessen" passHref>
          <div>
            <Billboard data={billboard2} />
          </div>
        </Link>
        <Link href="/bebidas" passHref>
          <div>
            <Billboard data={billboard} />
          </div>
        </Link>
        <Link href="/regaleria-y-accesorios" passHref>
          <div>
            <Billboard data={billboard3} />
          </div>
        </Link>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Productos destacados" items={products} />
          <IframeMap />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
