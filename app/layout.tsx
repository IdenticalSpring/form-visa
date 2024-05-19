import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "sonner";
import { CustomProgressBar } from "@/components/shared/progressbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form visa - GUU TRAVE ",
  description:
    "Chúng tôi cam kết mang đến cho quý khách hàng những dịch vụ đạt chuẩn, đúng gu cho mọi lứa tuổi, mọi nhu cầu. Lấy sự hài lòng của quý khách là kim chỉ nam trong mọi quyết định và hành động. Khách hàng là giá trị cốt lõi của doanh nghiệp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModalProvider>
          <main>{children}</main>
        </ModalProvider>
        <Toaster />
        <CustomProgressBar />
      </body>
    </html>
  );
}
