"use client";

import Particles from "@/components/particles";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
	{ name: "Products", href: "/products" },
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
];

export interface RootAppData {
	appData: AppData
}

export interface AppData {
	appName: string
	appDescription: string
	siteName: string
	keywords: string[]
	slogan: string
	pages: string[]
	sideNav: string[]
	url: string
	logo: string
	copy: string
	address: string
	mobile: string
	email: string
	instagram: string
}
export default function Page() {
	const [appData, setAppData] = useState<AppData | null>(null);

	const getContent = async () => {
		try {
			const response = await fetch("/models/appContentTexts.json", {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				}
			});
			return await response.json();
		} catch (error) {
			console.error('Error in getContent:', error);
			throw error;
		}
	};

	const fetchData = async () => {
		if (!appData) {
			try {
				const oData = await getContent();
				setAppData(oData.appData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	};

	const imageStyle = {
		borderRadius: '50%',
		border: '1px solid #fff',
		display: 'inline-block'
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center w-screen min-h-[100svh] overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
			<nav className="my-10 animate-fade-in">
				<ul className="flex items-center justify-center gap-4">
					{navigation.map((item) => (
						<li key={item.href}>
							<Link href={item.href}
								className="text-sm duration-500 text-zinc-500 hover:text-zinc-300">
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
			<Particles
				className="absolute inset-0 -z-10 animate-fade-in"
				quantity={200}
			/>
			{
				!appData &&
				(
					<h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
						Loading App...
					</h1>
				)
			}
			{
				appData &&
				(
					<>
						<h1 className="my-2 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
							<Image src={appData?.logo} alt="Krishnam Logo" width="300" height="300" style={imageStyle} />
							{/* {appData.appName} */}
						</h1>
						<div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
						<div className="my-5 text-center animate-fade-in">
							<h2>{appData.appName} </h2>
							<h2 className="text-base text-zinc-500 ">{appData.slogan}</h2>
						</div>
					</>
				)
			}


		</div>
	);
}
