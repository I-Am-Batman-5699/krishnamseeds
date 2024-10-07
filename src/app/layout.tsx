import appContentTexts from "@/app/appContentTexts.json";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";

const calSans = LocalFont({
    src: "../../public/fonts/CalSans-SemiBold.ttf",
    variable: "--font-calsans",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const appData:any = appContentTexts?.appData || {
	appName: "Krishnam Seeds",
	appDesciption: "Krishnam Seeds is dedicated to providing high-quality seeds that ensure bountiful harvests and sustainable growth",
	keywords: ["seeds", "agriculture", "uttar pradesh", "krishnam seeds", "krishnam"]
};
const unknown = "unknown";

export const metadata: Metadata = {
	title: appData?.appName || unknown,
	description: appData?.appDescription || unknown,
	openGraph: {
		type: "website",
		url: "",
		title: appData?.appName || unknown,
		description: appData?.appDescription || unknown,
		images: [
			{
				url: "",
				width: 640,
				height: 640,
			},
		],
	},
	keywords: appData?.keywords || unknown,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Krishnam Seeds",
		card: "summary_large_image",
	},
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html
            lang="en"
            className={[inter.variable, calSans.variable, "dark"].join(" ")}>
            <head>
                <link rel="icon" href="/favicon.png" />
            </head>
            <body className={inter.className}>
                <main className="flex flex-col min-h-[100svh]">{children}</main>
            </body>
        </html>
    );
}
