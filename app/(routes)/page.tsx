import getBillboard from "@/actions/get-billboard";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("fa94d98e-ac15-4b82-bbd2-bccb2c4d1ef1");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
};

export default HomePage;
