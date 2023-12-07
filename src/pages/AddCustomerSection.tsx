import React, { useState } from "react";
import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Customer } from "./types";

const queryClient = new QueryClient();

const addCustomer = async (customer: Customer): Promise<Customer> => {
  const res = await axios.post<Customer>(
    `http://localhost:3100/customers/`,
    customer
  );
  return res.data; // Return the added customer data
};

export default function AddCustomerSection() {
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: 0,
    name: "",
    email: "",
  });

  const mutation = useMutation({
    mutationKey: [`add-customer`],
    mutationFn: () => addCustomer(newCustomer),
    onSuccess: (customer: Customer) => {
      console.log(customer);
      setNewCustomer({
        id: 0,
        name: "",
        email: "",
      });
      queryClient.invalidateQueries({ queryKey: [`fetch-customers`] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleAddCustomer = async () => {
    mutation.mutate();
  };

  return (
    <section>
      <h2 className="text-center text-lg font-bold py-6">Add Customer</h2>

      <div className="flex items-stretch justify-center">
        <input
          type="text"
          placeholder="Name"
          name="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          name="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, email: e.target.value })
          }
        />
        <button
          onClick={handleAddCustomer}
          className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="text-center text-sm py-2">
        {mutation.isPending && <h2>Adding...</h2>}
        {mutation.isSuccess && <h2>Added!</h2>}
        {mutation.isError && <h2>Oops! An error has occurred!</h2>}
      </div>
    </section>
  );
}
