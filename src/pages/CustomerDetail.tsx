import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Customer } from "./types";
import axios from "axios";


export default function CustomerDetail(customer: Customer) {
  const deleteCustomer = async (customerId: number): Promise<Customer> => {
    const res = await axios.delete<Customer>(
      `http://localhost:3100/customers/${customerId}`
    );
    return res.data; // Return the deleted customer data
  };

  const mutation = useMutation({
    mutationKey: [`delete-customer`],
    mutationFn: (customerId) => deleteCustomer(customerId),
  });

  const handleDelete = () => {
    console.log("deleting customer", customer.id);
    mutation.mutate(customer.id);
  };

  const handleEdit = () => {
    console.log("editing customer", customer.id);
  };

  return (
    <div key={customer.id} className="bg-gray-200 p-4 rounded-md">
      <div className="text-md mb-2">{customer?.name}</div>
      <div className="text-gray-600">{customer?.email}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mt-4"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white px-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete
      </button>
      <div className="text-center text-xs py-2">
        {mutation.isPending && <span>Deleting...</span>}
        {mutation.isSuccess && <span>Deleted!</span>}
        {mutation.isError && <span>Oops! An error has occurred!</span>}
      </div>
    </div>
  );
}
