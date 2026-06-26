import { createContext, useEffect, useRef } from "react";

const SocketContext = createContext(null);

export function SocketProvider ({children}){
    const wsRef = useRef(new WebSocket('ws://localhost:3000'));
    useEffect(() => {
      
      return () => {
        wsRef.current.close();
      }
    }, [])
    

    return (
        <SocketContext.Provider value={wsRef}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;
