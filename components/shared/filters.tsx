import { countryFields, countryList } from "@/constants";
import { UserInfo } from "@prisma/client";
import { Header, Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { DatePicker2 } from "./date-picker2";
import { format } from "date-fns";
const selectFields: {
  id: keyof UserInfo;
  options: string[];
}[] = [
  {
    id: "visa_to_country",
    options: countryList,
  },
  {
    id: "nationality",
    options: countryList,
  },
  {
    id: "other_nationality",
    options: countryList,
  },
  {
    id: "gender",
    options: ["Male", "Female"],
  },
  {
    id: "marital_status",
    options: ["Đã kết hôn", "Độc thân", "Góa chồng/vợ"],
  },
  {
    id: "is_has_kid",
    options: ["Có", "Không"],
  },
  {
    id: "is_lived_in_visa_coutry",
    options: ["Có", "Không"],
  },
  {
    id: "is_denied_visa",
    options: ["Có", "Không"],
  },
  {
    id: "is_had_visa_country_not_used",
    options: ["Có", "Không"],
  },
  {
    id: "stay_status",
    options: ["Không định cư", "Thường trú nhân", "Du học sinh", "Công dân"],
  },
  {
    id: "relatives_stay_status",
    options: ["Không định cư", "Thường trú nhân", "Du học sinh", "Công dân"],
  },
  {
    id: "is_relatives_living_in_visiting_country",
    options: ["Có", "Không"],
  },
  {
    id: "is_renounce_citizenship",
    options: ["Có", "Không"],
  },
  {
    id: "is_had_been_arrested_by_crime",
    options: ["Có", "Không"],
  },
  {
    id: "is_has_some_sick",
    options: ["Có", "Không"],
  },
  {
    id: "is_worked_on_army",
    options: ["Có", "Không"],
  },
  {
    id: "is_weapons_trained",
    options: ["Có", "Không"],
  },
  {
    id: "is_work_for_some_charity_organization",
    options: ["Có", "Không"],
  },
  {
    id: "social_network",
    options: [
      "Facebook",
      "Instagram",
      "Viber",
      "Youtube",
      "Twitter",
      "Không có",
    ],
  },
  {
    id: "is_belong_to_some_tribe_or_party",
    options: ["Có", "Không"],
  },
  {
    id: "is_parent_live_in_visiting_country",
    options: ["Có", "Không"],
  },
  {
    //@ts-ignore
    id: "is_id_had_been_lost",
    options: ["Có", "Không"],
  },
  {
    id: "old_job",
    options: [
      "Chủ doanh nghiệp",
      "Cán bộ công nhân viên",
      "Nhân viên văn phòng",
      "Nhân viên tự do",
    ],
  },
  {
    id: "current_job",
    options: [
      "Chủ doanh nghiệp",
      "Cán bộ công nhân viên",
      "Nhân viên văn phòng",
      "Nhân viên tự do",
    ],
  },
  {
    id: "country",
    options: countryList,
  },
  {
    id: "education_level",
    options: ["Dưới đại học", "Đại học", "Thạc sĩ", "Tiến sĩ"],
  },
];
const dateFields: (keyof UserInfo)[] = [
  "dob",
  "id_issue_date",
  "id_expire_date",
  "party_join_date",
  "school_end_date",
  "old_job_end_date",
  "school_start_date",
  "old_job_start_date",
  "expected_start_date",
  "is_lived_in_visa_coutry_date",
  "current_job_start_date",
];
export const Filter = ({
  header,
  table,
}: {
  header: Header<UserInfo, unknown>;
  table: Table<UserInfo>;
}) => {
  return header.column.getCanFilter() ? (
    <div key={header.id} className="inline-block mx-2">
      {/* {countryFields.includes(header.column.id) ? (
        <select
          className="w-[150px] m-auto  text-gray-500 text-sm border-gray-800 border border-opacity-30 rounded-sm h-10"
          value={(header.column.getFilterValue() as string) || ""}
          onChange={(e) => header.column.setFilterValue(e.target.value)}
        >
          <option value="">Tất cả</option>
          {countryList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      ) : typeof table
          .getPreFilteredRowModel()
          .flatRows[0]?.getValue(header.column.id) === "boolean" ? (
        <select
          className="w-[150px] m-auto text-gray-500 text-sm border-gray-800 border border-opacity-30 rounded-sm h-10"
          value={(header.column.getFilterValue() as string) || ""}
          onChange={(e) => header.column.setFilterValue(e.target.value)}
        >
          <option value="">Tất cả</option>
          <option value="yes">Có</option>
          <option value="no">Không</option>
        </select>
      ) : (
        <Input
          className="m-auto border-gray-800 border border-opacity-30 rounded-sm"
          value={(header.column.getFilterValue() as string) || ""}
          onChange={(e) => header.column.setFilterValue(e.target.value)}
          // placeholder={`Tìm kiếm ${header.column.id}`}
        />
      )} */}
      {selectFields.map((s) => {
        if (s.id === header.id) {
          return (
            <select
              key={s.id}
              className="w-[150px] m-auto text-gray-500 text-sm border-gray-800 border border-opacity-30 rounded-sm h-10"
              value={(header.column.getFilterValue() as string) || ""}
              onChange={(e) => header.column.setFilterValue(e.target.value)}
            >
              <option value="">Tất cả</option>
              {s.options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
      })}
      {/* {dateFields.map((f) => {
        if (f === header.id)
          return (
            <DatePicker2
              date={
                header.column.getFilterValue()
                  ? new Date(header.column.getFilterValue() as string)
                  : undefined
              }
              setDate={(date) =>
                header.column.setFilterValue(format(date, "dd-MM-yyyy"))
              }
              className="custom-date-picker"
            />
          );
      })} */}
      {!selectFields.some((s) => s.id === header.id) && (
        <Input
          className="m-auto border-gray-800 border border-opacity-30 rounded-sm"
          value={(header.column.getFilterValue() as string) || ""}
          onChange={(e) => header.column.setFilterValue(e.target.value)}
          // placeholder={`Tìm kiếm ${header.column.id}`}
        />
      )}
    </div>
  ) : null;
};
