"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfo } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormItem } from "../shared/form-item";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";
import { saveData } from "@/actions";
import { useEffect, useState } from "react";

const formSchema = z.object({
  is_parent_live_in_visiting_country: z.number({
    message: "Vui lòng nhập trường này",
  }),
  stay_status: z.string({ message: "Vui lòng nhập trường này" }),
  is_relatives_living_in_visiting_country: z.number(),
  relatives_info_living_in_visiting_country: z
    .string()
    .min(1, "Vui lòng nhập trường này"),
  relationship_with_relatives: z
    .string({
      message: "Vui lòng nhập trường này",
    })
    .min(1, "Vui lòng nhập trường này"),
  relatives_stay_status: z.string({ message: "Vui lòng nhập trường này" }),
});

export const Step6Form = ({ data }: { data: UserInfo }) => {
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
      is_parent_live_in_visiting_country:
        data.is_parent_live_in_visiting_country ? 1 : 0,
      is_relatives_living_in_visiting_country:
        data.is_relatives_living_in_visiting_country ? 1 : 0,
      relationship_with_relatives: data.relationship_with_relatives ?? "",
      relatives_info_living_in_visiting_country:
        data.relatives_info_living_in_visiting_country ?? "",
      relatives_stay_status: data.relatives_stay_status ?? "",
      stay_status: data.stay_status ?? "",
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isInitialLoad) {
      const storedData = localStorage.getItem("step6FormData");
      if (storedData) {
        reset(JSON.parse(storedData));
      }
      setIsInitialLoad(false);
    }
  }, [reset, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("step6FormData", JSON.stringify(watchedValues));
    }
  }, [watchedValues, isInitialLoad]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { ...rest } = values;
    const rs = await saveData({
      ...rest,
      is_parent_live_in_visiting_country:
        values.is_parent_live_in_visiting_country ? true : false,
      is_relatives_living_in_visiting_country:
        values.is_relatives_living_in_visiting_country ? true : false,
      id: data.id,
    });
    if (rs == "ok") {
      router.push(`/thong-tin-du-lich?id=${data.id}`);
    }
    setLoading(false);
  };

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/trinh-do-hoc-van?id=${data.id}`);
  };
  return (
    <form
      className="flex flex-col gap-6 bg-opacity-80"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid gap-4">
        <FormItem
          id="is_parent_live_in_visiting_country"
          label="Cha mẹ của đương đơn đang ở đất nước bạn muốn xin visa không? "
        >
          <select
            className="form-select"
            {...register("is_parent_live_in_visiting_country", {
              valueAsNumber: true,
            })}
          >
            <option value="1">Có</option>
            <option value="0">Không</option>
          </select>
          {errors.is_parent_live_in_visiting_country && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_parent_live_in_visiting_country.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Tình trạng lưu trú ">
          <select className="form-select" {...register("stay_status")}>
            <option value="Không định cư" defaultChecked>
              Không định cư
            </option>
            <option value="Thường trú nhân">Thường trú nhân</option>
            <option value="du học sinh">Du học sinh</option>
            <option value="Công dân">Công dân</option>
          </select>
          {errors.stay_status && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.stay_status.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="is_relatives_living_in_visiting_country"
          label="Đương đơn có người thân nào khác (không phải là cha mẹ) sinh sống tại đất nước bạn muốn xin visa không?"
        >
          <select
            className="form-select"
            {...register("is_relatives_living_in_visiting_country", {
              valueAsNumber: true,
            })}
          >
            <option value="1">Có</option>
            <option value="0">Không</option>
          </select>
          {errors.is_relatives_living_in_visiting_country && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.is_relatives_living_in_visiting_country.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="relatives_info_living_in_visiting_country"
          label="Ghi rõ thông tin người thân"
        >
          <input {...register("relatives_info_living_in_visiting_country")} />
          {errors.relatives_info_living_in_visiting_country && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.relatives_info_living_in_visiting_country.message}
            </p>
          )}
        </FormItem>
        <FormItem
          id="relationship_with_relatives"
          label="Mối quan hệ với đương đơn"
        >
          <input {...register("relationship_with_relatives")} />
          {errors.relationship_with_relatives && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.relationship_with_relatives.message}
            </p>
          )}
        </FormItem>
        <FormItem label="Tình trạng lưu trú">
          <select
            className="form-select"
            {...register("relatives_stay_status")}
          >
            <option value="Không định cư">Không định cư</option>
            <option value="Thường trú nhân">Thường trú nhân</option>
            <option value="du học sinh">Du học sinh</option>
            <option value="Công dân">Công dân</option>
          </select>
          {errors.relatives_stay_status && (
            <p className="text-rose-500 text-sm mt-2">
              {errors.relatives_stay_status.message}
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
