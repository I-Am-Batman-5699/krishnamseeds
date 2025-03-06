import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { version } from "../../package.json";
import { Products } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getAlertMessage = (type: string, product: any, model: Products): string => {
    let popupMessage = type.toLowerCase() + "Popup";
    if(!model.hasOwnProperty(popupMessage)){
        popupMessage = "something" +"Popup";
    }
    return (model[popupMessage as keyof Products] as string).replaceAll("{product}", product);
};

export const getVersion = ():string => {
    return version || "XX:XX:XX"
}