import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getFlavors from "@/actions/get-flavors";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
  searchParams: {
    sizeId?: string;
    flavorId?: string;
  };
}

const BillboardPage: React.FC<BillboardPageProps> = async ({ params, searchParams }) => {
  const billboard = await getBillboard(params.billboardId);  
  const products = await getProducts({ billboardId: params.billboardId, ...searchParams }); 

  const sizes = await getSizes();
  const flavors = await getFlavors();
  return (
    <div className="bg-white">
      <Container> 
      <div className="mt-20 mb-5  "> {/* Margen superior e inferior más amplio */}
      <Billboard data={billboard} />  {/* Usamos el billboard obtenido */}
    </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-24 ">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 mt-150">
            <MobileFilters sizes={sizes} flavors={flavors} />
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Presentaciones" data={sizes} />
              <Filter valueKey="flavorId" name="Variedades" data={flavors} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BillboardPage;
