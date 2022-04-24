import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const s1 = {
        name: "Tanvir",
        class: "B.Tech"
    };

    const [state, setState] = useState(s1);

    const updateData = () => {
        setTimeout(() => {
            setState({
                name: "Taukir",
                class: "BE"
            });
        }, 2000);
        
    }

    return (
        <NoteContext.Provider value={{state, updateData}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;