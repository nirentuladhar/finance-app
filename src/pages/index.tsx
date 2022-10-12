import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "../backend/router";
import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { formatDate, toCurrency } from "../utils";
import Layout from "../components/Layout";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: balances } = trpc.balance.getAll.useQuery();

  return (
    <Layout>
      <h1 className="mb-4 text-4xl font-medium">Dashboard</h1>
      <div className="py-24">
        <AddBalance />
      </div>
      {balances && <Balances data={balances} />}
    </Layout>
  );
};

type BalancesProps = {
  data: inferProcedureOutput<AppRouter["balance"]["getAll"]>;
};

const Balances = ({ data }: BalancesProps) => {
  const columnHelper = createColumnHelper<any>();
  const table = useReactTable({
    data,
    columns: [
      columnHelper.accessor("date", {
        header: () => "Date",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor((row) => row.SubCategory.category.name, {
        id: "category",
        header: () => "Category",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.SubCategory.name, {
        id: "sub-category",
        header: () => "Sub Category",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        header: () => "Amount",
        cell: (info) => toCurrency(info.getValue()),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(data);

  return (
    <>
      <table className="mt-8 w-full table-auto border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-slate-800 p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-slate-900 p-4 pl-8 text-slate-300 "
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const AddBalance = () => {
  const { data: categories } = trpc.category.getAllWithSubCategories.useQuery();
  const { data: subcategories } = trpc.subCategory.getAll.useQuery();

  const [form, setForm] = useState({
    categoryId: "",
    subCategoryId: "",
  });

  if (!categories) return <></>;

  const handleCategoryClick = (category: any) => {
    setForm((prev) => ({ ...prev, categoryId: category.id }));
  };

  const handleSubCategoryClick = (sub: any) => {
    setForm((prev) => ({
      ...prev,
      categoryId: sub.categoryId,
      subCategoryId: sub.id,
    }));
  };

  const getSubCategories = () => {
    if (!subcategories) return [];
    return subcategories.filter((s) =>
      form.categoryId ? s.categoryId === form.categoryId : true
    );
  };

  return (
    <>
      <div className="mb-2 text-sm text-gray-500">Category</div>
      <div className="flex space-x-2 rounded-md">
        {categories.map((category) => (
          <Pill
            isActive={form.categoryId === category.id}
            onClick={() => handleCategoryClick(category)}
            onReset={() => setForm({ subCategoryId: "", categoryId: "" })}
          >
            {category.name}
          </Pill>
        ))}
      </div>
      <div>
        <h2 className="mt-4 mb-2 text-sm text-gray-500">Accounts</h2>
        <div className="flex space-x-2 rounded-md">
          {getSubCategories().map((sub) => (
            <Pill
              isActive={form.subCategoryId === sub.id}
              onClick={() => handleSubCategoryClick(sub)}
              onReset={() =>
                setForm((prev) => ({ ...prev, subCategoryId: "" }))
              }
            >
              {sub.name}
            </Pill>
          ))}
        </div>
      </div>
    </>
  );
};

type PillProps = {
  isActive: boolean;
  onClick: () => void;
  onReset: () => void;
  children: string;
};

const Pill = ({ isActive, onClick, onReset, children }: PillProps) => {
  const handleClick = () => {
    isActive ? onReset() : onClick();
  };
  return (
    <div
      className={`text-md w-fit cursor-pointer rounded-lg px-3 py-0.5  ${
        isActive ? "bg-blue-500 text-blue-50" : "bg-blue-100 text-blue-900"
      }`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Home;
