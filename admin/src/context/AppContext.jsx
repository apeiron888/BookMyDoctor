import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency = 'Rs.';

    const calculateAge = (dob) => {
        const today = new Date();
        const birthData = new Date(dob);
        let age = today.getFullYear() - birthData.getFullYear();
        return age;
    };

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormatter = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const value = {
        calculateAge,
        slotDateFormatter,
        currency,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;