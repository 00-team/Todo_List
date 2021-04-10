import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MdDelete, MdClear, MdSave } from 'react-icons/md';

const Button = ({ name, iconName, onClick }) => {
    var icon = null;
    if (iconName === "delete") {
        icon = <MdDelete size={20} />;
    } else if (iconName === "save") {
        icon = <MdSave size={20} />;
    } else if (iconName === "clear") {
        icon = <MdClear size={20} />;
    }

    return (
        <button style={name === "Clear" ? {color: "#E20338", borderColor: "#E20338"} : {}} onClick={onClick}>
            {name}
            {icon}
        </button>
    )
}


Button.defaultProps = {
    name: "",
    iconName: "",
}

export default Button
