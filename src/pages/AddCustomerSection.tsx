import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Customer } from "./types";

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
          aria-label="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Email"
          aria-label="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, email: e.target.value })
          }
        />
        <button
          onClick={handleAddCustomer}
          className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-2 rounded"
        >
          Add
        </button>
      </div>
    </section>
  );
}
