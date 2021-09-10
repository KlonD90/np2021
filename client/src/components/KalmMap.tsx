import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "../styles/map.css";
const accessToken: any = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = accessToken;

const KalmMap = (props: any) => {
    const mapContainer = useRef<any>(null);
    let [map, setMap] = useState<any>(null);
    const [lng, setLng] = useState(45.0000);
    const [lat, setLat] = useState(46.7000);
    const [zoom, setZoom] = useState(5.5);
    const [initializeMarkers, setInitializeMarkers] = useState(false)

    const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
        if (!mapContainer.current) {
            return;
        }
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom
        });
        setMap(map)
        setInitializeMarkers(true)
    }
    useEffect(() => {
        !map && attachMap(setMap, mapContainer)
        return () => {
            setInitializeMarkers(false)
        }
    }, [props.districts])

    useEffect(() => {
        if (initializeMarkers && props.districts) {
            props.districts.map((district: any) => {
                const popUp = new mapboxgl.Popup({ offset: 25 }).setText(
                    `Общее число проголосовавших на данный момент в ${district.tik_name}: ${district.electors_in_tik}`
                );
                const customMarker = document.createElement('div');
                customMarker.id = `${district.tiknum}`
                customMarker.className = 'marker';
                customMarker.innerHTML = `<span><b></b></span>`
                const marker = new mapboxgl.Marker(customMarker)
                marker.setLngLat([district.longit, district.latit,]).setPopup(popUp).addTo(map)
                return marker
            })
        }
    }, [props.districts, map])



    useEffect(() => {
        if (!map) return; // wait for map to initialize
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    }, []);
    return (
        <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />
    )
}

export default KalmMap