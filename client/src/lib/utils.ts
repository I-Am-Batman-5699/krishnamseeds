import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAlertMessage = (type: string, second: any): string => {
  switch (type.toLowerCase()) {
      case "price":
          return "Price can communicated by sending an email to the organization";
      case "notify":
          return `Please wite an email to the organization when product: ${second} is available`;
      case "wishlist":
          return "The feature is not available as of now";
      case "purchase":
          return `Please place your order through contact us page for the item: ${second}`;
      default:
          return "";
  }
};