import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Products } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getAlertMessage = (type: string, product: any, model: Products): string => {
    let popupMessage = type.toLowerCase() + "Popup";
    if (!Object.prototype.hasOwnProperty.call(model, popupMessage)) {
        popupMessage = "somethingPopup";
    }
    return (model[popupMessage as keyof Products] as string).replace(/{product}/g, product);
};

export const getVersion =  (): string => {
   return process.env.NEXT_PUBLIC_VERSION || "XX:XX:XX";
};
