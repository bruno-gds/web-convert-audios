!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.FFmpegWASM=t():e.FFmpegWASM=t()}(self,(()=>(()=>{var e={454:e=>{function t(e){return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}t.keys=()=>[],t.resolve=t,t.id=454,e.exports=t}},t={};function r(a){var s=t[a];if(void 0!==s)return s.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}return r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e;!function(e){e.LOAD="LOAD",e.EXEC="EXEC",e.WRITE_FILE="WRITE_FILE",e.READ_FILE="READ_FILE",e.DELETE_FILE="DELETE_FILE",e.RENAME="RENAME",e.CREATE_DIR="CREATE_DIR",e.LIST_DIR="LIST_DIR",e.DELETE_DIR="DELETE_DIR",e.ERROR="ERROR",e.DOWNLOAD="DOWNLOAD",e.PROGRESS="PROGRESS",e.LOG="LOG"}(e||(e={}));const t=new Error("unknown message type"),a=new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first"),s=(new Error("called FFmpeg.terminate()"),new Error("failed to import ffmpeg-core.js"));let o;self.onmessage=async({data:{id:E,type:n,data:i}})=>{const c=[];let p;try{if(n!==e.LOAD&&!o)throw a;switch(n){case e.LOAD:p=await(async({coreURL:t="https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd/ffmpeg-core.js",wasmURL:a,workerURL:E})=>{const n=!o,i=t,c=a||t.replace(/.js$/g,".wasm"),p=E||t.replace(/.js$/g,".worker.js");try{importScripts(i)}catch{if(self.createFFmpegCore=(await r(454)(i)).default,!self.createFFmpegCore)throw s}return o=await self.createFFmpegCore({mainScriptUrlOrBlob:i,locateFile:(e,t)=>e.endsWith(".wasm")?c:e.endsWith(".worker.js")?p:t+e}),o.setLogger((t=>self.postMessage({type:e.LOG,data:t}))),o.setProgress((t=>self.postMessage({type:e.PROGRESS,data:t}))),n})(i);break;case e.EXEC:p=(({args:e,timeout:t=-1})=>{o.setTimeout(t),o.exec(...e);const r=o.ret;return o.reset(),r})(i);break;case e.WRITE_FILE:p=(({path:e,data:t})=>(o.FS.writeFile(e,t),!0))(i);break;case e.READ_FILE:p=(({path:e,encoding:t})=>o.FS.readFile(e,{encoding:t}))(i);break;case e.DELETE_FILE:p=(({path:e})=>(o.FS.unlink(e),!0))(i);break;case e.RENAME:p=(({oldPath:e,newPath:t})=>(o.FS.rename(e,t),!0))(i);break;case e.CREATE_DIR:p=(({path:e})=>(o.FS.mkdir(e),!0))(i);break;case e.LIST_DIR:p=(({path:e})=>{const t=o.FS.readdir(e),r=[];for(const a of t){const t=o.FS.stat(`${e}/${a}`),s=o.FS.isDir(t.mode);r.push({name:a,isDir:s})}return r})(i);break;case e.DELETE_DIR:p=(({path:e})=>(o.FS.rmdir(e),!0))(i);break;default:throw t}}catch(t){return void self.postMessage({id:E,type:e.ERROR,data:t})}p instanceof Uint8Array&&c.push(p.buffer),self.postMessage({id:E,type:n,data:p},c)}})(),{}})()));
//# sourceMappingURL=814.ffmpeg.js.map