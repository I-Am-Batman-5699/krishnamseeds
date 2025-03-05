const RequestHeader = (e:any) => {
    return {
        environment: process.env.NEXT_PUBLIC_ENV,
        prod: process.env.NEXT_PUBLIC_SERVER_PROD,
        dev: process.env.NEXT_PUBLIC_SERVER_DEV,
        key: process.env.NEXT_PUBLIC_API_KEY
    }
}
    
export default RequestHeader;