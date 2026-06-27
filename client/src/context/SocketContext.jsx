import { createContext, useEffect, useRef } from "react";

const SocketContext = createContext(null);

export function SocketProvider ({children}){
    console.log('SocketProvider rendered');
    const wsRef = useRef(new WebSocket('ws://localhost:3000'));
    const listeners = useRef([]);

    useEffect(() => {

      wsRef.current.onmessage = function (e){
        const message = JSON.parse(e.data);

        listeners.current.forEach((listener) => {
            listener(message);
        })
      }
      
      return () => {
        wsRef.current.close();
      }
    }, [])

    function addListener(fn) {
      listeners.current.push(fn)
    }

    function removeListener(fn){
      listeners.current.splice(listeners.current.indexOf(fn), 1);
    }
    

    return (
        <SocketContext.Provider value={{wsRef, addListener, removeListener}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;
