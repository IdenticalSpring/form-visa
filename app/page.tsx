"use client";
import { checkReuseableData, createNewRecord, saveData } from "@/actions";
import { CustomModal } from "@/components/shared/custom-model";
import { FormItem } from "@/components/shared/form-item";
import { Button } from "@/components/ui/button";
import { countryList } from "@/constants";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  visa_to_country: z.string(),
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email." })
    .email("Email không hợp lệ."),
});

export default function Home() {
  const router = useRouter();
  const { setOpen } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visa_to_country: countryList[0],
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const rs = await createNewRecord(data);
    rs
      ? router.push(`/thong-tin-ca-nhan?id=${rs.id}`)
      : toast.error("Lỗi hệ thống, vui lòng thử lại sau!");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center background-wrapper relative overflow-hidden">
      <form
        className="w-[90%] max-w-[400px] flex flex-col gap-4 justify-center items-center bg-white p-8 rounded-lg shadow-md float-up relative z-10 bg-opacity-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          src={"/logo-visa.png"}
          alt="logo"
          width={100}
          height={100}
          className="h-auto mb-10"
        />
        <FormItem label="Quốc gia bạn muốn xin visa">
          <select className="form-select w-full p-2 border focus-visible:ring-0.5 focus-visible:border-[#3b6b87] focus-visible:ring-offset-0 focus-visible:ring-[#3b6b87] focus-visible:bg-[#a2c5d4] flex h-10 rounded-md bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-400 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300" {...register("visa_to_country")}>
            {countryList.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </FormItem>
        <FormItem label="Nhập email của bạn">
          <input type="email" id="email" className=" p-2 border focus-visible:ring-0.5 focus-visible:border-[#3b6b87] focus-visible:ring-offset-0 focus-visible:ring-[#3b6b87] focus-visible:bg-[#a2c5d4] flex h-10 w-full rounded-md bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-400 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300" {...register("email")} />
        </FormItem>
        <Button className="text-white capitalize bg-[#3b6b87] hover:bg-[#a2c5d4] max-w-40">
          Tiếp tục
        </Button>
      </form>
    </div>
  );

}
  