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

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    sizeId?: string;
    flavorId?: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const category = await getCategory(params.categoryId); // Obtener la categoría
  const products = await getProducts({
    categoryId: params.categoryId, // Filtrar por categoría
    sizeId: searchParams.sizeId,
    flavorId: searchParams.flavorId,
    billboardId: category.billboardId, // Pasar billboardId
  });

  const sizes = await getSizes();
  const flavors = await getFlavors();

  return (
    <div className="bg-white">
      <Container>
        {/* Margen superior ajustado */}
        <div className="mt-40 mb-8">
          <Billboard data={category.billboard} />{" "}
          {/* Mostrar el billboard asociado a la categoría */}
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6 mt-12">
            {/* Filtros para móviles */}
            <MobileFilters sizes={sizes} flavors={flavors} />

            {/* Filtros para escritorio */}
            <div className="hidden lg:block space-y-6">
              <Filter valueKey="sizeId" name="Presentaciones" data={sizes} />
              <Filter valueKey="flavorId" name="Variedades" data={flavors} />
            </div>

            {/* Contenedor de productos */}
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
