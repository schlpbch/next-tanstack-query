import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Customer } from "./types";
import axios from "axios";

export default function CustomerDetail(customer: Customer) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer>(customer);

  const deleteCustomer = async (customerId: number): Promise<Customer> => {
    const res = await axios.delete<Customer>(
      `http://localhost:3100/customers/${customerId}`
    );
    return res.data; // Return the deleted customer data
  };

  const updateCustomer = async (customer: Customer): Promise<Customer> => {
    const res = await axios.put<Customer>(
      `http://localhost:3100/customers/${customer.id}`,
      customer
    );
    return res.data; // Return the updated customer data
  };

  const deleteMutation = useMutation({
    mutationKey: [`delete-customer`],
    mutationFn: (customerId) => deleteCustomer(customerId),
  });

  const updateMutation = useMutation({
    mutationKey: [`update-customer`],
    mutationFn: (customer) => updateCustomer(customer),
    onSuccess: () => setIsEditing(false),
  });

  const handleDelete = () => {
    console.log("deleting customer", customer.id);
    deleteMutation.mutate(customer.id);
  };

  const handleEdit = () => {
    console.log("editing customer", customer.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    //setIsEditing(false);
    console.log("saving edited customer", editedCustomer);
    updateMutation.mutate(editedCustomer);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the editedCustomer data to the original customer data
    setEditedCustomer(customer);
  };

  return (
    <div key={customer.id} className="bg-gray-200 p-4 rounded-md">
      {isEditing ? (
        <>
          <div className="space-y-1">
            <input
              type="text"
              value={editedCustomer.name}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editedCustomer.email}
              onChange={(e) =>
                setEditedCustomer({ ...editedCustomer, email: e.target.value })
              }
            />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-2 rounded mt-4"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white px-2 rounded mt-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <div className="text-center text-xs py-2">
            {updateMutation.isPending && <span>Updating...</span>}
            {updateMutation.isSuccess && <span>Updated!</span>}
            {updateMutation.isError && (
              <span>Oops! An error has occurred!</span>
            )}
          </div>
        </>
      ) : (
        <>
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
            {deleteMutation.isPending && <span>Deleting...</span>}
            {deleteMutation.isSuccess && <span>Deleted!</span>}
            {deleteMutation.isError && (
              <span>Oops! An error has occurred!</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
