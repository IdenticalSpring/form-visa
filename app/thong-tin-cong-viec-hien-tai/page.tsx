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
<div className="background-wrapper m-auto bg-opacity-50 min-h-screen flex items-center justify-center p-10">
    <div className="w-[600px] max-w-[90%]  p-10 rounded-lg bg-white  bg-opacity-90">
        <MultiStepHeader currentStep={3} totalSteps={7} /> 

        <Step3Form data={data} />
      </div>
    </div>
    
  );
}
