import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list"

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true});
  const billboard = await getBillboard("4cfd6a8f-5af9-428a-aa9c-37b2bcf0dbc0")
  const billboard2 = await getBillboard("6ff8a50e-ba77-48c1-b8d9-e9cb42328f84")
  const billboard3 = await getBillboard("eb5fc327-827c-4fc7-a74b-55b8948e9722");

  return (
    <Container>
      <div className="space-y-3 pb-10">
        <Billboard data={billboard} />
        <Billboard data={billboard2} />
        <Billboard data={billboard3} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title ="Productos destacados" items={products} />
        </div>
      </div>
    </Container>
    
  );

  
}

export default HomePage;
