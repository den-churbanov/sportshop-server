import React, {useState} from "react";
import {useAlert} from './AlertContext'

function Alert({addCallback}) {

    const {visible, onCancel, item, itemSample, theaders, setAlert, formType} = useAlert();
    if (!visible) return null;

    const getPropNames = (item) => {
        let propNames = [];
        for (let key in item) {
            propNames.push(key);
        }
        return propNames;
    }

    let propNames = formType == "Add" ? getPropNames(itemSample): getPropNames(item);

    let thead = theaders.slice(2, theaders.length);
    propNames = propNames.slice(2, propNames.length);

    const handleUserInputOnEdit = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        item[name] = value;
        setAlert(prevState => {
            return {
                ...prevState,
                item
            }
        });
    }

    const handleUserInputOnAdd = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        itemSample[name] = value;
        setAlert(prevState => {
            return {
                ...prevState,
                itemSample
            }
        });
    }

    console.log("render Alert");
    return (
        <div className="modal modal-visible">
            <form className="modal-content">
                <h1>Введите данные</h1>
                {propNames.map((propName, idx) => {
                    return formType == "Add" ? (
                        <input key={idx}
                               type="text"
                               name={propName}
                               placeholder={thead[idx]}
                               value={itemSample[propName]}
                               onChange={handleUserInputOnAdd}/>
                    ) : (
                        <input key={idx}
                               type="text"
                               name={propName}
                               placeholder={thead[idx]}
                               value={item[propName]}
                               onChange={handleUserInputOnEdit}/>
                    );
                })}
                {formType == "Add" ? (
                    <React.Fragment>
                        <a id="mod-number-ok" onClick={()=>{
                            addCallback(itemSample);
                            onCancel();
                        }}>ОК</a>
                        <a id="delete-button" onClick={onCancel}>Отмена</a>
                    </React.Fragment>
                ) : (
                    <a id="mod-number-ok" onClick={onCancel}>Готово</a>
                )}
            </form>
        </div>
    );
}

export default Alert;