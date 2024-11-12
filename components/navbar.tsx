import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getBillboards from "@/actions/get-billboards";
import getCategories from "@/actions/get-categories";

import logo from "@/app/wine.png";

const Navbar = async () => {
  const billboard = await getBillboards();
  const categories = await getCategories();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex flex-wrap items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image
              src={logo}
              alt="Quality Wines Logo"
              width={75}
              height={75}
              className="object-contain"
            />
          </Link>
          <MainNav data={billboard} products={[]} categories={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
