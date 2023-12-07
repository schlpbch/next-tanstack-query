import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Customer } from "./types";
import CustomerDetail from "./CustomerDetail";

const fetchCustomers = async (): Promise<Customer[]> => {
  const res = await axios.get<Customer[]>(`http://localhost:3100/customers/`);
  return res.data; // Return the customers data
};

export default function CustomersSection() {
  const {
    isLoading,
    error,
    data: customers,
  } = useQuery({
    queryKey: [`fetch-customers`],
    queryFn: () => fetchCustomers(),
  });

  return (
    <section>
      <h1 className="text-center text-xl font-bold py-4">Customer Data</h1>

      {isLoading && <h2>Loading...</h2>}

      {error && <h2>Oops! An error has occurred!</h2>}

      <div className="grid grid-cols-3 gap-4">
        {customers?.map((customer) => (
          <CustomerDetail key={customer.id} {...customer} />
        ))}
      </div>
    </section>
  );
}
