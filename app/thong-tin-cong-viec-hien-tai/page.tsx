import { Step3Form } from "@/components/forms/step3";
import MultiStepHeader from "@/components/shared/multi-step-header";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | undefined };
}) {
  // const { email, country, type } = searchParams;
  // if (!email || !country) return redirect("/");
  // const data =
  //   type == "1"
  //     ? await prisma.userInfo.findFirst({
  //         where: {
  //           email: email,
  //           visa_to_country: country,
  //         },
  //         orderBy: {
  //           id: "desc",
  //         },
  //       })
  //     : null;
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
    <div className="background-wrapper bg-opacity-50 min-h-screen flex items-center justify-center sm:p-0 md:p-6 p-10">
<div className="w-[600px] max-w-[90%]  p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg bg-white  bg-opacity-90">
        <MultiStepHeader currentStep={3} totalSteps={7} userId={data.id}/> 

        <Step3Form data={data} />
      </div>
    </div>
    
  );
}
