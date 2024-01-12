import React, { useState, useEffect } from "react";
import { Field, Form, FormikProvider } from 'formik';
import { singleYear, yearPeriod } from './SelectYear';
import './DataForm.css';

export default function DataForm({ formik, data, handleYear }) {

    const [countries, setCountries] = useState([]);
    const [isPeriod, setIsPeriod] = useState(false);
    const [yearOptions, setYearOptions] = useState([]);

    useEffect(() => {
        if (data !== undefined){
            let sortedData = [...data];
            sortedData.sort((a, b) => a.coa_name > b.coa_name);
            let mappedData = sortedData.map((item) => {
                return <option key={item.coa_iso} value={item.coa_iso}>{item.coa_name}</option>
            })
            setCountries(() => mappedData);
        }
    }, [data])

    function handleClick() {
        setIsPeriod((oldValue) => !oldValue);
    }

    function getYearOptions() {
        let options = [];
        for (let i=2010; i<=2022; i++){
            options.push(<option key={i}>{i}</option>);
        }
        setYearOptions(() => options);
    }

    useEffect(() => {
        getYearOptions();
    }, []);

    useEffect(() => {
        handleYear(isPeriod);
    }, [isPeriod]);

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                { !isPeriod ? singleYear(formik, yearOptions, handleClick) : yearPeriod(formik, yearOptions, handleClick) }
                <div className="form-section">
                    <label className="form-label" htmlFor="country">Country</label>
                    <select
                        id="country"
                        name="country"
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        className="form-select"
                    >
                        <option>--</option>
                        {countries}
                    </select>
                </div>
                
                <div className="form-section">
                    <label className="form-label">Migration</label>
                    <Field id="emigration" className="radio-button" type="radio" name="migration" onChange={formik.handleChange} value="Emigration" />
                    <label className="radio-option" htmlFor="emigration">Emigration</label>
                    <Field id="immigration" className="radio-button" type="radio" name="migration" onChange={formik.handleChange} value="Immigration" />
                    <label className="radio-option" htmlFor="immigration">Immigration</label>
                </div>

                <button className="submit-button" type="submit">Submit</button>
            </Form>
        </FormikProvider>
    )
}