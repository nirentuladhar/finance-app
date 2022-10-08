import { inferProcedureOutput } from "@trpc/server";
import { NextPage } from "next";
import AddNewCategory from "../components/AddNewCategory";
import AddNewSubCategory from "../components/AddNewSubCategory";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import type { AppRouter } from "../backend/router";
import { useState } from "react";

const Categories: NextPage = () => {
  const { data: categories } = trpc.category.getAllWithSubCategories.useQuery();

  return (
    <Layout>
      <h1 className="text-4xl font-medium">Categories</h1>

      <div className="flex justify-between pb-4 pt-10">
        <h2 className="text-2xl font-medium">Manage accounts</h2>
        <div className="flex justify-end space-x-2">
          <AddNewCategory />
          <AddNewSubCategory />
        </div>
      </div>
      {categories && <AllCategories data={categories} />}
    </Layout>
  );
};

type AllCategoriesProps = {
  data: inferProcedureOutput<AppRouter["category"]["getAllWithSubCategories"]>;
};

const AllCategories = ({ data }: AllCategoriesProps) => {
  const [selected, setSelected] = useState("");
  return (
    <>
      <ul>
        {data.map((cat) => (
          <>
            <li className="flex justify-between py-1 text-sm">
              <span>{cat.name}</span>
              <span>Edit</span>
            </li>
            <ul className="pl-4 text-sm">
              {cat.SubCategory.map((sub) => (
                <li className="flex justify-between">
                  <span>{sub.name}</span>
                  <span>Edit</span>
                </li>
              ))}
            </ul>
          </>
        ))}
      </ul>
      {/* <div className="flex space-x-2 rounded-md">
        {data.map((category) => (
          <>
            <div
              className={`text-md w-fit cursor-pointer rounded-lg  border px-3 py-0.5  ${
                selected === category.id
                  ? "bg-blue-500 text-blue-50"
                  : "bg-blue-100 text-blue-900"
              }`}
              onClick={() => setSelected(category.id)}
            >
              {category.name}
            </div>
          </>
        ))}
      </div>
      <div>
        <h2 className="mt-8 text-2xl">Accounts</h2>
        {data
          .filter((d) => d.id === selected)
          .map((cat) => (
            <div>
              {cat.SubCategory.map((sub) => (
                <div>{sub.name}</div>
              ))}
            </div>
          ))}
      </div> */}
    </>
  );
};

export default Categories;
