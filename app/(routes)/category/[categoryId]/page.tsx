import getCategory from "@/actions/get-category";
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
interface CategoryPageProps {
  params: Promise<{ categoryId: string }>; // Cambiar a Promise
  searchParams: Promise<{
    sizeId?: string;
    flavorId?: string;
  }>; // Cambiar a Promise
}

const CategoryPage = async ({
  params,
  searchParams,
}: CategoryPageProps) => {
  const { categoryId } = await params; // Resolviendo el Promise para obtener categoryId
  const searchParamsResolved = await searchParams; // Resuelve el Promise

  const category = await getCategory(categoryId); // Obtener la categoría
  const products = await getProducts({
    categoryId: categoryId, // Filtrar por categoría
    sizeId: searchParamsResolved.sizeId,
    flavorId: searchParamsResolved.flavorId,
    billboardId: category.billboardId, // Pasar billboardId
  });

  const sizes = await getSizes();
  const flavors = await getFlavors();

  return (
    <div className="bg-white">
      <Container>
        <div className="mb-8 lg:mt-32"> 
          <Billboard data={category.billboard} />{" "}
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6 mt-12">
            <MobileFilters sizes={sizes} flavors={flavors} />
            <div className="hidden lg:block space-y-6">
              <Filter valueKey="sizeId" name="Presentaciones" data={sizes} />
              <Filter valueKey="flavorId" name="Variedades" data={flavors} />
            </div>
            <div className="lg:col-span-4">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
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

export default CategoryPage;