const Email = (e:any) => {
    return {
        serviceId: process.env.NEXT_PUBLIC_SERVICEID,
        templateId: process.env.NEXT_PUBLIC_TEMPLATEID,
        publicKey: process.env.NEXT_PUBLIC_PUBLICKEY
    }
}
    
export default Email;