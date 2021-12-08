import {Children, cloneElement, FC, isValidElement, useEffect, useRef, useState} from "react";
import './Map.scss';
import MarkersList from "./MarkersList/MarkersList";
import {useTypedSelector} from "../../helpers/hooks";
import {MapMarker} from "../../store/map.slice";
import {mapConfig} from "./map.config";

interface MapProps extends google.maps.MapOptions {
    onDragEnd?: (e: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void;

}

const getMarkersIntoView = (map: google.maps.Map, markers: MapMarker[]): MapMarker[] | null=> {
    const bounds = map.getBounds();
    const markersIntoView = markers.filter((marker) =>
        marker.position
        && bounds?.contains(new google.maps.LatLng(marker.position))
        && marker);

    // @ts-ignore
    return markersIntoView && markersIntoView.length ? markersIntoView : [];
}

const Map: FC<MapProps> = ({ onDragEnd, onIdle, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const markers = useTypedSelector(state => state.map.markers);
    const [markersIntoView, setMarkersIntoView] = useState<MapMarker[] | null>(null)

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, mapConfig));
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
    }, [map, markers, onDragEnd, onIdle]);

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