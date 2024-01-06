import React, { useState, useEffect } from "react";
import { Field, Form, FormikProvider } from 'formik';
import '../App.css';

export default function DataForm(props) {

    const [countries, setCountries] = useState([]);
    const [isPeriod, setIsPeriod] = useState(false);

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

    function handleClick() {
        setIsPeriod((oldValue) => !oldValue);
    }

    const [yearOptions, setYearOptions] = useState([]);

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

    return (
        <FormikProvider value={props.formik}>
            <Form onSubmit={props.formik.handleSubmit}>
                {
                    !isPeriod ?
                    <div className="form-section">
                        <div className="choose-year">
                            <label className="form-label chosen" htmlFor="year">Year</label>
                            <label className="form-label" htmlFor="year" onClick={handleClick}>Period</label>
                        </div>
                        <select
                            id="year"
                            name="year"
                            onChange={props.formik.handleChange}
                            value={props.formik.values.year}
                            className="form-select"
                        >
                            <option>--</option>
                            {yearOptions}
                        </select>
                    </div>
                    :
                    <div className="form-section">
                        <div className="choose-year">
                            <label className="form-label" htmlFor="year" onClick={handleClick}>Year</label>
                            <label className="form-label chosen" htmlFor="year">Period</label>
                        </div>
                        <div className="year-period-select">
                            <select
                                id="startYear"
                                name="startYear"
                                onChange={props.formik.handleChange}
                                value={props.formik.values.startYear}
                                className="form-select"
                            >
                                <option>--</option>
                                {yearOptions}
                            </select>
                            <select
                                id="endYear"
                                name="endYear"
                                onChange={props.formik.handleChange}
                                value={props.formik.values.endYear}
                                className="form-select"
                            >
                                <option>--</option>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                }

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

                <button className="submit-button" type="submit">Submit</button>
            </Form>
        </FormikProvider>
    )
}