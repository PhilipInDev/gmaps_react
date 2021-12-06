import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import isEqual from 'lodash.isequal';

interface MapState {
    markers: google.maps.Marker[]
}
const initialState: MapState = {
    markers: []
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        addMarker: (state, action: PayloadAction<google.maps.Marker>) => {
            const toDeepCompression = state.markers.find(marker => marker.getLabel() === action.payload.getLabel());
            if (toDeepCompression && !isEqual(toDeepCompression, action.payload)) state.markers.push(action.payload);
            else state.markers.push(action.payload);
        },
        removeMarkers: (state) => {
            state.markers = [];
        }
    }
})

export const { addMarker, removeMarkers } = mapSlice.actions;

export const mapReducer = mapSlice.reducer;