import Link from "next/link";
import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import IframeMap from "@/components/iframe-map";
import VideoOverlay from "@/components/video-overlay";
import Legales from "@/components/legales";

export const revalidate = 0;

const HomePage = async () => {
  // Hacemos las llamadas de datos en paralelo
  const [products, billboard, billboard2, billboard3] = await Promise.all([
    getProducts({ isFeatured: true }),
    getBillboard("86098839-91f9-40fb-a6aa-ebad5b196947"),
    getBillboard("0f57c0c5-554f-448d-91c4-614bdb2b8c6f"),
    getBillboard("fae0f63a-d675-477f-a192-01c04e18911c"),
  ]);

  const productSectionStyle: React.CSSProperties = {
    marginTop: "50px", // Espacio entre las secciones de imágenes y los productos destacados
  };

  const billboardHeight = "500px"; // Ajustar la altura de los billboards aquí

  return (
    <Container>
      <VideoOverlay />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Uso de la prop 'height' para controlar la altura */}
        <Link href="/bebidas" passHref>
          <Billboard data={billboard} height={billboardHeight} />
        </Link>
        <Link href="/delicatessen" passHref>
          <Billboard data={billboard2} height={billboardHeight} />
        </Link>
        <Link href="/regaleria-y-accesorios" passHref>
          <Billboard data={billboard3} height={billboardHeight} />
        </Link>
      </div>
      <div
        style={productSectionStyle}
        className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
      >
        <ProductList title="Productos destacados" items={products} />
        <IframeMap />
      </div>
      <Legales />
    </Container>
  );
};

export default HomePage;
