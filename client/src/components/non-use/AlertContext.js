import React, {useContext, useState} from "react";

const AlertContext = React.createContext();

const useAlert = () => {
    return useContext(AlertContext);
};

export default function AlertProvider({children}) {
    const onEdit = (item, theaders) => {
        setAlert(prevState => {
            return {
                ...prevState,
                visible: true,
                item,
                theaders,
                formType: "Edit"
            }
        });
    }

    const onAdd = (itemSample, theaders) => {
        console.log("добавить");
        itemSample = Object.assign({}, itemSample);
        setAlert(prevState => {
            return {
                ...prevState,
                visible: true,
                itemSample,
                theaders,
                formType: "Add"
            }
        });
    }

    const onCancel = () => {
        console.log("Отменить");
        setAlert(prevState => {
            return {
                ...prevState,
                visible: false,
            }
        });
    }

    const [alert, setAlert] = useState({
        visible: false,
        onEdit,
        onAdd,
        onCancel,
        item: null
    });

    return (
        <AlertContext.Provider value={{...alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    );
}

export {useAlert};