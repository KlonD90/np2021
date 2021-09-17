import React, { useState, useRef, useEffect, } from 'react';
import { withRouter } from 'react-router';
// @ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import "../styles/map.css";
mapboxgl.accessToken = "pk.eyJ1IjoiYmFzYW4iLCJhIjoiY2twOWk5dXNzMGo1MDJvbXBuMm1mYzRtaSJ9.Jx7_c_BVbQCOANk-dFYldA";

const KalmMap = (props: any) => {
    const mapContainer = useRef<any>(null);
    let [map, setMap] = useState<any>(null);
    const [lng, setLng] = useState(45.0000);
    const [lat, setLat] = useState(46.7000);
    const [zoom, setZoom] = useState(4.5);
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
                const popUp = new mapboxgl.Popup({ offset: 20 }).setHTML(
                    `<p id="bold-name">Общее число проголосовавших на данный момент в  <a style="text-decoration: none; color: black; border: none" href="/tk/${district.tiknum}"><b>${district.tik_name}</b>: <b>${district.electors_in_tik}</b></a>.</p>`
                );

                const customMarker = document.createElement('div');
                customMarker.id = `${district.tiknum}`
                customMarker.className = 'marker';
                customMarker.innerHTML = `<span><b></b></span>`
                const marker = new mapboxgl.Marker(customMarker)
                marker.setLngLat([district.longit, district.latit,]).setPopup(popUp).addTo(map)
                // const bold = document.getElementById('bold-name')
                // bold?.addEventListener("onclick", () => {
                //     props.history.push(`/tk/${district.tiknum}`)
                //     console.log('hello')
                // })
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

export default withRouter(KalmMap)