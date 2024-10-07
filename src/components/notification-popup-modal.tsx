
type Props = {
    isOpen:boolean;
    from: string;
    onClose: ()=>void;
    modalData: Record<string, string>;
}
const NotificationPopUp = ({ isOpen, from, onClose, modalData }:Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
            <div className="bg-black p-4 flex flex-col items-center border-slate-600 rounded-lg border-2">
                <div className="border-b-2">
                    Request Data
                </div>
                <div className="flex flex-col align-middle justify-start items-start text-gray-300 mt-4">
                    <div className="p-0.5" >Name: {modalData.name}</div>
                    <div className="p-0.5">Email: {modalData.email}</div>
                    <div className="p-0.5">Message: {modalData.req}</div>
                    <div className="p-2 border mt-4 mx-4 border-1">{modalData.msg} !</div>
                </div>
                <div>
                    {from}
                </div>
                <div className="ml-0 flex w-full justify-end">
                    <button onClick={onClose} className="mt-4 text-cyan-600 bg-transparent p-2 rounded">Close</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationPopUp;