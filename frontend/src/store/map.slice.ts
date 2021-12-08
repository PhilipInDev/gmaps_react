import { AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import isEqual from 'lodash.isequal';
import { CapitalInterface } from "../common/interfaces/capital.interface";
import { MapApi } from "../api/map.api";
import { RootState } from "./store";

const mapApi = new MapApi();

export interface MapMarker {
    label: google.maps.MarkerLabel;
    position: google.maps.LatLngLiteral;
}

export interface MapState {
    markers: MapMarker[],
    capitals: CapitalInterface[] | [],
    error: any
}

const initialState: MapState = {
    markers: [],
    capitals: [],
    error: null,
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        addCapitals: (state, action: PayloadAction<CapitalInterface[]>) => {
          state.capitals = action.payload;
        },
        removeCapitals: (state) => {
          state.capitals = [];
        },
        addMarker: (state, action: PayloadAction<MapMarker>) => {
            const toDeepCompression = state.markers.find(marker => marker.label === action.payload.label);
            if (toDeepCompression && !isEqual(toDeepCompression, action.payload)) state.markers.push(action.payload);
            if (!toDeepCompression) state.markers.push(action.payload);
        },
        removeMarkers: (state) => {
            state.markers = [];
        },
        setError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        }
    }
})

export const getCapitals = (): ThunkAction<void, RootState, unknown, AnyAction> => async(dispatch) => {
    try {
        const res = await mapApi.getAllCapitals();
        const capitals = res.data.capitals.map((item: { capital: string; location: { coordinates: number[]; }; }) => ({
            capital: item.capital,
            lng: item.location.coordinates[0],
            ltd: item.location.coordinates[1]
        }) )
        dispatch(addCapitals(capitals));
    } catch (e) {
        dispatch(setError(e));
    }
}

export const { addMarker, removeMarkers, addCapitals, removeCapitals, setError } = mapSlice.actions;

export const mapReducer = mapSlice.reducer;