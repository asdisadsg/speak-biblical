import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "仿和合本体｜仿写成文，释白还意",
  description:
    "输入一句寻常话，把它翻译成早期和合本译文腔的白话翻译腔；也可粘贴仿经体，释白翻回直接人话。",
  keywords: ["早期和合本译文腔", "仿和合本体", "释白", "AI翻译", "网络梗", "DeepSeek"],
  openGraph: {
    title: "仿和合本体",
    description: "仿写成文，释白还意。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
