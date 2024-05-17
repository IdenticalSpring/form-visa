import { Step3Form } from "@/components/forms/step3";
import { Step4Form } from "@/components/forms/step4";
import { Step5Form } from "@/components/forms/step5";
import { Step6Form } from "@/components/forms/step6";
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
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
<div className="background-wrapper m-auto bg-opacity-50 min-h-screen flex items-center justify-center p-10">
<div className="w-[600px] max-w-[90%]  p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg bg-white  bg-opacity-90">
    <MultiStepHeader currentStep={6} totalSteps={7} userId={data.id}/> 

        <Step6Form data={data} />
      </div>
    </div>
    
  );
}
