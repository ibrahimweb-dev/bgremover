import { useAuth } from "@clerk/clerk-react";
import { createContext, useState} from "react";
import axios from 'axios'
import { toast } from "sonner";
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit, setCredit] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { getToken} = useAuth();
     const loadCredit = async () => {
       try {
        const token = await getToken();
          const {data} = await axios.get(backendUrl + '/api/credit', {headers:{token}})                                                                                                      
          if(data.success){
            setCredit(data.credits)
            console.log(data.credit);
            
          }
       } catch (error) {
        console.log(error)
        toast.error(error.message)
       } 
    }

    const value = {
        credit,setCredit,
        loadCredit,backendUrl
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    
}

export default AppContextProvider