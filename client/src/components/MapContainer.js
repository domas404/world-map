import React, { useState, useEffect } from "react";
import '../App.css';
import svgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';

const countries = require('country-data').countries;

export default function MapContainer(props) {

    // console.log(props);

    function getCode(alpha3) {
        let country = countries[[alpha3][0]];
        if (country != undefined)
            return country["alpha2"]
        else
            return undefined
    }

    const [mapData, setMapData] = useState();

    function removeOldMap() {
        const oldMap = document.querySelector('.svgMap-container');
        if (oldMap != null)
            oldMap.remove();
        const oldTooltip = document.querySelector('.svgMap-tooltip');
        if (oldTooltip != null)
            oldTooltip.remove();
    }

    useEffect(() => {
        removeOldMap()
        let mapDataValues = {}
        for (let i=0; i<props.data.length; i++) {
            let country = props.formInput.migration == 'Immigration' ? props.data[i].coo : props.data[i].coa;
            let isoCode = getCode(country);
            if (isoCode == undefined)
                continue;
            mapDataValues[isoCode] = {refugees: parseInt(props.data[i].refugees)};
        }
        setMapData(() => mapDataValues);
    }, [props.data])

    useEffect(() => {
        if (mapData != undefined){
            if (Object.keys(mapData).length != 0){
                new svgMap({
                    targetElementID: 'svgMap',
                    data: {
                        data: {
                            refugees: {
                                name: 'Refugees',
                                thousandSeparator: ',',
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