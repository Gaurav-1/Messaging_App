    import { io } from "socket.io-client"

    const path = import.meta.env.VITE_PATH

    export const socket = io(path)