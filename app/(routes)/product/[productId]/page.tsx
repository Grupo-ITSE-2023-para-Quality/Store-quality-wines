import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params, searchParams }) => {
  const { productId } = await params;
  
  const product = await getProduct(productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
    billboardId: product?.category?.billboardId,
  });

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="lg:grid lg: grid-cols-2 lg:items-start lg:gap-x-8 mt-14">
            <Gallery images={product.images} />
            <div className="px-4 sm:mt-1 sm:px-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList
            title="Productos relacionados"
            items={suggestedProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;