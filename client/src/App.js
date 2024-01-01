import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import MapContainer from './components/MapContainer'
import { useFormik, Field, Form, FormikProvider } from 'formik';

const countries = require('country-data').countries;


export default function App() {
  
  const [allCountries, setAllCountries] = useState([]);
  
  function findCountryCode(country) {
    let index = allCountries.findIndex((item) => {
      return item.coa_name == country;
    })
    console.log(allCountries[0].country);
  }

  async function getCountries() {
    let res = await axios.get(`http://localhost:5000/api/all-countries`);
    let resData = res.data;
    setAllCountries(() => resData);
  }

  useEffect(() => {
    getCountries();
  }, [])
  
  const [input, setInput] = useState({});
  const [data, setData] = useState([]);

  async function getData(year, country, migration) {
    let res = await axios.get(`http://localhost:5000/api/user-input?year=${year}&country=${country}&migration=${migration}`);
    // console.log(res.data);
    let resData = res.data;
    setData(() => resData);
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  useEffect(() => {
    if (Object.keys(input).length != 0)
      console.log("Migration: ", input.migration);
      getData(input.year, input.country, input.migration);
  }, [input]);

  const formik = useFormik({
      initialValues: {
          year: '',
          migration: '',
          country: '',
      },
      onSubmit: values => {
        setInput(values);
      },
  });

  return (
    <div className="main-container">
      <LeftMenu formik={formik} data={allCountries} />
      <MapContainer data={data} formInput={input} />
      {/* <RightMenu /> */}
    </div>
  );
}