import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Customer } from "./types";
import axios from "axios";

export default function CustomerDetail(customer: Customer) {
  const deleteCustomer = async (customerId: string): Promise<Customer> => {
    const res = await axios.delete<Customer>(
      `http://localhost:3100/customers/${customerId}`
    );
    return res.data; // Return the deleted customer data
  };

  const deleteCustomerMutation = useMutation({
    mutationKey: [`delete-customer`],
    mutationFn: () => deleteCustomer(customerId),
  });

  const handleDelete = () => {
    console.log(customer.id);
    deleteCustomerMutation.mutate(customer.id);
  };

  return (
    <div key={customer.id} className="bg-gray-200 p-4 rounded-md">
      <div className="text-md mb-2">{customer?.name}</div>
      <div className="text-gray-600">{customer?.email}</div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mt-4">
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
