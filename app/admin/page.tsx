// pages/user-table.tsx
import UserTable from "@/components/admin/table";
import { prisma } from "@/lib/db";

export default async function Page() {
  const users = await prisma.userInfo.findMany({
    orderBy: { created_at: "desc" },
    where: {
      is_done_filling: true,
    },
  });

  const formattedUsers = users.map((user) => ({
    ...user,
    dob: user.dob,
    is_id_had_been_lost: !!user.id_lost_reason,
  }));

  return (
    <div className="p-10 w-screen h-screen max-w-[100%] justify-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-700 mb-10">
          Quản lý người dùng
        </h1>
        <UserTable users={formattedUsers} />
      </div>
    </div>
  );
}
