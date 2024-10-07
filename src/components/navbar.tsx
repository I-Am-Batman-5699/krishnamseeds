"use client";
import Link from "next/link";
import type { SVGProps } from "react";
import { useEffect, useState } from "react";

export default function Navbar(props:any) {
	const {classNameProp} = props;
	const [appData, setAppData] = useState();

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
			console.error('Error in Navbar getContent:', error);
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

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<header className={`px-4 lg:px-6 h-14 flex items-center ${classNameProp}`}>
				<Link className="flex items-center justify-center" href="/">
					<HomeIcon className="h-6 w-6" />
					<span className="sr-only">{appData?.appName}</span>
				</Link>
				<nav className="ml-auto flex gap-4 sm:gap-6">
					{!appData && (
						<Link
							className="text-sm font-medium hover:underline underline-offset-4"
							href=""
						>
							Loading...
						</Link>
					)}
					{appData && appData.pages && (
						appData.pages.map((page: String) => (
							<Link key={page} className="text-sm font-medium hover:underline underline-offset-4"
								href={`/${page.toLocaleLowerCase()}`}>
								{page}
							</Link>
						))
					)}
				</nav>
			</header>
			<hr />
		</div>
	);
}
function HomeIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Home</title>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}
