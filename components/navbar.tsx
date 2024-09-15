import Link from "next/link";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import getBillboards from "@/actions/get-billboards";

const Navbar = async () => {
  const billboard = await getBillboards();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex flex-wrap items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Quality</p>
          </Link>
          <MainNav data={billboard} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
