import {FC} from "react";
import './MarkersList.scss';
import {nanoid} from "@reduxjs/toolkit";
import {MapMarker} from "../../../store/map.slice";

const MarkersList: FC<{ markersIntoView: MapMarker[] | null | undefined}> = ({ markersIntoView }) => {
    return(
        <div className='markers-list' style={markersIntoView && markersIntoView.length ? { height: `${markersIntoView.length * 25}px`} : { height: '25px'}}>
            {
                markersIntoView?.map((marker) => marker.label && <Item key={nanoid()} name={marker.label}/>)
            }
        </div>
    )
}

const Item: FC<{ name: google.maps.MarkerLabel | string | null }> = ({ name }) => {
    return(
        <p className='markers-list__item'>
            { name }
        </p>
    )
}

export default MarkersList;