const POLLING_INTERVAL= 500
import osUtils from "os-utils"
import fs from 'fs'
import os from 'os'

export function pollResources(){
    setInterval(async() => {
        const cpuUsage= await getCpuUsage(); 
        const ramUsage= getRamUsage(); 
        const storageData= getStorageData()
        const staticInfo= getStaticData()

        console.log({cpuUsage, ramUsage, storageData, staticInfo})
    } , POLLING_INTERVAL); 
}

export function getStaticData(){
    const getTotal = getStorageData().total; 
    const cpu = os.cpus()[0].model
    const totalMem= Math.floor(osUtils.totalmem()/1024)
    return {
        getTotal, cpu, totalMem
    }
}

function getCpuUsage(){
    return new Promise((resolve)=>{
        osUtils.cpuUsage(resolve)
    })
}

function getRamUsage(){
    return 1 - osUtils.freememPercentage()
}

function getStorageData(){
    // require node 18 at least 
    const stats= fs.statfsSync(process.platform === 'win32' ? 'C://' : '/')
    const total= stats.bsize  * stats.blocks
    const free= stats.bsize * stats.bfree

    return {
        total: Math.floor(total/1_000_000_000), 
        usage: 1- free/total
    }
}