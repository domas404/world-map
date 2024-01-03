import React, { useState, useEffect } from "react";
import { Field, Form, FormikProvider } from 'formik';
import '../App.css';

export default function DataForm(props) {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (props.data !== undefined){
            let sortedData = [...props.data];
            sortedData.sort((a, b) => a.coa_name > b.coa_name);
            let mappedData = sortedData.map((item) => {
                return <option key={item.coa_iso} value={item.coa_iso}>{item.coa_name}</option>
            })
            setCountries(() => mappedData);
        }
    }, [props.data])

    return (
        <FormikProvider value={props.formik}>
            <Form onSubmit={props.formik.handleSubmit}>
                <div className="form-section">
                    <label className="form-label" htmlFor="year">Year</label>
                    <select
                        id="year"
                        name="year"
                        onChange={props.formik.handleChange}
                        value={props.formik.values.year}
                        className="form-select"
                    >
                        <option>--</option>
                        <option>2010</option>
                        <option>2011</option>
                        <option>2012</option>
                        <option>2013</option>
                        <option>2014</option>
                        <option>2015</option>
                        <option>2016</option>
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                    </select>
                </div>

                <div className="form-section">
                    <label className="form-label" htmlFor="country">Country</label>
                    <select
                        id="country"
                        name="country"
                        onChange={props.formik.handleChange}
                        value={props.formik.values.country}
                        className="form-select"
                    >
                        {countries}
                    </select>
                </div>
                
                <div className="form-section">
                    <label className="form-label">Migration</label>
                    <Field id="emigration" className="radio-button" type="radio" name="migration" onChange={props.formik.handleChange} value="Emigration" />
                    <label className="radio-option" htmlFor="emigration">Emigration</label>
                    <Field id="immigration" className="radio-button" type="radio" name="migration" onChange={props.formik.handleChange} value="Immigration" />
                    <label className="radio-option" htmlFor="immigration">Immigration</label>
                </div>

                <button type="submit">Submit</button>
            </Form>
        </FormikProvider>
    )
}