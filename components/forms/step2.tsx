"use client";
import { saveData } from "@/actions";
import { countryList } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker2 } from "../shared/date-picker2";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    id_issue_date: z.date({ message: "Vui lòng nhập trường này" }),
    id_expire_date: z.date({ message: "Vui lòng nhập trường này" }),
    id_country_receive: z
      .string({ message: "Vui lòng nhập trường này" })
      .min(1, "Vui lòng nhập trường này"),
    id_city_receive: z
      .string({ message: "Vui lòng nhập trường này" })
      .min(1, "Vui lòng nhập trường này"),
    id_lost_reason: z.string().optional(),
    is_id_had_been_lost: z.number(),
  })
  .refine(
    (data) => {
      if (data.is_id_had_been_lost === 1 && !data.id_lost_reason) {
        return false;
      }
      return true;
    },
    {
      message: "Vui lòng nhập lý do mất hộ chiếu",
      path: ["id_lost_reason"],
    }
  );

export const Step2Form = ({ data }: { data: UserInfo }) => {
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
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_city_receive: data?.id_city_receive ?? "",
      id_country_receive: data?.id_country_receive ?? "",
      id_expire_date: data?.id_expire_date
        ? new Date(data.id_expire_date)
        : new Date(),
      id_issue_date: data?.id_issue_date
        ? new Date(data.id_issue_date)
        : new Date(),
      is_id_had_been_lost: data?.id_lost_reason ? 1 : 0,
      id_lost_reason: data?.id_lost_reason ?? "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isInitialLoad) {
      const storedData = localStorage.getItem("step2FormData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData.id_issue_date) {
          parsedData.id_issue_date = new Date(parsedData.id_issue_date);
        }
        if (parsedData.id_expire_date) {
          parsedData.id_expire_date = new Date(parsedData.id_expire_date);
        }
        reset(parsedData);
      }
      setIsInitialLoad(false);
    }
  }, [reset, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("step2FormData", JSON.stringify(watchedValues));
    }
  }, [watchedValues, isInitialLoad]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { is_id_had_been_lost, ...rest } = values;
    const rs = await saveData({ ...rest, id: data.id });
    if (rs == "ok") router.push(`/thong-tin-cong-viec-hien-tai?id=${data?.id}`);
    setLoading(false);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/thong-tin-ca-nhan?id=${data.id}`);
  };

  return (
    <form
      className="flex flex-col gap-6 bg-opacity-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4">
        <FormItem label="Ngày cấp">
          <DatePicker2
            className="custom-date-picker"
            defaultValue={new Date(2020, 1, 1)}
            date={watch("id_issue_date")}
            setDate={(date) => setValue("id_issue_date", date ?? new Date())}
          />
          {errors.id_issue_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.id_issue_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Ngày hết hạn">
          <DatePicker2
            className="custom-date-picker"
            defaultValue={new Date(2020, 1, 1)}
            date={watch("id_expire_date")}
            setDate={(date) => setValue("id_expire_date", date ?? new Date())}
          />
          {errors.id_expire_date && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.id_expire_date.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Quốc gia cấp">
          <select className="form-select" {...register("id_country_receive")}>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.id_country_receive && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.id_country_receive.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Thành phố cấp">
          <input {...register("id_city_receive")} />
          {errors.id_city_receive && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.id_city_receive.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="is_id_had_been_lost"
          label="Bạn có đã từng đánh mất hộ chiếu?"
        >
          <select
            className="form-select"
            {...register("is_id_had_been_lost", { valueAsNumber: true })}
          >
            <option value="0">Chưa</option>
            <option value="1">Có</option>
          </select>
          {errors.is_id_had_been_lost && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_id_had_been_lost.message}
            </p>
          )}
        </FormItem>
        {watch("is_id_had_been_lost") == 1 && (
          <FormItem label="Hãy cho biết lí do mất ?">
            <input {...register("id_lost_reason")} />
            {errors.id_lost_reason && (
              <p className="text-rose-500 text-sm mt-2">
                {errors.id_lost_reason.message}
              </p>
            )}
          </FormItem>
        )}
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
