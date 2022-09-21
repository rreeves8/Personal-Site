import React, { useMemo } from "react";
import  Unity, { UnityContext } from "react-unity-webgl";

export default function Asteriods() {
 
    const unityContext = new UnityContext({
        loaderUrl: "Build/asteriods.loader.js",
        dataUrl: "Build/asteriods.data",
        frameworkUrl: "Build/asteriods.framework.js",
        codeUrl: "Build/asteriods.wasm",
        webglContextAttributes:{
            preserveDrawingBuffer: true
        }
    });

    useMemo(() => {
        const resolver = (event: Event) => {
            console.log('got close unity')
            event.stopPropagation()

            window.removeEventListener('close-unity', resolver)

            unityContext.removeAllEventListeners();
            unityContext.quitUnityInstance().then(() => {
                window.dispatchEvent(new CustomEvent('unity-closed'))
            }).catch(error => {
                window.dispatchEvent(new CustomEvent('unity-closed'))
            })
        }
        window.addEventListener('close-unity', resolver)
    }, [])

    
    return <Unity unityContext={unityContext} style={{ width: '100%', height: '100%' }} />;
}