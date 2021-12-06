import {FC} from "react";
import './MarkersList.scss';
import {nanoid} from "@reduxjs/toolkit";

const MarkersList: FC<{ markersIntoView: google.maps.Marker[] | null | undefined}> = ({ markersIntoView }) => {

    return(
        <div className='markers-list'>
            {
                markersIntoView?.map((marker) => {
                    const label = marker?.getLabel();
                    if (label !== undefined) return <Item key={nanoid()} name={label}/>;
                })
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