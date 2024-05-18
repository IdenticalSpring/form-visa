import { Step2Form } from "@/components/forms/step2";
import MultiStepHeader from "@/components/shared/multi-step-header";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string | undefined };
}) {
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });
  if (!data) redirect("/");
  return (
    <div className="background-wrapper bg-opacity-50 min-h-screen flex items-center justify-center sm:p-0 md:p-6 p-10">
    <div className="w-[600px] max-w-[90%]  p-4 sm:p-0 md:p-8 lg:p-10 rounded-lg bg-white  bg-opacity-90">
    <MultiStepHeader currentStep={2} totalSteps={7} userId={data.id}/> 
        <Step2Form data={data} />
      </div>
    </div>
  );
}
