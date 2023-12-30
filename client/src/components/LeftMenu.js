import React, { useState, useEffect } from "react";
import '../App.css';
import globe from '../assets/globe.png'
import DataForm from './DataForm'

export default function LeftMenu(props) {
    return (
        <div className="side-menu">
            <div className="logo-container">
                <div className="logo-and-title">
                    <div className="logo-title">
                        world<br />data
                    </div>
                    <img className="logo-image" src={globe} />
                </div>
                <div className="page-title">
                    Refugee data
                </div>
            </div>
            <DataForm formik={props.formik} data={props.data} />
        </div>
    )
}