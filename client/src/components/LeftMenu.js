import React from "react";
import { Link } from "react-router-dom"
import DataForm from './DataForm'
import '../App.css';
import './LeftMenu.css';
import globe from '../assets/globe.png'

export default function LeftMenu({ formik, data, handleYear }) {
    return (
        <div className="side-menu">
            <div className="logo-container">
                <Link className="logo-link" to="/">
                    <div className="logo-and-title">
                        <div className="logo-title">
                            world<br />data
                        </div>
                        <img className="logo-image" src={globe} alt="world logo" />
                    </div>
                </Link>
                <div className="page-title">
                    Refugee data
                </div>
            </div>
            <DataForm formik={formik} data={data} handleYear={handleYear} />
        </div>
    )
}