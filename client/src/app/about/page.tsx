"use client";
import Footer from "@/components/footer";
import LoadingSpinner from "@/components/loading";
import Navbar from "@/components/navbar";
import Particles from "@/components/particles";
import { ContainerGrid, ContainerGridText, ContentGridImage, SectionDivContainer } from "@/components/ui/section";
import ApiService from "@/lib/apiService";
import { aboutData, aboutDataRes, AboutDetail } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export default function Component() {
    const [appData, setAppData] = useState<AboutDetail[]>([]);
    const [appDataFetched, setAppDataFetched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<Error | null>(null);

    const getContent = async () => {
        try {
            const response: aboutDataRes = await ApiService.get<aboutDataRes>(`/api/data/about`);
            return response.data;
        } catch (error: any) {
            console.error('Error in getContent:', error);
            setFetchError(error);
            return null;
        }
    };

    const fetchData = useCallback(async () => {
        if (!appDataFetched) {
            setIsLoading(true);
            setFetchError(null);
            try {
                const oData: aboutData | null = await getContent();
                if (oData && oData.aboutDetails) {
                    setAppData(oData.aboutDetails);
                }
                setAppDataFetched(true);
            } catch (error: any) {
                console.error("Error fetching data:", error);
                setFetchError(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [appDataFetched]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const retryFetch = () => {
        setAppData([]);
        setAppDataFetched(false);
        fetchData();
    };

    const bg = "bg-gradient-to-r from-black from-30% to-blue-800 to-100%";

    if (fetchError) {
        return (
            <div>
                <Navbar classNameProp={bg} />
                <div className="flex flex-col items-center justify-center w-screen min-h-[100svh] overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
                    <p>Error: {fetchError.message}</p>
                    <button onClick={retryFetch} className="p-2 bg-blue-500 rounded-md text-white">Retry</button>
                </div>
                <Footer />
            </div>
        );
    }

	const bgMain = "min-h-[calc(100svh-65svh)] opacity-90 bg-gradient-to-r from-black from-30% to-blue-800 to-100%";

    return (
		<div>
			<Navbar classNameProp={bg} />
			{/* Loading State */}
			{isLoading && <LoadingSpinner className={bgMain}/>}
	
			{/* Data Loaded and Available */}
			{appDataFetched && appData.length > 0 && (
				<div className={bgMain}>
					{appData.map((el: any, idx: number) => (
						<div key={el.about}>
							<Particles className="absolute inset-0 -z-10 animate-fade-in py-2 mt-14" quantity={200} />
							<section className="w-full flex justify-center py-2 md:py-2 lg:py-3 xl:py-4">
								<SectionDivContainer>
									<ContainerGrid>
										{/* Even Index: Text First, Image Second */}
										{idx % 2 === 0 && (
											<>
												<ContainerGridText aboutDetails={el} />
												<ContentGridImage src={el.url} alt={el.aboutHeading} />
											</>
										)}
	
										{/* Odd Index: Image First, Text Second */}
										{idx % 2 !== 0 && (
											<>
												<ContentGridImage src={el.url} alt={el.aboutHeading} />
												<ContainerGridText aboutDetails={el} />
											</>
										)}
									</ContainerGrid>
								</SectionDivContainer>
							</section>
							<div className="border-t border-gray-300 mx-10"></div>
						</div>
					))}
				</div>
			)}
	
			{/* No Data Found */}
			{!isLoading && appDataFetched && appData.length === 0 && (
				<div className="flex flex-col items-center justify-center w-screen min-h-[100svh] overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
					<p>No data found.</p>
				</div>
			)}
	
			<Footer />
		</div>
	);
}