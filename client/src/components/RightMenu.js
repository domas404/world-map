import React, { useState, useEffect } from "react";
import '../App.css';

const countries = require('country-data').countries;

export default function RightMenu(props) {
    
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [total, setTotal] = useState('');
    const [topCountries, setTopCountries] = useState([]);
    const [mappedTopCountries, setMappedTopCountries] = useState([]);

    function getCountryName(alpha3) {
        let country = countries[[alpha3][0]];
        if (country !== undefined)
            return country["name"]
        else
            return undefined
    }

    function getTopCountries() {
        let countryList = Object.keys(props.mapData).map((key) => [getCountryName(key), props.mapData[key].refugees]);
        countryList.sort((a, b) => a[1] < b[1]);
        setTotal(countryList[0][1].toLocaleString("lt-LT"));
        countryList.splice(0, 1);
        setTopCountries(countryList);
    }

    useEffect(() => {
        if (Object.keys(props.mapData).length > 0)
            getTopCountries();
    }, [props.mapData]);

    useEffect(() => {
        setCountry(getCountryName(props.formInput.country));
        setYear(props.formInput.year);
    }, [props.formInput.country, props.formInput.year]);

    useEffect(() => {
        let mappedData = [];
        for (let i=0; i<topCountries.length; i++) {
            mappedData.push(
                <div key={i} className="top-country">
                    <span className="text-highlight numbering">{i+1}.</span>
                    <span className="numbered-text">{topCountries[i][0]}</span>
                </div>
            );
            if (i+1 >= 5)
                break;
        }
        setMappedTopCountries(mappedData);
    }, [topCountries]);

    return (
        <div className="side-menu">
            <div className="country-info-container">
                <div className="country-title-and-year">
                    <div className="country-title">
                        {country}
                    </div>
                    <div className="country-year">
                        {year}
                    </div>
                </div>
                <div className="country-summary-container">
                    <div className="form-label">Summary</div>
                    <div className="brief-country-info">
                        <div className="summary-element">
                            <span className="text-highlight">Type:</span>
                            {Object.keys(props.formInput).length > 0 ? props.formInput.migration : ""}
                        </div>
                        <div className="summary-element">
                            <span className="text-highlight">Total:</span>
                            {total}
                        </div>
                        {/* <div><span className="text-highlight">Change:</span>-5%</div> */}
                    </div>
                </div>
                <div className="country-summary-container">
                    <div className="form-label"><span className="top-5">Top</span> countries:</div>
                    <div className="top-countries-container">
                        {mappedTopCountries}
                    </div>
                </div>
            </div>
        </div>
    )
}