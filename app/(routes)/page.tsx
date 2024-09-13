import Link from "next/link";
import getBillboards from "@/actions/get-billboards"; 
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
  const [products, billboards] = await Promise.all([
    getProducts({ isFeatured: true }),
    getBillboards(),  
  ]);

  const productSectionStyle: React.CSSProperties = {
    marginTop: "50px", 
  };

  const billboardHeight = "500px"; 

  return (
    <Container>
      <VideoOverlay />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Renderizamos los billboards obtenidos dinámicamente */}
        {billboards.slice(0, 3).map((billboard) => (
          <Link key={billboard.id} href={`/${billboard.label}`} passHref>
            <Billboard data={billboard} height={billboardHeight} />
          </Link>
        ))}
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
