export interface About {
	aboutDetails: AboutDetail[]
	story: Story
}

export interface AboutDetail {
	about: string
	aboutHeading: string
	description: string
	url: string
	links?: Link[]
}

export interface Link {
	platform: string
	url: string
}

export interface Story {
	intro: Intro
	motivation: Motivation
}

export interface Intro {
	title: string
	content: string
	subtitle: string
}

export interface Motivation {
	title: string
	subtitle: string
	content: string
	statements: Statement[]
}

export interface Statement {
	title: string
	text: string
}

export interface AppContext {
	appData: AppContextData
}
export interface AppContextData {
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
	version: string
}

export interface AboutContact {
    contact: ContactInfo[]
    platforms: Platforms
}

export interface ContactInfo {
    role: string
    name: string
    links: ContactLink[]
    phone: string
    email: string
}

export interface ContactLink {
    platform: TPlatform
    link: string
}

type TPlatform = keyof Platforms;

export interface Platforms {
    instagram: string
    linkedin: string
    x: string
    email: string
    threads: string
    facebook: string
}

/* Products */
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
    crop: string
    "crop-description": string
    descriptionList: string[]
    images: Image[]
    price: any
    quantity: any
    available: boolean
    type: string
    "variety-type": string
}

export interface Image {
    image: string
}


