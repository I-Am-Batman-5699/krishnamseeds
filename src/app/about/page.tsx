"use client"
import about from "@/app/about/about.json";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Particles from "@/components/particles";
import { ContainerGrid, ContainerGridText, ContentGridImage, SectionDivContainer } from "@/components/ui/section";
import classes from "@/css/loading.module.css";
import { useCallback, useEffect, useState } from "react";


export default function Component() {
	
	const [appData, setAppData] = useState([]);
	const [appDataFetched, setAppDataFetched] = useState(false);
	
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
			const oData: any = await getContent();
			oData?.aboutDetails && setAppData(oData.aboutDetails);
			setAppDataFetched(true);
		}
	},[appData, appDataFetched]);
	
	useEffect(() => {
		fetchData();
	}, [fetchData]);
	
	const bg = "bg-gradient-to-r from-black from-30% to-blue-800 to-100%";

	return (
		<div>
			<Navbar classNameProp={bg}/>
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
			 appDataFetched &&	appData.length > 0 && (
					<div className="min-h-[calc(100svh-65svh)] opacity-90 bg-gradient-to-r from-black from-30% to-blue-800 to-100%" >
						{appData.map((el: any, idx: number) => {
							return (
								<div  key={el.about}>
									<Particles className="absolute inset-0 -z-10 animate-fade-in py-2 mt-14" quantity={200}/>
									<section className="w-full flex justify-center py-2 md:py-2 lg:py-3 xl:py-4">
										<SectionDivContainer>
											<ContainerGrid>
												{idx % 2 === 0 &&
													<>
														<ContainerGridText aboutDetails={el}></ContainerGridText>
														<ContentGridImage src={el.url} alt={el.aboutHeading}></ContentGridImage>
													</>
												}
												{idx % 2 !== 0 &&
													<>
														<ContentGridImage src={el.url} alt={el.aboutHeading}></ContentGridImage>
														<ContainerGridText aboutDetails={el}></ContainerGridText>
													</>
												}
											</ContainerGrid>
										</SectionDivContainer>
									</section>
									< div className="border-t border-gray-300 mx-10"></div >
								</div>)
						})}
					</div >
				)
			}
			<Footer />
		</div>
	);
}
