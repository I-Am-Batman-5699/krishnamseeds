"use client"
import about from "@/app/about/about.json";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Particles from "@/components/particles";
import { ContainerGrid, ContainerGridText, ContentGridImage, SectionDivContainer } from "@/components/ui/section";
import classes from "@/css/loading.module.css";
import { useCallback, useEffect, useState } from "react";

import { About, AboutDetail, AppContextData, Statement, Story } from "@/utils/types";


export default function Component() {

	const [appContext, setAppContext] = useState<AppContextData>();
	const [appData, setAppData] = useState(Array<AboutDetail>);
	const [appDataFetched, setAppDataFetched] = useState(false);
	const [story, setStory] = useState<Story>();

	const getAppContent = async () => {
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
			console.error('Error in App Context getContent:', error);
			throw error;
		}
	};

	const getContent = async () => {
		try {
			return about;
		} catch (error) {
			console.error('Error in getContent:', error);
			throw error;
		}
	};

	const fetchData = useCallback(async () => {
		if (Object.keys(appData).length === 0 && !appDataFetched) {
			const oData: About = await getContent();
			oData?.aboutDetails && setAppData(oData.aboutDetails);
			oData?.story && setStory(oData.story);
			setAppDataFetched(true);

			const appContextData = await getAppContent();
			setAppContext(appContextData.appData);
			console.log(appContext)
		}
	}, [appData, appDataFetched, appContext]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const bg = "bg-gradient-to-r from-black from-30% to-blue-800 to-100%";

	return (
		<div>
			<Particles className="absolute inset-0 z-10 animate-fade-in py-2 mt-14" quantity={200} />
			<Navbar classNameProp={bg} />
			<div className="min-h-[calc(100svh-65svh)] opacity-100 bg-gradient-to-r from-black from-30% to-blue-800 to-100%" >
				{
					!appDataFetched && (
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-1 lg:grid-cols-1 lg:gap-12 justify-center" >
							<div className={classes.loading}>
								<p className="justify-center align-middle flex">Loading...!</p>
								<div className={classes.wrapper}>
									<div className={classes.circle}></div>
									<div className={classes.circle}></div>
									<div className={classes.circle}></div>
									<div className={classes.shadow}></div>
									<div className={classes.shadow}></div>
									<div className={classes.shadow}></div>
								</div>
							</div>
						</div>
					)
				}
				{
					appDataFetched && appData.length > 0 && (
						<>
							<div className="w-full flex align-middle justify-center py-2 md:py-2 lg:py-3 xl:py-4">
								<div className="flex flex-col justify-center align-middle items-center max-w-[calc(100vw-10vw)]">
									<div className="w-full flex align-middle justify-end my-1 opacity-50">
										<p>App version: {appContext?.version}</p>
									</div>
									<p className="text-2xl mt-2 mb-2">About Krishnam Seeds</p>
									<div>
										<>
											{
												<div className="justify-center">
													<p className="text-m font-bold tracking-tighter md:text-xl xl:text-2xl/none">{story?.intro.title}</p>
													<p>{story?.intro.content}</p>
												</div>
											}
											< div className="border-t w-full border-gray-300 mt-4 pb-2"></div >
										</>
										<div className="hidden">
											{
												<div className="justify-center mt-4">
													<p className="text-m font-bold tracking-tighter md:text-xl xl:text-2xl/none">
														{story?.motivation?.title}
													</p>
													<div>
														{story?.motivation?.statements && story?.motivation?.statements?.length > 0 &&
															story?.motivation.statements.map((el: Statement, idx: number) => (
																<div key={idx} className="m-1">
																	<p className="text-m font-bold tracking-tighter md:text-m xl:text-l">{el.title}</p>
																	<ul className="m-1 text-slate-400">
																		<li>{el.text}</li>
																	</ul>
																</div>
															))}
													</div>
												</div>
											}
											< div className="border-t w-full border-gray-300 mt-4 pb-2"></div >
										</div>
									</div>
								</div>
							</div>
							{appData.map((el: any, idx: number) => {
								return (
									<div key={el.about}>
										<section className="w-full flex justify-center py-2 md:py-2 lg:py-3 xl:py-4">
											<SectionDivContainer>
													{idx % 2 === 0 &&
														<ContainerGrid className="lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_600px]">
															<ContainerGridText aboutDetails={el}></ContainerGridText>
															<ContentGridImage src={el.url} alt={el.aboutHeading}></ContentGridImage>
														</ContainerGrid>
													}
													{idx % 2 !== 0 &&
														<ContainerGrid className="lg:grid-cols-[400px_1fr] xl:grid-cols-[600px_1fr]">
															<ContentGridImage src={el.url} alt={el.aboutHeading}></ContentGridImage>
															<ContainerGridText aboutDetails={el}></ContainerGridText>
														</ContainerGrid>
													}
											</SectionDivContainer>
										</section>
										< div className={`${idx < appData.length - 1 ? `border-t border-gray-300` : ``} mx-10 pb-2`}></div >
									</div>)
							})}
						</>
					)
				}
			</div>
			<Footer classNameProp={`${bg}`} />
		</div>
	);
}
