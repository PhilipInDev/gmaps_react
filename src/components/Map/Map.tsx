import {Children, cloneElement, FC, isValidElement, useEffect, useRef, useState} from "react";
import './Map.scss';
import MarkersList from "./MarkersList/MarkersList";
import {useTypedSelector} from "../../helpers/hooks";

interface MapProps extends google.maps.MapOptions {
    onDragEnd?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void;

}

const getMarkersIntoView = (map: google.maps.Map, markers: google.maps.Marker[]): google.maps.Marker[] | null=> {
    const bounds = map.getBounds();
    const markersIntoView = markers.map(marker => {
        const position = marker.getPosition();
        if (position !== null && position !== undefined && bounds?.contains(position)) return marker;
    });

    // @ts-ignore
    return markersIntoView && markersIntoView.length ? markersIntoView : null;
}

const Map: FC<MapProps> = ({ onDragEnd, onIdle, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [markersIntoView, setMarkersIntoView] = useState<google.maps.Marker[] | null>()
    const markers = useTypedSelector(state => state.map.markers);

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: {
                    lat: 49.54,
                    lng: 24.19
                },
                zoom: 5,
            }));
        }
    }, [ref, map]);

    useEffect(() => {
        if (map) {
            ["dragend", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            map.addListener("dragend", onDragEnd || (() => setMarkersIntoView(getMarkersIntoView(map, markers))));
            map.addListener("idle", onIdle || (() => setMarkersIntoView(getMarkersIntoView(map, markers))));
        }
    }, [map, onDragEnd, onIdle]);

    return(
        <>
            <div id="map-canvas" ref={ref} />
            {
                Children.map(children, (child) => {
                    if (isValidElement(child)) {
                        return cloneElement(child, { map });
                    }
                })
            }
            { map && <MarkersList markersIntoView={markersIntoView} /> }
        </>
    )
}

export default Map;