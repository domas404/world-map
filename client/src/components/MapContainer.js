import React, { useState, useEffect } from "react";
import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';
import '../App.css';
import './MapContainer.css';

function removeOldMap() {
    const oldMap = document.querySelector('.svgMap-container');
    if (oldMap != null)
        oldMap.remove();
    const oldTooltip = document.querySelector('.svgMap-tooltip');
    if (oldTooltip != null)
        oldTooltip.remove();
}

export default function MapContainer({ data, getMapData }) {

    const [mapData, setMapData] = useState();

    useEffect(() => {
        removeOldMap()
        setMapData(() => getMapData())
    }, [data]);

    useEffect(() => {
        if (mapData !== undefined){
            if (Object.keys(mapData).length !== 0){
                new svgMap({
                    targetElementID: 'svgMap',
                    data: {
                        data: {
                            refugees: {
                                name: 'Refugees',
                                thousandSeparator: ' ',
                                thresholdMax: 1200,
                                thresholdMin: 0
                            },
                        },
                        applyData: 'refugees',
                        values: mapData
                    },
                    initialZoom: 1,
                    colorMin: '#C0D6E7',
                    colorMax: '#188FE5',
                });
            }
        }
    }, [mapData])

    return (
        <div className="map-container">
            <div className="map-interactive">
                <div id="svgMap"></div>
            </div>
        </div>
    )
}