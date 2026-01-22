/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react";

export const AppContext = createContext();


const AppContextProvider = (props)=>{

    const calculateAge = (dob) => {
  if (!dob || dob === "Not Selected") return "-";

  const birthDate = new Date(dob);

  if (isNaN(birthDate.getTime())) return "-";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 0) return 0;

  return age;
};



    const value = {
        calculateAge
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider