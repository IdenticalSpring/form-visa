"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react"; 

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
    is_id_had_been_lost: boolean | null;
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
  const [score, setScore] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendToChatGPT = async () => {
    setLoading(true);
    setError(null);
    setScore(null);

    try {
      const response = await fetch("/api/validateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        setScore(result.score);
      } else {
        setError(result.error || "Something went wrong");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const personalInfo = [
    { label: "Tên", value: user.name },
    { label: "Tên khác", value: user.name_alias },
    { label: "Số điện thoại", value: user.phone_number },
    { label: "Email", value: user.email },
    { label: "Giới tính", value: user.gender },
    { label: "Ngày sinh", value: user.dob },
    { label: "Nơi sinh", value: user.pob },
    { label: "Địa chỉ trên giấy tờ", value: user.address_on_paper },
    { label: "Quốc gia", value: user.country },
    { label: "Địa chỉ hiện tại", value: user.current_address },
    { label: "Nơi sinh của vợ/chồng", value: user.husband_wife_pob },
    { label: "Quốc tịch", value: user.nationality },
    { label: "Có con", value: user.is_has_kid },
    { label: "Tình trạng hôn nhân", value: user.marital_status },
    { label: "Quốc tịch khác", value: user.other_nationality },
  ];

  const visaInfo = [
    { label: "Thành phố cấp visa", value: user.id_city_receive },
    { label: "Quốc gia cấp visa", value: user.id_country_receive },
    { label: "Ngày cấp", value: user.id_issue_date },
    { label: "Ngày hết hạn", value: user.id_expire_date },
    { label: "Đã có từng mất visa chưa", value: user.is_id_had_been_lost },
    { label: "Lý do mất visa chưa", value: user.id_lost_reason },
  ];

  const currentJobInfo = [
    { label: "Số điện thoại công ty hiện tại", value: user.current_company_phone_number },
    { label: "Công việc hiện tại", value: user.current_job },
    { label: "Địa chỉ công việc hiện tại", value: user.current_job_address },
    { label: "Chi tiết công việc hiện tại", value: user.current_job_detail },
    { label: "Lương công việc hiện tại", value: user.current_job_salary },
    { label: "Ngày bắt đầu công việc hiện tại", value: user.current_job_start_date },
    { label: "Chức danh công việc hiện tại", value: user.current_job_title },
  ];

  const prevJobInfo = [
    { label: "Công việc cũ", value: user.old_job },
    { label: "Ngày kết thúc công việc cũ", value: user.old_job_end_date },
    { label: "Ngày bắt đầu công việc cũ", value: user.old_job_start_date },
    { label: "Chức danh công việc cũ", value: user.old_job_title },
  ];

  const studyInfo = [
    { label: "Trình độ học vấn", value: user.education_level },
    { label: "Chuyên ngành", value: user.major },
    { label: "Ngày bắt đầu học", value: user.school_start_date },
    { label: "Ngày kết thúc học", value: user.school_end_date },
    { label: "Tên trường", value: user.school_name },
  ];

  const familyInfo = [
    { label: "Cha mẹ sống ở quốc gia thăm viếng", value: user.is_parent_live_in_visiting_country },
    { label: "Người thân sống ở quốc gia thăm viếng", value: user.is_relatives_living_in_visiting_country },
    { label: "Mối quan hệ với người thân", value: user.relationship_with_relatives },
    { label: "Thông tin người thân sống ở quốc gia thăm viếng", value: user.relatives_info_living_in_visiting_country },
    { label: "Tình trạng cư trú của người thân", value: user.relatives_stay_status },
    { label: "Tình trạng cư trú", value: user.stay_status },
  ];

  const travelInfo = [
    { label: "Ngày dự kiến bắt đầu", value: user.expected_start_date },
    { label: "Người đi cùng", value: user.accompanying_person },
    { label: "Các quốc gia đã từng đến", value: user.traveled_countries },
    { label: "Ngôn ngữ", value: user.foreign_languages },
    { label: "Mục đích chuyến đi", value: user.trip_purpose },
    { label: "Người trả chi phí cho chuyến đi", value: user.trip_payroll_person },
    { label: "Loại visa đã có", value: user.visa_type_owned },
    { label: "Từng sống ở quốc gia xin visa", value: user.is_lived_in_visa_coutry },
    { label: "Ngày sống tại quốc gia xin visa", value: user.is_lived_in_visa_coutry_date },
    { label: "Số ngày ở quốc gia xin visa", value: user.is_lived_in_visa_coutry_days_stay },
    { label: "Từng bị từ chối visa", value: user.is_denied_visa },
    { label: "Lý do bị từ chối visa", value: user.denied_visa_reason },
    { label: "Số lần bị từ chối visa", value: user.denied_visa_number_of_time },
    { label: "Có visa quốc gia không sử dụng", value: user.is_had_visa_country_not_used },
    { label: "Quốc gia không sử dụng visa", value: user.visa_country_not_used },
    { label: "Tài liệu bảo lãnh", value: user.guarantee_documents },
    { label: "Mạng xã hội", value: user.social_network },
    { label: "Thành viên của bộ tộc hoặc đảng phái", value: user.is_belong_to_some_tribe_or_party },
    { label: "Ngày gia nhập đảng phái", value: user.party_join_date },
    { label: "Làm việc cho tổ chức từ thiện", value: user.is_work_for_some_charity_organization },
    { label: "Được đào tạo sử dụng vũ khí", value: user.is_weapons_trained },
    { label: "Làm việc trong quân đội", value: user.is_worked_on_army },
    { label: "Có bệnh", value: user.is_has_some_sick },
    { label: "Từng bị bắt vì tội phạm", value: user.is_had_been_arrested_by_crime },
    { label: "Từ bỏ quốc tịch", value: user.is_renounce_citizenship },
  ];

  const renderSection = (title: string, data: { label: string; value: any }[]) => (
    <div className="mb-4">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">{title}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map(info => (
          <p key={info.label}>
            <strong>{info.label}:</strong> {info.value !== null ? info.value : 'N/A'}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="m-auto w-[80vw] text-left fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="relative bg-white w-full p-6 rounded-lg overflow-y-auto max-h-screen">
      <button onClick={onClose} className="absolute top-2 right-2">
          <X className="h-6 w-6 text-gray-700" />
        </button>
        <h2 className="text-xl font-bold mb-4">Chi tiết người dùng</h2>
        {renderSection("Thông tin cá nhân", personalInfo)}
        {renderSection("Thông tin visa", visaInfo)}
        {renderSection("Công việc hiện tại", currentJobInfo)}
        {renderSection("Công việc trước đây", prevJobInfo)}
        {renderSection("Thông tin học vấn", studyInfo)}
        {renderSection("Thông tin gia đình", familyInfo)}
        {renderSection("Thông tin du lịch", travelInfo)}
        <div className="mt-4">
          <Button onClick={sendToChatGPT} disabled={loading}>
            {loading ? 'Đang gửi...' : 'Gửi để kiểm tra'}
          </Button>
          {score && (
            <p className="mt-4">
              <strong>Kết quả kiểm tra:</strong> {score}
            </p>
          )}
          {error && (
            <p className="mt-4 text-red-500">
              <strong>Lỗi:</strong> {error}
            </p>
          )}
          <Button onClick={onClose} className="ml-4">Đóng</Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
