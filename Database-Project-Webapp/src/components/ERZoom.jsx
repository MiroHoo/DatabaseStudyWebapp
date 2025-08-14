import { useEffect, useRef } from "react";
import OpenSeadragon from "openseadragon";

export default function ZoomableImage() {
    const zoomref = useRef()

    useEffect(()=>{
        const Zoom = OpenSeadragon({
             id: "openseadragon-viewer",
             prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.1.0/images/",
             tileSources: {
                type: "image",
                url: "/Images/ErModel.png",
             },
             gestureSettingsTouch: {
                 pinchToZoom: true,
                 flickEnabled: true,
             },
            showZoomControl: true, 
            maxZoomPixelRatio: 2
        })
    return () => Zoom.destroy();
    })
    return <div 
    id="openseadragon-viewer"
    ref={zoomref}
    style={{
        width: "80%",
        height: "60vh",
    }}>

    </div>

}