import {FC, useEffect, useState} from "react";
import {addMarker, MapMarker} from "../../store/map.slice";
import {useTypedDispatch} from "../../helpers/hooks";


const Marker: FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (!marker) {
            const marker = new google.maps.Marker();
            setMarker(marker);
        }

        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);

            const position = marker && marker.getPosition();
            const coords = position ? { lat: position?.lat(), lng: position?.lng() } : undefined;
            const stateMarker = {
                label: marker.getLabel(),
                position: coords
            } as MapMarker;

            dispatch(addMarker(stateMarker));
        }
    }, [dispatch, marker, options]);

    return null;
};

export default Marker;