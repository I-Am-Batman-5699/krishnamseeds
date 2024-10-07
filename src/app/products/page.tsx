"use client"
import productList from "@/app/products/product-list.json";
import Footer from "@/components/footer";
import ImageModal from "@/components/image-modal";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardFooterContent, CardHeader, CardLi, CardSubtitle, CardTitle, CardUl } from "@/components/ui/card";
import classes from "@/css/loading.module.css";
import classesProductList from "@/css/product-list.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export interface AppProducts {
	products: Products
}

export interface Products {
	productsAvailable: string
	productsDescription: string
	productsList: ProductsList[]
}

export interface ProductsList {
	id: string
	name: string
	descriptionList: string[]
	images: Image[]
	price: any
	quantity: any
	available: boolean
	type: string
}

export interface Image {
	image: string
}

type TAppDataImages = Record<string, Record<string,string>[]>

export default function Page() {

	const [appData, setAppData] = useState<Products|null>(null);
	const [appDataFetched, setAppDataFetched] = useState(false);
	const [appDataImages, setAppDataImages] = useState<TAppDataImages>({});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedImage(null);
	};

	const handleNext = (id: string, idx: number) => {
		setAppDataImages(prevState => {
			const newState = { ...prevState };
			const count = newState[id].length;
			let next = 0;
			if (idx < count - 1) {
				next = idx + 1;
			}
			newState[id][next].style = 'flex';
			newState[id][idx].style = 'hidden';
			return newState;
		});
	};

	const getContent = async () => {
		try {
			return productList;
		} catch (error) {
			console.error('Error in getContent:', error);
			throw error;
		}
	};

	const _setImageProperties = (data:ProductsList[]) => {
		let imagesProperties:Record<string, Record<string,string>[]> = {};
		data.forEach((el) => {
			imagesProperties[el.id] = [];
			el.images.forEach(() => {
				imagesProperties[el.id].push({
					style: "hidden"
				})
			});
			imagesProperties[el.id][0].style = "flex"
		});
		setAppDataImages(imagesProperties);
	}

	const fetchData = async () => {
		if (appData && Object.keys(appData).length === 0 && !appDataFetched) {
			const oData:AppProducts = await getContent();
			oData?.products && setAppData(oData.products);
			setAppDataFetched(true);
			_setImageProperties(oData.products.productsList)
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const FaCaretRightClass = {
		"display": "inline",
		"backgroundColor": "Transparent"
	}

	const bg = "bg-slate-800";

	const properties = {
		duration: 5000,
		autoplay: false,
		transitionDuration: 500,
		arrows: true,
		infinite: true,
		easing: "ease",
		indicators: (i: any) => <div className="indicator">{i + 1}</div>
	};

	return (
		<div>
			<Navbar classNameProp={bg} />
			<section className="w-full min-h-[calc(100svh-121px)] flex justify-center py-6 md:py-16 lg:py-16 bg-gray-100 dark:bg-gray-800" id="products">
				<div className="container px-4 md:px-4">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								{appData?.productsAvailable}
							</h2>
							<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								{appData?.productsDescription}
							</p>
						</div>
					</div>
					{!appDataFetched && (
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
					)}
					{appDataFetched && appData && Object.keys(appData).length === 0 && (
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
							<p>Products not update. Please contact the owner from about page.</p>
						</div>
					)}
					{appDataFetched && appData && Object.keys(appData).length > 0 &&
						(<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
							{appData?.productsList?.map((el) => {
								return (
									<Card key={el.id}>
										{
											appDataImages && el.images.map((element, idx: number) => {
												return (
													<div key={element.image} className={`grid ${appDataImages[el.id][idx].style}`}>
														<div className={`mx-auto aspect-video h-80 w-60 overflow-hidden rounded-xl object-cover object-top sm:w-full`}>
															<Image
																alt={el.name}
																height="400"
																src={element.image}
																width="500"
																onClick={() => handleImageClick(element.image)}
															/>
														</div>
														<div className="flex justify-end mt-2">
															<button title="Switch Images" onClick={() => handleNext(el.id, idx)} className="next-button">
																<FaCaretRight className={idx === 0 ? 'flex' : 'hidden'} />
																<FaCaretLeft className={idx !== 0 ? 'flex' : 'hidden'} />
															</button>
														</div>
													</div>
												)
											})
										}
										<ImageModal isOpen={isModalOpen} image={selectedImage || ""} onClose={closeModal} />
										<CardHeader>
											<CardTitle>{el.name}</CardTitle>
											<CardSubtitle>{el.id}</CardSubtitle>
										</CardHeader>
										<CardContent>
											<CardDescription>
												<CardUl>
													{el?.descriptionList?.map((element: any) => {
														return (<CardLi key={element}><FaCaretRight style={FaCaretRightClass} /> {element}</CardLi>)
													})}
												</CardUl>
											</CardDescription>
										</CardContent>
										<CardFooter>
											<CardFooterContent>
												{
													el.id.length > 0 &&
													<button className={classesProductList.but}>
														<div className={classesProductList.sign}>
															<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" className={classesProductList.bell}><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path></svg>
														</div>
														<div className={classesProductList.text}>Add to List</div>
														<div className={classesProductList.arrow}>›</div>
													</button>
												}
												{
													!el.available &&
													<button className={classesProductList.button}>
														<div className={classesProductList.sign}>
															<svg className={classesProductList.bell} height="1em" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
														</div>
														<div className={classesProductList.text}>Notify</div>
														<div className={classesProductList.arrow}>›</div>
													</button>
												}
												{
													el.available &&
													<button className={classesProductList.but} disabled={el.price === null}>
														<div className={classesProductList.sign}>
															<svg viewBox="0 0 16 16" className={classesProductList.bell} height="1em" width="24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
																<path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
																<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
															</svg>
														</div>
														<div className={classesProductList.text}>Purchase</div>
														<div className={classesProductList.arrow}>›</div>
													</button>
												}
											</CardFooterContent>
										</CardFooter>
									</Card>
								)
							})}
						</div>)
					}
				</div>
			</section>
			<Footer />
		</div>
	);
}
