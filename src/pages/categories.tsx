import { inferProcedureOutput } from "@trpc/server";
import { NextPage } from "next";
import AddNewCategory from "../components/AddNewCategory";
import AddNewSubCategory from "../components/AddNewSubCategory";
import Layout from "../components/Layout";
import { trpc } from "../utils/trpc";
import type { AppRouter } from "../backend/router";

const Categories: NextPage = () => {
  const { data: categories } = trpc.category.getAllWithSubCategories.useQuery();

  return (
    <Layout>
      <h1 className="text-4xl font-medium">Categories</h1>

      <AddNewCategory />
      <AddNewSubCategory />
      {categories && <AllCategories data={categories} />}
    </Layout>
  );
};

type AllCategoriesProps = {
  data: inferProcedureOutput<AppRouter["category"]["getAllWithSubCategories"]>;
};

const AllCategories = ({ data }: AllCategoriesProps) => {
  return (
    <div className="rounded-md border border-gray-800 p-4">
      {data.map((category) => (
        <>
          <div>{category.name}</div>
          {category.SubCategory.map((sub) => (
            <div className="ml-4">{sub.name}</div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Categories;
