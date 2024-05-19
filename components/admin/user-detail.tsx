"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { UserInfo } from "@prisma/client";
import { isValidDateTimeString } from "@/lib/utils";
import { format } from "date-fns";

interface UserDetailModalProps {
  user: UserInfo;
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
    { label: "Đã có từng mất visa chưa", value: !!user.id_lost_reason },
    { label: "Lý do mất visa chưa", value: user.id_lost_reason },
  ];

  const currentJobInfo = [
    {
      label: "Số điện thoại công ty hiện tại",
      value: user.current_company_phone_number,
    },
    { label: "Công việc hiện tại", value: user.current_job },
    { label: "Địa chỉ công việc hiện tại", value: user.current_job_address },
    { label: "Chi tiết công việc hiện tại", value: user.current_job_detail },
    { label: "Lương công việc hiện tại", value: user.current_job_salary },
    {
      label: "Ngày bắt đầu công việc hiện tại",
      value: user.current_job_start_date,
    },
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
    {
      label: "Cha mẹ sống ở quốc gia thăm viếng",
      value: user.is_parent_live_in_visiting_country,
    },
    {
      label: "Người thân sống ở quốc gia thăm viếng",
      value: user.is_relatives_living_in_visiting_country,
    },
    {
      label: "Mối quan hệ với người thân",
      value: user.relationship_with_relatives,
    },
    {
      label: "Thông tin người thân sống ở quốc gia thăm viếng",
      value: user.relatives_info_living_in_visiting_country,
    },
    {
      label: "Tình trạng cư trú của người thân",
      value: user.relatives_stay_status,
    },
    { label: "Tình trạng cư trú", value: user.stay_status },
  ];

  const travelInfo = [
    { label: "Ngày dự kiến bắt đầu", value: user.expected_start_date },
    { label: "Người đi cùng", value: user.accompanying_person },
    { label: "Các quốc gia đã từng đến", value: user.traveled_countries },
    { label: "Ngôn ngữ", value: user.foreign_languages },
    { label: "Mục đích chuyến đi", value: user.trip_purpose },
    {
      label: "Người trả chi phí cho chuyến đi",
      value: user.trip_payroll_person,
    },
    { label: "Loại visa đã có", value: user.visa_type_owned },
    {
      label: "Từng sống ở quốc gia xin visa",
      value: user.is_lived_in_visa_coutry,
    },
    {
      label: "Ngày sống tại quốc gia xin visa",
      value: user.is_lived_in_visa_coutry_date,
    },
    {
      label: "Số ngày ở quốc gia xin visa",
      value: user.is_lived_in_visa_coutry_days_stay,
    },
    { label: "Từng bị từ chối visa", value: user.is_denied_visa },
    { label: "Lý do bị từ chối visa", value: user.denied_visa_reason },
    { label: "Số lần bị từ chối visa", value: user.denied_visa_number_of_time },
    {
      label: "Có visa quốc gia không sử dụng",
      value: user.is_had_visa_country_not_used,
    },
    { label: "Quốc gia không sử dụng visa", value: user.visa_country_not_used },
    { label: "Tài liệu bảo lãnh", value: user.guarantee_documents },
    { label: "Mạng xã hội", value: user.social_network },
    {
      label: "Thành viên của bộ tộc hoặc đảng phái",
      value: user.is_belong_to_some_tribe_or_party,
    },
    { label: "Ngày gia nhập đảng phái", value: user.party_join_date },
    {
      label: "Làm việc cho tổ chức từ thiện",
      value: user.is_work_for_some_charity_organization,
    },
    { label: "Được đào tạo sử dụng vũ khí", value: user.is_weapons_trained },
    { label: "Làm việc trong quân đội", value: user.is_worked_on_army },
    { label: "Có bệnh", value: user.is_has_some_sick },
    {
      label: "Từng bị bắt vì tội phạm",
      value: user.is_had_been_arrested_by_crime,
    },
    { label: "Từ bỏ quốc tịch", value: user.is_renounce_citizenship },
  ];

  const renderSection = (
    title: string,
    data: { label: string; value: any }[]
  ) => (
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
        {data.map((info) => (
          <p key={info.label}>
            <strong>{info.label}:</strong>{" "}
            {info.value !== null
              ? info.value == 0 && info.label !== "Lương công việc hiện tại"
                ? "Không"
                : info.value == 1
                ? "Có"
                : isValidDateTimeString(info.value)
                ? format(info.value, "dd-MM-yyyy")
                : info.value
              : "N/A"}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="relative bg-white w-full p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Chi tiết người dùng</h2>
        {renderSection("Thông tin cá nhân", personalInfo)}
        {renderSection("Thông tin visa", visaInfo)}
        {renderSection("Công việc hiện tại", currentJobInfo)}
        {renderSection("Công việc trước đây", prevJobInfo)}
        {renderSection("Thông tin học vấn", studyInfo)}
        {renderSection("Thông tin gia đình", familyInfo)}
        {renderSection("Thông tin du lịch", travelInfo)}
        {/* <div className="mt-4">
          <Button onClick={sendToChatGPT} disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi để kiểm tra"}
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
          <Button onClick={onClose} className="ml-4">
            Đóng
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default UserDetailModal;
