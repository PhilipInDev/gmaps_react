import { FC } from "react";
import './Main.scss';
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "../../components/Map/Map";
import {capitalsLtdLng} from "../../mocked_data/capitals-ltd-lng";
import Marker from "../../components/Marker/Marker";
import {nanoid} from "@reduxjs/toolkit";

const Main: FC = () => {
    return(
        <Wrapper apiKey={'AIzaSyA1Ur3pM3ijbTxIUShujQedsYUL1qoSaE0'}>
            <div className="main-page">
                <Map>
                    {
                        capitalsLtdLng.map(({ capital, ltd, lng}) => <Marker key={nanoid()} label={capital} position={{lng: +lng, lat: +ltd}}/>)
                    }
                </Map>
            </div>
        </Wrapper>
    )
}

export default Main;