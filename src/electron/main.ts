import {BrowserWindow, app} from 'electron';
import path from 'path';
import isDev from '../../util.js'


app.disableHardwareAcceleration();
app.on("ready", ()=>{
    
    const mainWindow= new BrowserWindow({})

    if(true){
        console.log("*****************************************")
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(),"/dist-react/index.html"))
    }

})