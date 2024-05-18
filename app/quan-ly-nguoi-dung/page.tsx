// pages/user-table.tsx
import UserTable from "@/components/admin/table";
import { prisma } from "@/lib/db";

export default async function Page() {
  const users = await prisma.userInfo.findMany();

  const formattedUsers = users.map(user => ({
    ...user,
    dob: user.dob ? user.dob.toISOString() : null,
    id_issue_date: user.id_issue_date ? user.id_issue_date.toISOString() : null,
    id_expire_date: user.id_expire_date ? user.id_expire_date.toISOString() : null,
    current_job_start_date: user.current_job_start_date ? user.current_job_start_date.toISOString() : null,
    old_job_start_date: user.old_job_start_date ? user.old_job_start_date.toISOString() : null,
    old_job_end_date: user.old_job_end_date ? user.old_job_end_date.toISOString() : null,
    school_start_date: user.school_start_date ? user.school_start_date.toISOString() : null,
    school_end_date: user.school_end_date ? user.school_end_date.toISOString() : null,
    expected_start_date: user.expected_start_date ? user.expected_start_date.toISOString() : null,
    is_lived_in_visa_coutry_date: user.is_lived_in_visa_coutry_date ? user.is_lived_in_visa_coutry_date.toISOString() : null,
    party_join_date: user.party_join_date ? user.party_join_date.toISOString() : null,
  }));

  return (
    <div className="p-10 w-[1500px] max-w-[100%] justify-center" style={{ background: "#F0F0F0" }}>
      <div>
        <h1>Quản lý người dùng</h1>
        <UserTable users={formattedUsers} />
      </div>
    </div>
  );
}
