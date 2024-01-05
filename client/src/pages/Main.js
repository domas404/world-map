import React from 'react';
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Link } from "react-router-dom"
import globe from '../assets/globe.png'

export default function Main() {
  	// <Link to="/pages/DataPage">See data</Link>

	return (
        <div className='main-page-container'>
            <div className="main-logo-container">
                <div className="main-logo-and-title">
                    <div className="main-logo-title">
                        world<br />data
                    </div>
                    <img className="main-logo-image" src={globe} alt="world logo" />
                </div>
            </div>
            <div className='main-data-container'>
                <div className='main-data-inner-container'>
                    <div className='main-data-heading'>Explore</div>
                    <div className='main-data-table'>
                        <div className='main-data-label-container'>
                            <div className='main-data-label-name'>Data</div>
                            <div className='main-data-label-period'>Period</div>
                            <div className='main-data-label-source'>Source</div>
                        </div>
                        <div className='main-data-item-container'>
                            <div className='main-data-item'>
                                <Link to="/pages/DataPage" className='main-data-item-name'>Refugee Data</Link>
                                <div className='main-data-item-period'>2010-2022</div>
                                <div className='main-data-item-source'>
                                    <a href="https://www.kaggle.com/datasets/sujaykapadnis/refugees" rel="noreferrer" target='_blank'>kaggle.com</a>
                                </div>
                            </div>
                            <div className='main-data-item'>
                                <div className='main-data-item-name'>Climate Data</div>
                                <div className='main-data-item-period'>xxxx-xxxx</div>
                                <div className='main-data-item-source'>Source</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-empty-container'></div>
        </div>
	);
}
