import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'
import MapContainer from '../components/MapContainer'
import { useFormik } from 'formik';

const countries = require('country-data').countries;

export default function DataPage() {
  
  	const [allCountries, setAllCountries] = useState([]);
  	const [input, setInput] = useState({});
  	const [data, setData] = useState([]);
	const [mapData, setMapData] = useState({});

  	const formik = useFormik({
		initialValues: {
          	year: '',
			startYear: '',
			endYear: '',
          	migration: '',
          	country: '',
      	},
      	onSubmit: values => {
        	setInput(values);
      	},
  	});

  	async function getCountries() {
    	let res = await axios.get(`http://localhost:5000/api/all-countries`);
    	let resData = res.data;
    	setAllCountries(() => resData);
  	}

	async function getData(userInput) {
		const { year, startYear, endYear, country, migration } = userInput;
		let res = await axios.get(`http://localhost:5000/api/user-input?year=${year}&startYear=${startYear}&endYear=${endYear}&country=${country}&migration=${migration}`);
		let resData = res.data;
		console.log(resData);
		setData(() => resData);
	}

	useEffect(() => {
		getCountries();
	}, [])

	useEffect(() => {
		if (Object.keys(input).length !== 0)
		getData(input);
	}, [input]);

	function getCode(alpha3) {
        let country = countries[[alpha3][0]];
        if (country !== undefined)
            return country["alpha2"]
        else
            return undefined
    }

	function getMapData() {
		let mapDataValues = {}
		for (let i=0; i<data.length; i++) {
			let country = input.migration === 'Immigration' ? data[i].coo_iso : data[i].coa_iso;
			let isoCode = getCode(country);
			if (isoCode === undefined)
				continue;
			mapDataValues[isoCode] = {refugees: parseInt(data[i].refugees)};
		}
		let selectedCountryisoCode = getCode(input.country);
		let totalMigrants = 0
		for (let i=0; i<data.length; i++){
			totalMigrants += parseInt(data[i].refugees);
		}
		mapDataValues[selectedCountryisoCode] = {
			refugees: totalMigrants,
			color: '#000000'
		};
		setMapData(mapDataValues);
		return mapDataValues;
	}

	return (
		<div className="main-container">
			<LeftMenu formik={formik} data={allCountries} />
			<MapContainer data={data} getMapData={getMapData} />
			<RightMenu formInput={input} mapData={mapData} />
		</div>
	);
}
