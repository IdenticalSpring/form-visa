"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserDetailModal from "./user-detail"; // Adjust the path as needed
import { countryList } from "@/constants/index"; // Adjust the path as needed
import { useState } from "react";
import React from "react";

interface User {
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
  is_id_had_been_lost: boolean | null;
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

// Define a custom filter function for boolean values
const booleanFilter: FilterFn<User> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (typeof value === "boolean") {
    if (filterValue === "yes") return value === true;
    if (filterValue === "no") return value === false;
    return true;
  }
  return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
};

// Define a custom filter function for country values
const countryFilter: FilterFn<User> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (typeof value === "string") {
    return value.toLowerCase().includes(String(filterValue).toLowerCase());
  }
  return true;
};

// Fields related to countries
const countryFields = [
  "country",
  "nationality",
  "other_nationality",
  "visa_to_country",
  "id_country_receive",
];

const fieldNameMapping: { [key: string]: string } = {
  id: "Mã",
  name: "Tên",
  phone_number: "Số điện thoại",
  email: "Email",
  visa_to_country: "Visa đến quốc gia",
  name_alias: "Tên khác",
  gender: "Giới tính",
  dob: "Ngày sinh",
  pob: "Nơi sinh",
  marital_status: "Tình trạng hôn nhân",
  husband_wife_pob: "Nơi sinh của vợ/chồng",
  is_has_kid: "Có con",
  country: "Quốc gia",
  nationality: "Quốc tịch",
  other_nationality: "Quốc tịch khác",
  address_on_paper: "Địa chỉ trên giấy tờ",
  current_address: "Địa chỉ hiện tại",
  id_issue_date: "Ngày cấp ID",
  id_expire_date: "Ngày hết hạn ID",
  id_country_receive: "Quốc gia nhận ID",
  id_city_receive: "Thành phố nhận ID",
  id_lost_reason: "Lý do mất ID",
  is_id_had_been_lost: "ID đã bị mất",
  current_job: "Công việc hiện tại",
  current_job_address: "Địa chỉ công việc hiện tại",
  current_job_start_date: "Ngày bắt đầu công việc hiện tại",
  current_company_phone_number: "Số điện thoại công ty hiện tại",
  current_job_title: "Chức danh công việc hiện tại",
  current_job_salary: "Lương công việc hiện tại",
  current_job_detail: "Chi tiết công việc hiện tại",
  old_job: "Công việc cũ",
  old_job_title: "Chức danh công việc cũ",
  old_job_start_date: "Ngày bắt đầu công việc cũ",
  old_job_end_date: "Ngày kết thúc công việc cũ",
  education_level: "Trình độ học vấn",
  school_name: "Tên trường",
  major: "Chuyên ngành",
  school_start_date: "Ngày bắt đầu học",
  school_end_date: "Ngày kết thúc học",
  is_parent_live_in_visiting_country: "Cha mẹ sống ở quốc gia thăm viếng",
  stay_status: "Tình trạng cư trú",
  is_relatives_living_in_visiting_country: "Người thân sống ở quốc gia thăm viếng",
  relatives_info_living_in_visiting_country: "Thông tin người thân sống ở quốc gia thăm viếng",
  relationship_with_relatives: "Mối quan hệ với người thân",
  relatives_stay_status: "Tình trạng cư trú của người thân",
  expected_start_date: "Ngày dự kiến bắt đầu",
  accompanying_person: "Người đi cùng",
  traveled_countries: "Các quốc gia đã từng đến",
  foreign_languages: "Ngôn ngữ",
  trip_purpose: "Mục đích chuyến đi",
  trip_payroll_person: "Người trả chi phí cho chuyến đi",
  visa_type_owned: "Loại visa đã có",
  is_lived_in_visa_coutry: "Từng sống ở quốc gia xin visa",
  is_lived_in_visa_coutry_date: "Ngày sống tại quốc gia xin visa",
  is_lived_in_visa_coutry_days_stay: "Số ngày ở quốc gia xin visa",
  is_denied_visa: "Từng bị từ chối visa",
  denied_visa_reason: "Lý do bị từ chối visa",
  denied_visa_number_of_time: "Số lần bị từ chối visa",
  is_had_visa_country_not_used: "Có visa quốc gia không sử dụng",
  visa_country_not_used: "Quốc gia không sử dụng visa",
  guarantee_documents: "Tài liệu bảo lãnh",
  social_network: "Mạng xã hội",
  is_belong_to_some_tribe_or_party: "Thành viên của bộ tộc hoặc đảng phái",
  party_join_date: "Ngày gia nhập đảng phái",
  is_work_for_some_charity_organization: "Làm việc cho tổ chức từ thiện",
  is_weapons_trained: "Được đào tạo sử dụng vũ khí",
  is_worked_on_army: "Làm việc trong quân đội",
  is_has_some_sick: "Có bệnh",
  is_had_been_arrested_by_crime: "Từng bị bắt vì tội phạm",
  is_renounce_citizenship: "Từ bỏ quốc tịch",
  is_done_filling: "Đã hoàn thành điền thông tin",
};

const defaultColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
];

const UserTable: React.FC<{ users: User[] }> = ({ users }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleShowModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const columns: ColumnDef<User>[] = React.useMemo(() => {
    const dynamicColumns: ColumnDef<User>[] = selectedFields.map((field) => ({
      accessorKey: field,
      header: fieldNameMapping[field] || field.replace(/_/g, " ").toUpperCase(),
      cell: ({ row }) => {
        const value = row.getValue(field);
        if (typeof value === "boolean") {
          return value ? "Có" : "Không";
        }
        return value !== null && value !== undefined ? String(value) : "N/A";
      },
      filterFn: countryFields.includes(field) ? countryFilter : booleanFilter,
    }));

    return [
      ...defaultColumns,
      ...dynamicColumns,
      {
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => (
          <TableCell className="flex items-end justify-center">
            <Button className="bg-[#3b6b87] flex items-center space-x-2" onClick={() => handleShowModal(row.original)}>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              Chi tiết
            </Button>
          </TableCell>
        ),
      },
    ];
  }, [selectedFields]);

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFieldSelection = (field: string) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(field)
        ? prevFields.filter((f) => f !== field)
        : [...prevFields, field]
    );
  };

  return (
    <div className="w-full text-center">
      {showModal && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
      <div className="flex items-center py-4">
        

        <div className="flex flex-wrap items-center ml-4 space-x-2">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) =>
              header.column.getCanFilter() ? (
                <div key={header.id} className="inline-block mx-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </label>
                  {countryFields.includes(header.column.id) ? (
                    <select
                    className="m-auto w-[10vw] text-gray-500 text-sm border-gray-800 border border-opacity-30 mb-5 rounded-sm h-10"
                      value={header.column.getFilterValue() as string || ""}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                    >
                      <option  value="">Tất cả</option>
                      {countryList.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  ) : typeof table.getPreFilteredRowModel().flatRows[0]?.getValue(header.column.id) === "boolean" ? (
                    <select
                    className="m-auto text-gray-500 text-sm border-gray-800 border border-opacity-30 mb-5 rounded-sm h-10"
                      value={header.column.getFilterValue() as string || ""}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                    >
                      <option   value="">Tất cả</option>
                      <option   value="yes">Có</option>
                      <option   value="no">Không</option>
                    </select>
                  ) : (
                    <Input
                      className="m-auto border-gray-800 border border-opacity-30 mb-5 rounded-sm"
                      value={header.column.getFilterValue() as string || ""}
                      onChange={(e) =>
                        header.column.setFilterValue(e.target.value)
                      }
                      placeholder={`Tìm kiếm ${header.column.id}`}
                    />
                  )}
                </div>
              ) : null
            )
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border-gray-400 text-gray-800 font-bold">
              Thêm trường <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-96 overflow-y-auto">
            {Object.keys(users[0] || {}).map((field) => (
              <DropdownMenuCheckboxItem
                key={field}
                className="capitalize"
                checked={selectedFields.includes(field)}
                onCheckedChange={() => handleFieldSelection(field)}
              >
                {fieldNameMapping[field] || field.replace(/_/g, " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className=" text-gray-800 bg-white">
                    <div className="h-8 pt-1 text-center font-extrabold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`rounded-sm ${index % 2 === 0 ? "bg-[#3b6b87] bg-opacity-10 rounded-md" : "bg-white"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        {Array.from({ length: table.getPageCount() }, (_, index) => (
          <Button
            key={index}
            className={table.getState().pagination.pageIndex === index ? "bg-[#3b6b87] text-white" : "bg-white text-green-700 border border-green-700"}
            size="sm"
            onClick={() => table.setPageIndex(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground"></div>
      </div>
    </div>
  );
};

export default UserTable;
