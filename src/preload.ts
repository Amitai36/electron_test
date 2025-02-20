// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from "electron"



contextBridge.exposeInMainWorld("colors", {
    changeMainBackgroundColor:(color:string)=>ipcRenderer.send("change-bgcolor-main", color),
    changeSecondBackgroundColor:(color:string)=>ipcRenderer.send("change-bgcolor-sec", color)
})
contextBridge.exposeInMainWorld("size", {
    changeMainSize:(size:number)=>ipcRenderer.send("change-size-main", size),
    changeSecondSize:(size:number)=>ipcRenderer.send("change-size-sec", size)
})