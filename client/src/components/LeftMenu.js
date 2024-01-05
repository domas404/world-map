import React from "react";
import '../App.css';
import globe from '../assets/globe.png'
import DataForm from './DataForm'
import { Link } from "react-router-dom"

export default function LeftMenu(props) {
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
            <DataForm formik={props.formik} data={props.data} />
        </div>
    )
}