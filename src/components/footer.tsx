"use client";
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from "react";

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

export default function Footer() {
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
			console.error('Error in Footer getContent:', error);
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

	const img = "ml-2 border-teal bg-transparent flex";

	return (
		<footer className="flex flex-col sm:flex-row gap-2 py-6 w-full shrink-0 justify-end items-center px-4 md:px-6 border-t">
			<div className="block">
				{
					appData &&
					(
						<div>
							<p className="text-s text-gray-500 dark:text-gray-400">
								{appData.copy}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{appData.address}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Email us on : {appData.email}
							</p>
							<div className="flex flex-row justify-start items-center">
								<span title="Follow us on" className="text-xs text-gray-500 dark:text-gray-400 flex">Follow us on →</span>
								<a title="Insta logo" href={appData.instagram} target="_blank">
									<Avatar alt="Instagram" src="/icons/insta-footer.png" variant="square" className={`mt-0.5 ${img}`} style={{ width: '1.25rem', height: '1.25rem' }} />
								</a>
								<a title="Email logo" href={appData.email} target="_blank">
									<Avatar alt="Email" src="/icons/email.png" variant="square" className={`mt-0.5 ${img}`} style={{ width: '1.25rem', height: '1.25rem' }} />
								</a>
								<a title="X logo" href="" target="_blank">
									<Avatar alt="X" src="/icons/twitter.png" variant="square" className={`mt-0.5 ${img}`} style={{ width: '1.25rem', height: '1.25rem' }} />
								</a>
								<a title="Facebook logo" href="" target="_blank">
									<Avatar alt="Facebook" src="/icons/facebook-footer.png" variant="square" className={`mt-0.5 ${img}`} style={{ width: '1.25rem', height: '1.25rem' }} />
								</a>
							</div>
						</div>
					)
				}
			</div>
		</footer>
	);
}
