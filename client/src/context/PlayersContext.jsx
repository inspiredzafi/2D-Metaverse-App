import React, { createContext, useRef, useState } from 'react'


export const PlayersContext = createContext(null);

export function PlayerProvider({children}){
    const playersInSpace = useRef({});
    const [playersList, setPlayersList] = useState([{name: localStorage.getItem('name'), id: localStorage.getItem('color')}]);



    return (
        <PlayersContext.Provider value={{playersInSpace, playersList, setPlayersList}}>
            {children}
        </PlayersContext.Provider>
    )
}

export default PlayersContext