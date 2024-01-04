import React, { useState, useEffect } from "react";
import '../App.css';

const countries = require('country-data').countries;

export default function RightMenu(props) {
    
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');

    function getCountryName(alpha3) {
        let country = countries[[alpha3][0]];
        if (country !== undefined)
            return country["name"]
        else
            return undefined
    }


    useEffect(() => {
        setCountry(getCountryName(props.formInput.country));
        setYear(props.formInput.year);
    }, [props.formInput.country, props.formInput.year])

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
                <div className="brief-country-info">
                    <div><span className="text-highlight">Total:</span>1 000</div>
                    <div><span className="text-highlight">Change:</span>-5%</div>
                </div>
                <div className="top-countries-container">
                    <div className="top-countries-heading"><span className="top-5">Top 5</span> countries:</div>
                    <div className="top-country"><span className="text-highlight">1.</span>Placeholder</div>
                    <div className="top-country"><span className="text-highlight">2.</span>Placeholder</div>
                    <div className="top-country"><span className="text-highlight">3.</span>Placeholder</div>
                    <div className="top-country"><span className="text-highlight">4.</span>Placeholder</div>
                    <div className="top-country"><span className="text-highlight">5.</span>Placeholder</div>
                </div>
            </div>
        </div>
    )
}