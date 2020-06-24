import React from 'react';
import  './sidebar.css';
import profile from './Profile_id.png';

function Sidebar() {
    
    
    return (
        <div className="wrapper">

            <div className="top_navbar">
                <div className="logo">
                    <a href="/sidebar">InBoard</a>
                  
                </div>
                <div className="top_menu">
                    <div className="home_link">
                        
                            <span className="icon_bar" onClick={ () => document.querySelector(".wrapper").classList.toggle("active")}><i className="fas fa-bars"></i></span>
                            {/* <span>Home</span> */}
                        
                    </div>
                    <div className="right_info">
                        <div className="icon_wrap">
                            <div className="icon">
                                <i className="fas fa-bell"></i>
                            </div>
                        </div>
                        <div className="icon_wrap">
                            <div className="icon">
                                <i className="fas fa-cog"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main_body">
                
                <div className="sidebar_menu">                   

                    <div className="inner__sidebar_menu">
                        <div className="profile_info">
                            <div className="profile_img">
                                <img src={profile} alt="profile"/>
                            </div>
                            <div className="profile_data">
                                <p className="name">Scarlett Rosey</p>
                            </div>
                        </div>
                        
                        <ul>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon">
                                        <i className="fas fa-border-all"></i></span>
                                    <span className="list">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon">
                                        <i className="fas fa-border-all"></i></span>
                                    <span className="list">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar" className="active">
                                    <span className="icon"><i className="fas fa-chart-pie"></i></span>
                                    <span className="list">Charts</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fas fa-address-book"></i></span>
                                    <span className="list">Contact</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fas fa-address-card"></i></span>
                                    <span className="list">About</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fab fa-blogger"></i></span>
                                    <span className="list">Blogs</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fas fa-map-marked-alt"></i></span>
                                    <span className="list">Maps</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fas fa-map-marked-alt"></i></span>
                                    <span className="list">Maps</span>
                                </a>
                            </li>
                            <li>
                                <a href="/sidebar">
                                    <span className="icon"><i className="fas fa-map-marked-alt"></i></span>
                                    <span className="list">Maps</span>
                                </a>
                            </li>
                        </ul>

                        {/* <div className="hamburger" onClick={ () => document.querySelector(".wrapper").classList.toggle("active")}>
                            <div className="inner_hamburger">
                                <span className="arrow">
                                    <i className="fas fa-long-arrow-alt-left"></i>
                                    <i className="fas fa-long-arrow-alt-right"></i>
                                </span>
                            </div>
                        </div> */}

                    </div>
                </div>

                <div className="container">
                    <div className="conteudo">
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>                             
                        <h1>Teste</h1>
                        <h1>Teste</h1>
                     
                    </div>
                </div>

	        </div>
        </div>
        
        
    );
}


export default Sidebar;