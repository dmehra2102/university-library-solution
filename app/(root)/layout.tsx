import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { users } from "@/database/schema";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");

  after(async () => {
    const userId = session?.user?.id;
    if (!userId) return;

    const today = new Date().toISOString().slice(0, 10);

    // get the user and see if the last activity date is today
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user?.lastActivityDate === today) return;

    await db
      .update(users)
      .set({ lastActivityDate: today })
      .where(eq(users.id, userId));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
