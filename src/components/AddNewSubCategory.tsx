import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, FormEventHandler } from "react";
import { trpc } from "../utils/trpc";

const AddNewSubCategory = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ categoryId: "", name: "" });

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const utils = trpc.useContext();
  const { data: categories } = trpc.category.getAll.useQuery();

  const create = trpc.subCategory.create.useMutation({
    onSuccess() {
      utils.category.getAllWithSubCategories.invalidate();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    create.mutate({ categoryId: form.categoryId, name: form.name });
    closeModal();
  };

  return (
    <>
      <div className=" inset-0 mb-8 flex items-center justify-end">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Add new sub-category
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900 bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new account
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="categoryId"
                        className="mt-2 text-sm text-gray-500"
                      >
                        Category
                      </label>
                      <select
                        id="categoryId"
                        className="mt-0.5 w-full rounded-md border bg-white py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        onChange={handleChange}
                      >
                        {categories?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="mt-2 text-sm text-gray-500"
                      >
                        Account name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="mt-0.5 w-full rounded-md border py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Eg: Savings"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                        // onClick={closeModal}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddNewSubCategory;
