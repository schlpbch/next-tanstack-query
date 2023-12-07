import { useQuery } from "@tanstack/react-query";
import AddCustomerSection from "./AddCustomerSection";
import CustomersSection from "./CustomersSection";

export default function Home() {
  return (
    <main>
      <CustomersSection />
      <AddCustomerSection />
    </main>
  );
}
