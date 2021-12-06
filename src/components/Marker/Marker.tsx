import {FC, useEffect, useState} from "react";
import {addMarker} from "../../store/map.slice";
import {useTypedDispatch} from "../../helpers/hooks";

const Marker: FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!marker) {
            const marker = new google.maps.Marker();
            setMarker(marker);
            dispatch(addMarker(marker))
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
        }
    }, [marker, options]);

    return null;
};

export default Marker;