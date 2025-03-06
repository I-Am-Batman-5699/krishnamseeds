/* main page */
export interface RootMainAppData {
    appData: MainAppData
}
export interface RootMainAppDataRes {
    data: RootMainAppData
}

export interface MainAppData {
    appName?: string
    appDescription?: string
    siteName?: string
    keywords?: string[]
    slogan?: string
    pages?: string[]
    sideNav?: string[]
    url?: string
    logo?: string
    copy?: string
    address?: string
    mobile?: string
    email?: string
    instagram?: string
}

/* Products */
export interface ProductDataResponse {
    data: ProductDataRes
}

export interface ProductDataRes {
    data: { products: Products }
    status: string
    message: string
}

export interface Products {
    productsAvailable: string
    productsDescription: string
    productsList: ProductsList[]
    somethingPopup: string
    pricePopup: string
    notifyPopup: string
    wishlistPopup: string
    purchasePopup: string
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

/* about page */
export interface AboutDataResponse {
    data: aboutDataRes
}

export interface aboutDataRes {
    data: aboutData
    status: string
    message: string
}

export interface aboutData {
    aboutDetails: AboutDetail[]
}

export interface AboutDetail {
    about: string
    aboutHeading: string
    description: string
    url: string
    links?: URlLink[]
}

export interface URlLink {
    platform: string
    url: string
}

/* contact */

export interface ContactDataResponse {
    data: ContactDataRes
}

export interface ContactDataRes {
    data: AboutContact
    status: string
    message: string
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

export interface Platforms {
    instagram: string
    linkedin: string
    x: string
    email: string
    threads: string
    facebook: string
}

type TPlatform = keyof Platforms;