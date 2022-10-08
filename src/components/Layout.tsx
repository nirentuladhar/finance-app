import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-8xl mx-auto w-full">
      <div className="min-h-screen lg:flex">
        <Sidebar />
        <main className="w-full min-w-0 flex-auto lg:static lg:max-h-full lg:overflow-visible">
          <div className="pb:12 min-w-0 max-w-4xl flex-auto pt-6 lg:px-8 lg:pt-8 lg:pb-16 xl:pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
