import classesProductList from "@/css/product-list.module.css";
import Image from 'next/image';

type TImageModel = {
    isOpen:boolean;
    image: string;
    onClose: () => void
}

const ImageModal = ({ isOpen, image, onClose }:TImageModel) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-black p-4 flex flex-col items-center border-slate-600 rounded-lg border-2 image-modal ${classesProductList["image-modal"]}`}>
                <Image alt="Selected" src={image} width={550} height={50} className="rounded-lg" />
                <div className="ml-0 flex w-full justify-end">
                    <button onClick={onClose} className="mt-4 text-cyan-600 bg-transparent p-2 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;