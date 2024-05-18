"use client";

import { Button } from "../ui/button";

interface UserDetailModalProps {
  user: {
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
  };
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <div className="space-y-2">
          {Object.entries(user).map(([key, value]) => (
            <p key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {value !== null ? value.toString() : 'N/A'}</p>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
