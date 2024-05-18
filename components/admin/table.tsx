"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import UserDetailModal from "./user-detail";

interface UserInfo {
  id: string;
  name: string | null;
  phone_number: string | null;
  email: string | null;
  visa_to_country: string | null;
  name_alias: string | null;
  gender: string | null;
  dob: string | null;
  pob: string | null;
  marital_status: string | null;
  husband_wife_pob: string | null;
  is_has_kid: boolean | null;
  country: string | null;
  nationality: string | null;
  other_nationality: string | null;
  address_on_paper: string | null;
  current_address: string | null;
  id_issue_date: string | null;
  id_expire_date: string | null;
  id_country_receive: string | null;
  id_city_receive: string | null;
  id_lost_reason: string | null;
  current_job: string | null;
  current_job_address: string | null;
  current_job_start_date: string | null;
  current_company_phone_number: string | null;
  current_job_title: string | null;
  current_job_salary: number | null;
  current_job_detail: string | null;
  old_job: string | null;
  old_job_title: string | null;
  old_job_start_date: string | null;
  old_job_end_date: string | null;
  education_level: string | null;
  school_name: string | null;
  major: string | null;
  school_start_date: string | null;
  school_end_date: string | null;
  is_parent_live_in_visiting_country: boolean | null;
  stay_status: string | null;
  is_relatives_living_in_visiting_country: boolean | null;
  relatives_info_living_in_visiting_country: string | null;
  relationship_with_relatives: string | null;
  relatives_stay_status: string | null;
  expected_start_date: string | null;
  accompanying_person: string | null;
  traveled_countries: string | null;
  foreign_languages: string | null;
  trip_purpose: string | null;
  trip_payroll_person: string | null;
  visa_type_owned: string | null;
  is_lived_in_visa_coutry: boolean | null;
  is_lived_in_visa_coutry_date: string | null;
  is_lived_in_visa_coutry_days_stay: number | null;
  is_denied_visa: boolean | null;
  denied_visa_reason: string | null;
  denied_visa_number_of_time: number | null;
  is_had_visa_country_not_used: boolean | null;
  visa_country_not_used: string | null;
  guarantee_documents: string | null;
  social_network: string | null;
  is_belong_to_some_tribe_or_party: boolean | null;
  party_join_date: string | null;
  is_work_for_some_charity_organization: boolean | null;
  is_weapons_trained: boolean | null;
  is_worked_on_army: boolean | null;
  is_has_some_sick: boolean | null;
  is_had_been_arrested_by_crime: boolean | null;
  is_renounce_citizenship: boolean | null;
  is_done_filling: boolean | null;
}

interface UserTableProps {
  users: UserInfo[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (user: UserInfo) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
    return (
      (user.name?.toLowerCase().includes(searchName.toLowerCase()) ?? false) &&
      (user.phone_number?.includes(searchPhone) ?? false) &&
      (user.email?.toLowerCase().includes(searchEmail.toLowerCase()) ?? false)
    );
  });

  return (
    <div className="wrapper">
      <div className="header flex justify-between">
        <div className="header-left w-80">
          <input
            style={{ width: '100%' }}
            placeholder="Search Name"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
        </div>
        <div className="header-right w-80">
          <input
            style={{ width: '100%' }}
            placeholder="Search Phone"
            value={searchPhone}
            onChange={e => setSearchPhone(e.target.value)}
          />
        </div>
        <div className="header-right w-80">
          <input
            style={{ width: '100%' }}
            placeholder="Search Email"
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="body-content mt-6 overflow-x-auto" style={{ background: "#FFFFFF" }}>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.phone_number}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <Button onClick={() => handleViewDetails(user)}>View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserTable;
