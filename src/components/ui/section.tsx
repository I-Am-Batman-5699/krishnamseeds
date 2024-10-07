import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

const SectionDivContainer = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("container px-4 md:px-6", className)}
        {...props}
    />
))
SectionDivContainer.displayName = "SectionDivContainer";

const ContainerGrid = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]", className)}
        {...props}
    />
))
ContainerGrid.displayName = "ContainerGrid";

const ContainerGridText = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        aboutDetails: any
    }
>(({ className, aboutDetails, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col justify-center space-y-4", className)}
        {...props}
    >
        <div className={cn("space-y-2", className)}>
            <h1 className="text-l font-bold tracking-tighter sm:text-4xl xl:text-4xl/none">{aboutDetails.about}</h1>
            <h2 className="text-m font-bold tracking-tighter sm:text-2xl xl:text-2xl/none">{aboutDetails.aboutHeading}</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">&quot;{aboutDetails.description}&quot;</p>
        </div>
    </div>
))
ContainerGridText.displayName = "ContainerGridText";

const ContentGridImage = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { src: string; alt: string }
>(({ className, src, alt, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("", className)}
        {...props}
    >
        <Image
            alt={alt}
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last bg-black"
            height={400}
            src={src}
            width={400}
        />
    </div>
));
ContentGridImage.displayName = "ContentGridImage";

export { ContainerGrid, ContainerGridText, ContentGridImage, SectionDivContainer };

