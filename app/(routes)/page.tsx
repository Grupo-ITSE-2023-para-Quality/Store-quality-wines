import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list"

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true});
  const billboard = await getBillboard("e870ce82-8ac9-4a2d-a114-91d2520dedfb")
  const billboard2 = await getBillboard("391b0a80-4d45-4c40-b676-f0b47cdd5091")
  const billboard3 = await getBillboard("60ae115a-d320-4dd5-886c-f27e6cd589e8");

  return (
    <Container>
      <div className="space-y-3 pb-10">
        <Billboard data={billboard} />
        <Billboard data={billboard2} />
        <Billboard data={billboard3} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title ="Featured Products" items={products} />
        </div>
      </div>
    </Container>
    
  );

  
}

export default HomePage;
