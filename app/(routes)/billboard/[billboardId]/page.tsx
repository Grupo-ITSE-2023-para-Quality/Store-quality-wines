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

// Ajuste de la interfaz para que sea compatible con el tipo de PageProps esperado.
interface BillboardPageProps {
  params: Promise<{ billboardId: string }>; // Ahora 'params' es un Promise.
  searchParams: {
    sizeId?: string;
    flavorId?: string;
  };
}

const BillboardPage = async ({
  params,
  searchParams,
}: BillboardPageProps) => {
  const { billboardId } = await params; // Resolviendo el Promise para obtener billboardId.
  const billboard = await getBillboard(billboardId);
  const products = await getProducts({
    billboardId,
    ...searchParams,
  });
  const sizes = await getSizes();
  const flavors = await getFlavors();

  return (
    <div className="bg-white">
      <Container>
        {/* Ajuste dinámico de márgenes */}
        <div className="mb-8 lg:mt-32">
          <Billboard data={billboard} />
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
            {/* Filtros móviles */}
            <MobileFilters sizes={sizes} flavors={flavors} />

            {/* Filtros de escritorio */}
            <div className="hidden lg:block space-y-6">
              <Filter valueKey="sizeId" name="Presentaciones" data={sizes} />
              <Filter valueKey="flavorId" name="Variedades" data={flavors} />
            </div>

            {/* Listado de productos */}
            <div className="lg:col-span-4">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
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
