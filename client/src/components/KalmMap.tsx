import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import "../styles/map.css";
import { Paper } from '@material-ui/core';
const accessToken: any = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = accessToken;

// const KalmMap = (props: any) => {
//     let map = useRef(null);
//     let mapContainer = useRef(null);
//     const [lng, setLng] = useState(45.0000);
//     const [lat, setLat] = useState(46.6000);
//     const [zoom, setZoom] = useState(6);

//     // const mapNode = useRef<any>(null);
//     // const [newMap, setNewMap] = useState<any>(null)
//     // const accessToken: any = process.env.REACT_APP_MAPBOX_TOKEN
//     // mapboxgl.accessToken = accessToken;
//     useEffect(() => {
//         //for some reason this method does not delete all markers. Therefore the map has to be rerendered check down there
//         // map render only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://styles/mapbox/light-v10',
//             center: [lng, lat],
//             zoom: zoom
//         });


//     }, [])

//     useEffect(() => {
//         if (props.districts && map.current)


//             props.districts.map(district => {


//                 let customMarker = document.createElement('div');
//                 customMarker.id = `${district.tiknum}`
//                 customMarker.className = 'marker';
//                 const long = parseInt(district.longit)
//                 const lat = parseInt(district.latit)
//                 const geometry = [long, lat]
//                 customMarker.innerHTML = `<span><b>${district.tiknum}</b></span>`
//                 let marker = new mapboxgl.Marker(customMarker)
//                     .setLngLat(geometry)
//                     .addTo(map.current)
//                 return marker
//             })
//         //for some reason this method does not delete all markers. This has to be solved later
//         console.log('this works')


//     }, [])

//     // useEffect(() => {
//     //     if (!map.current) return; // wait for map to initialize
//     //     map.current.on('move', () => {
//     //         setLng(map.getCenter().lng.toFixed(4));
//     //         setLat(map.getCenter().lat.toFixed(4));
//     //         setZoom(map.getZoom().toFixed(2));
//     //     });
//     // }, []);
//     return (

//         <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />

//     )
// }

// export default KalmMap

const KalmMap = (props: any) => {
    const mapContainer = useRef<any>(null);
    let [map, setMap] = useState<any>(null);
    const [lng, setLng] = useState(45.0000);
    const [lat, setLat] = useState(46.7000);
    const [zoom, setZoom] = useState(5.5);

    // const mapNode = useRef<any>(null);
    // const [newMap, setNewMap] = useState<any>(null)
    // const accessToken: any = process.env.REACT_APP_MAPBOX_TOKEN
    // mapboxgl.accessToken = accessToken;
    useEffect(() => {
        //for some reason this method does not delete all markers. Therefore the map has to be rerendered check down there
        // map render only once

        const attachMap = (setMap: React.Dispatch<React.SetStateAction<any>>, mapDiv: React.RefObject<HTMLDivElement>) => {
            // if (!mapContainer.current) {
            //     return;
            // }
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [lng, lat],
                zoom: zoom
            });
            setMap(map)
        }
        !map && attachMap(setMap, mapContainer)
    }, [])

    useEffect(() => {
        if (!map) return
        props.districts.map((district: any) => {
            let customMarker = document.createElement('div');
            customMarker.id = `${district.tiknum}`
            customMarker.className = 'marker';
            customMarker.innerHTML = `<span><b></b></span>`
            const marker = new mapboxgl.Marker(customMarker)
            marker.setLngLat([district.longit, district.latit,]).addTo(map)
            return marker
        })
    }, [props.districts])



    useEffect(() => {
        if (!map) return; // wait for map to initialize
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    }, []);
    console.log(map)
    return (
        <div ref={mapContainer} style={{ width: "100%", height: "50vh" }} />
    )
}

export default KalmMap