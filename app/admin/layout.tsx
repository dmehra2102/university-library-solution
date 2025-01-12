import "@/styles/admin.css";
import { auth } from "@/auth";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) return redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
