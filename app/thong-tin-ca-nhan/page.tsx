import { Step1Form } from "@/components/forms/step1";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import MultiStepHeader from "@/components/shared/multi-step-header";

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

  return (
    <div className="background-wrapper bg-opacity-50 min-h-screen flex items-center justify-center p-10">
      <div className="w-[600px] max-w-[90%] p-10 rounded-lg bg-white bg-opacity-90">
        <MultiStepHeader currentStep={1} totalSteps={7} /> {/* Add MultiStepHeader */}
        <Step1Form data={data ?? undefined} />
      </div>
    </div>
  );
}
