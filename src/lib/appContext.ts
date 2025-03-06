import ApiService from "./apiService";
import { RootMainAppDataRes } from "./types";


const getAppContext = async () => {
    try{
        const response: RootMainAppDataRes = await ApiService.get<RootMainAppDataRes>("/api/data/appData");
        return response.data;
    }
    catch(err:any){
        throw err;
    }
}

export default getAppContext;