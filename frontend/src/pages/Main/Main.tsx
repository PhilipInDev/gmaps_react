import {FC, useEffect} from "react";
import './Main.scss';
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "../../components/Map/Map";
import Marker from "../../components/Marker/Marker";
import {nanoid} from "@reduxjs/toolkit";
import {ENV} from "../../common/enums/env.enum";
import {useTypedDispatch, useTypedSelector} from "../../helpers/hooks";
import {getCapitals} from "../../store/map.slice";
import {CapitalInterface} from "../../common/interfaces/capital.interface";

const Main: FC = () => {
    const dispatch = useTypedDispatch();
    const capitals: CapitalInterface[] | [] = useTypedSelector(state => state.map.capitals);

    useEffect(() => {
        dispatch(getCapitals());
    }, [dispatch])

    return(
        <Wrapper apiKey={ENV.GMAPS_API_KEY}>
            <div className="main-page">
                <Map>
                    {
                        capitals
                            ?
                        capitals.map(({ capital, ltd, lng}) => <Marker key={nanoid()} label={capital} position={{lng: +lng, lat: +ltd}}/>)
                            :
                            null
                    }
                </Map>
            </div>
        </Wrapper>
    )
}

export default Main;