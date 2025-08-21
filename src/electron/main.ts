import {BrowserWindow, app} from 'electron';
import path from 'path';
import isDev from '../../util.js'
import { pollResources } from './resourceManager.js';


app.disableHardwareAcceleration();
app.on("ready", ()=>{
    
    const mainWindow= new BrowserWindow({})

    if(isDev()){
        console.log("*****************************************")
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(),"/dist-react/index.html"))
    }

    pollResources()

})