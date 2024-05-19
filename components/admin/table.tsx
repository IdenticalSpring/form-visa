"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { countryFields, countryList } from "@/constants/index"; // Adjust the path as needed
import { useModal } from "@/providers/modal-provider";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, EyeIcon } from "lucide-react";
import React, { useState } from "react";
import { CustomModal } from "../shared/custom-model";
import Pagination from "../shared/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import UserDetailModal from "./user-detail"; // Adjust the path as needed
import { format } from "date-fns";
import { Filter } from "../shared/filters";
import { UserInfo } from "@prisma/client";

// Define a custom filter function for boolean values
const booleanFilter: FilterFn<UserInfo> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (typeof value === "boolean") {
    if (filterValue === "Có") return value === true;
    if (filterValue === "Không") return value === false;
    return true;
  }
  if (value instanceof Date) {
    return format(value, "HH:ii:ss dd-MM-yyyy").includes(filterValue);
  }
  return String(value)
    .toLowerCase()
    .includes(String(filterValue).toLowerCase());
};

// Define a custom filter function for country values
const countryFilter: FilterFn<UserInfo> = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (typeof value === "string") {
    return value.toLowerCase().includes(String(filterValue).toLowerCase());
  }
  return true;
};

// Fields related to countries

const fieldNameMapping: { [key: string]: string } = {
  created_at: "Thời gian tạo",
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
  is_id_had_been_lost: "Đã từng mất hoặc bị đánh cấp hộ chiếu",
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
  is_relatives_living_in_visiting_country:
    "Người thân sống ở quốc gia thăm viếng",
  relatives_info_living_in_visiting_country:
    "Thông tin người thân sống ở quốc gia thăm viếng",
  relationship_with_relatives: "Mối quan hệ với người thân",
  relatives_stay_status: "Tình trạng cư trú của người thân",
  expected_start_date: "Ngày dự kiến bắt đầu",
  accompanying_person: "Người đi cùng",
  traveled_countries: "Các quốc gia đã từng đến",
  foreign_languages: "Thành thạo ngôn ngữ",
  trip_purpose: "Mục đích chuyến đi",
  trip_payroll_person: "Người trả chi phí cho chuyến đi",
  visa_type_owned: "Loại visa đã có",
  is_lived_in_visa_coutry: "Từng sống ở quốc gia xin visa",
  is_lived_in_visa_coutry_date: "Ngày bắt đầu sống tại quốc gia xin visa",
  is_lived_in_visa_coutry_days_stay: "Số ngày ở quốc gia xin visa",
  is_denied_visa: "Từng bị từ chối visa",
  denied_visa_reason: "Lý do bị từ chối visa",
  denied_visa_number_of_time: "Số lần bị từ chối visa",
  is_had_visa_country_not_used: "Có visa quốc gia không sử dụng",
  visa_country_not_used: "Visa quốc gia không sử dụng",
  guarantee_documents: "Hồ sơ bảo lãnh",
  social_network: "Mạng xã hội",
  is_belong_to_some_tribe_or_party: "Thành viên của bộ tộc hoặc đảng phái",
  party_join_date: "Ngày gia nhập đảng",
  is_work_for_some_charity_organization: "Làm việc cho tổ chức từ thiện",
  is_weapons_trained: "Được đào tạo sử dụng vũ khí",
  is_worked_on_army: "Làm việc trong quân đội",
  is_has_some_sick: "Có bệnh truyền nhiễm",
  is_had_been_arrested_by_crime: "Từng bị bắt kết án",
  is_renounce_citizenship: "Từ bỏ quyền công dân",
};

const defaultColumns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "created_at",
    header: "Tạo lúc",
    // cell: (info) => format(info as unknown as string, "yyyy-MM-yy"),
  },
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

const UserTable: React.FC<{ users: UserInfo[] }> = ({ users }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedFields, setSelectedFields] = useState<string[]>(
    //@ts-ignore
    defaultColumns.map((d) => d.accessorKey)
  );
  const { setOpen, setClose } = useModal();
  const columns: ColumnDef<UserInfo>[] = React.useMemo(() => {
    const dynamicColumns: ColumnDef<UserInfo>[] = selectedFields.map(
      (field) => ({
        id: field,
        accessorKey: field,
        header:
          fieldNameMapping[field] || field.replace(/_/g, " ").toUpperCase(),
        cell: ({ row }) => {
          const value = row.getValue(field) as string;
          if (typeof value === "boolean") {
            return value ? "Có" : "Không";
          }
          const date = new Date(value);
          if (value && !isNaN(date.getTime())) {
            return field == "created_at"
              ? format(date, "HH:ii:ss dd-MM-yyyy")
              : format(date, "dd-MM-yyyy");
          }
          return value !== null && value !== undefined ? String(value) : "N/A";
        },
        filterFn: countryFields.includes(field) ? countryFilter : booleanFilter,
      })
    );

    return [
      // ...defaultColumns,
      ...dynamicColumns,
      {
        id: "actions",
        header: "Hành động",
        cell: ({ row }) => (
          <EyeIcon
            className="mx-auto cursor-pointer"
            onClick={() =>
              setOpen(
                <CustomModal>
                  <UserDetailModal user={row.original} onClose={setClose} />
                </CustomModal>
              )
            }
          />
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
        : [
            ...Object.keys(fieldNameMapping).filter(
              (f) => prevFields.includes(f) || f === field
            ),
          ]
    );
  };
  return (
    <div className="w-full text-center">
      <div className="block md:flex md:items-center">
        <div className="flex flex-wrap items-center ml-4 space-x-2">
          {/* {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) =>
            
            )
          )} */}
        </div>
      </div>
      <div className="flex flex-col">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto border-gray-400 text-gray-800 font-bold mb-4 "
            >
              Thêm trường <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="max-h-96 overflow-y-auto py-4">
            {Object.keys(fieldNameMapping).map((field) => (
              <label
                key={field}
                className="capitalize flex items-start  gap-2 my-2 cursor-pointer"
              >
                <Input
                  readOnly
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  className="w-4 h-4 flex-shrink-0 mt-1"
                  onChange={() => handleFieldSelection(field)}
                />
                {fieldNameMapping[field] || field.replace(/_/g, " ")}
              </label>
            ))}
          </PopoverContent>
        </Popover>
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <>
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className=" text-gray-800 py-4">
                      <div className="text-center font-extrabold">
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
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className=" text-gray-800 py-1 px-0 min-w-[150px]"
                    >
                      <div className="w-full flex items-center justify-center">
                        <Filter header={header} table={table} />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`rounded-sm ${
                    index % 2 === 0
                      ? "bg-[#3b6b87] bg-opacity-10 rounded-md"
                      : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination
          totalPages={table.getPageCount()}
          onChange={table.setPageIndex}
        />
      </div>
    </div>
  );
};

export default UserTable;
