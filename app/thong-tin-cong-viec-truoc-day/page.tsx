import { Step4Form } from "@/components/forms/step4";
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
    <div className="w-[600px] max-w-[90%]  p-10 rounded-lg bg-white bg-opacity-90">
        <h1 className="text-center text-lg mb-5">Step 4</h1>
        <Step4Form data={data} />
      </div>
    </div>
    
  );
}
