import { Step1Form } from "@/components/forms/step1";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import MultiStepHeader from "@/components/shared/multi-step-header";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string | undefined };
}) {
  const { id } = searchParams;
  if (!id) redirect("/");
  const data = await prisma.userInfo.findFirst({ where: { id } });

  if (!data) {
    // Redirect or show an error message if data is null
    redirect("/");
    return null;
  }

  return (
    <div className="background-wrapper m-auto bg-opacity-50 min-h-screen flex items-center justify-center p-10">
      <div className="w-[600px] max-w-[90%] p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg bg-white bg-opacity-90">
        <MultiStepHeader currentStep={1} totalSteps={7} userId={data.id} />
        <Step1Form data={data} />
      </div>
    </div>
  );
}
