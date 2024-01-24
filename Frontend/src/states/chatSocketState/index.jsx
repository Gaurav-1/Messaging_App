import { createContext } from "react";
import { socket } from "../../socket";

// import { io } from "socket.io-client"

// const path = "http:localhost:3000"
// // import.meta.env.VITE_PATH

// const socket = io(path,{autoConnect: false})

export const SocketContext = createContext();

export const SocketState = (props) => {

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
};
