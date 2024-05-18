// pages/user-table.tsx
import { prisma } from "@/lib/db";
import UserTable from "@/components/admin/table";

export default async function Page() {
  const users = await prisma.userInfo.findMany();

  return (
    <div className="p-10 w-[1500px] max-w-[100%] justify-center" style={{ background: "#F0F0F0" }}>
      <div>
        <h1>Quản lý người dùng</h1>
        <UserTable users={users} />
      </div>
    </div>
  );
}