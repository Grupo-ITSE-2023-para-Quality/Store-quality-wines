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
  const billboard = await getBillboard("32549e54-9817-4dbc-bd09-4609dc470b4e");
  const billboard2 = await getBillboard("0478476d-1171-41a6-8f5b-bce6efdbbef6");
  const billboard3 = await getBillboard("835436e3-c3e8-4454-b9f0-79527c668c77");

  return (
    <Container>
      <VideoOverlay />
      <div className="space-y-3 pb-10 mb-100">
        <Billboard data={billboard} />
        <Billboard data={billboard2} />
        <Billboard data={billboard3} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Productos destacados" items={products} />
          <IframeMap />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
