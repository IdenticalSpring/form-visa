"use client";
import { countryList } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gender, UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { saveData } from "@/actions";
import validator from "validator";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  gender: z.enum(["Male", "Female", "Other"]),
  name_alias: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  dob: z.date(),
  pob: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  marital_status: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  husband_wife_pob: z.string(),
  is_has_kid: z.number(),
  country: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  nationality: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  is_has_other_nationality: z.number(),
  other_nationality: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này")
    .optional(),
  address_on_paper: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  current_address: z
    .string({ message: "Vui lòng nhập trường này" })
    .min(1, "Vui lòng nhập trường này"),
  phone_number: z
    .string({ message: "Vui lòng nhập trường này" })
    .refine((val) => /^0[35789]\d{8}$/.test(val), "Số điện thoại không hợp lệ"),
});

export const Step1Form = ({ data }: { data?: UserInfo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      name_alias: data?.name_alias ?? "",
      dob: data?.dob ? new Date(data.dob) : new Date(),
      pob: data?.pob ?? "",
      address_on_paper: data?.address_on_paper ?? "",
      country: data?.country ?? "",
      current_address: data?.current_address ?? "",
      husband_wife_pob: data?.husband_wife_pob ?? "",
      nationality: data?.nationality ?? "",
      phone_number: data?.phone_number ?? "",
      is_has_kid: data?.is_has_kid ? 1 : 0,
      is_has_other_nationality: data?.other_nationality ? 1 : 0,
      gender: data?.gender ?? "Male",
      marital_status: data?.marital_status ?? "Độc thân",
      other_nationality: data?.other_nationality ?? undefined,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isInitialLoad) {
      const storedData = localStorage.getItem("step1FormData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.dob) {
          parsedData.dob = new Date(parsedData.dob);
        }
        reset(parsedData);
      }
      setIsInitialLoad(false);
    }
  }, [reset, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("step1FormData", JSON.stringify(watchedValues));
    }
  }, [watchedValues, isInitialLoad]);

  const validatePhoneNumber = (value: string) => {
    const pattern = /^0[35789]\d{8}$/;
    if (!pattern.test(value)) {
      setError("phone_number", {
        type: "manual",
        message: "Số điện thoại không hợp lệ ",
      });
    } else {
      clearErrors("phone_number");
    }
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { is_has_other_nationality, ...rest } = value;
    const rs = await saveData({
      ...rest,
      id: data?.id,
      is_has_kid: value.is_has_kid ? true : false,
    });
    setLoading(false);
    if (rs === "ok") router.push(`/thong-tin-ho-chieu?id=${data?.id}`);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/`);
  };
  return (
    <form
      className="flex flex-col gap-6 bg-opacity-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4 ">
        <FormItem label="Họ và tên theo hộ chiếu">
          <input
            {...register("name")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-rose-500 text-sm mt-2">{errors.name.message}</p>
          )}
        </FormItem>
        <FormItem label="Giới tính">
          <RadioGroup
            defaultValue={data?.gender ?? "Male"}
            className="w-full flex"
            onValueChange={(value: Gender) => setValue("gender", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="r1" />
              <Label htmlFor="r1">Nam</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="r2" />
              <Label htmlFor="r2">Nữ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="r3" />
              <Label htmlFor="r3">Khác</Label>
            </div>
          </RadioGroup>
          {errors.gender && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.gender.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Tên khác">
          <input
            {...register("name_alias")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter alias"
          />
          {errors.name_alias && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.name_alias.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày tháng năm sinh">
          <DatePicker2
            date={watch("dob")}
            setDate={(date) => setValue("dob", date ?? new Date())}
            className="custom-date-picker"
          />
          {errors.dob && (
            <p className="text-rose-500 text-sm mt-2">{errors.dob.message}</p>
          )}
        </FormItem>
        <FormItem label="Nơi sinh">
          <input
            {...register("pob")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter place of birth"
          />
          {errors.pob && (
            <p className="text-rose-500 text-sm mt-2">{errors.pob.message}</p>
          )}
        </FormItem>
        <FormItem label="Tình trạng hôn nhân">
          <RadioGroup
            defaultValue={data?.marital_status ?? "Độc thân"}
            className="w-full flex flex-row"
            onValueChange={(value) => setValue("marital_status", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Độc thân" id="d1" />
              <Label htmlFor="d1">Độc thân</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Đã kết hôn" id="d2" />
              <Label htmlFor="d2">Đã kết hôn</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Góa chồng/vợ" id="d3" />
              <Label htmlFor="d3">Góa chồng/vợ</Label>
            </div>
          </RadioGroup>
          {errors.marital_status && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.marital_status.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Nơi sinh của vợ/chồng">
          <input
            {...register("husband_wife_pob")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter spouse's place of birth"
          />
          {errors.husband_wife_pob && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.husband_wife_pob.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Đương đơn đã có con?">
          <select
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            {...register("is_has_kid", { valueAsNumber: true })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_has_kid && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_has_kid.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Quốc gia">
          <select
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            {...register("country")}
          >
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.country.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Quốc tịch">
          <select
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            {...register("nationality")}
          >
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.nationality && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.nationality.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="is_has_other_nationality"
          label="Đương đơn có thêm quốc tịch khác?"
        >
          <select
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            {...register("is_has_other_nationality", { valueAsNumber: true })}
          >
            <option value="1">Có</option>
            <option value="0">Không</option>
          </select>
          {errors.is_has_other_nationality && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_has_other_nationality.message}
            </p>
          )}
        </FormItem>
        {watch("is_has_other_nationality") == 1 && (
          <FormItem label="Hãy cho biết quốc tịch gì?">
            <select
              className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
              {...register("other_nationality")}
            >
              {countryList.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.other_nationality && (
              <p className="text-rose-500 text-sm mt-2">
                {errors.other_nationality.message}
              </p>
            )}
          </FormItem>
        )}
        <FormItem label="Địa chỉ ghi trên hộ khẩu?">
          <input
            {...register("address_on_paper")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter address on paper"
          />
          {errors.address_on_paper && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.address_on_paper.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Địa chỉ nơi ở hiện tại?">
          <input
            {...register("current_address")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            placeholder="Enter current address"
          />
          {errors.current_address && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.current_address.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Số điện thoại di động?">
          <input
            {...register("phone_number")}
            className="flex h-10 w-full border border-[#3b6b87] rounded-md p-2 bg-white text-black text-sm outline-none focus-visible:border-[#3b6b87] focus-visible:bg-[#a2c5d4] focus-visible:shadow-[0_0_0_0.3px_#3b6b87]"
            onInput={(evt) => {
              let inputValue = evt.currentTarget.value;
              inputValue = inputValue.replace(/\D/g, "");
              evt.currentTarget.value = inputValue.slice(0, 10);
            }}
            onBlur={(evt) => {
              validatePhoneNumber(evt.currentTarget.value);
            }}
            placeholder="Enter phone number"
          />
          {errors.phone_number && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.phone_number.message}
            </p>
          )}
        </FormItem>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          type="submit"
          className="bg-white text-gray-700"
          variant={"ghost"}
          onClick={handleBackClick}
        >
          <ArrowLeft />
          Trở về
        </Button>
        <Button
          type="submit"
          className="text-white capitalize bg-[#3b6b87] hover:bg-[#a2c5d4]"
          loading={loading}
        >
          Tiếp tục
        </Button>
      </div>
    </form>
  );
};
