import React, { useState, useEffect } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';
import { Route, Link, NavLink, Routes, useLocation } from 'react-router-dom';


const divStyle = {
	"overflow-y": "auto",
};

function Sidebar() {
	const [newClass, setNewClass] = useState("");

	const location = useLocation();
	const { hash, pathname, search } = location;

	return (
		<div>
			<nav id="sidebar" className="sidebar-wrapper" style={divStyle}>

				{/*-- Sidebar brand start  */}

				<div className="sidebar-brand">
					<a href="index.html" className="logo">
						<img src="img/logo.png" alt="Logo" ></img>
					</a>
					<a href="index.html" className="logo">Tycöòn</a>
				</div>
				{/*-- Sidebar brand end  */}

				{/*-- User profile start */}
				<div className="sidebar-user-details">
					<div className="user-profile">
						<img src="img/user2.png" className="profile-thumb" alt="User Thumb"></img>
						<span className="status-label"></span>
					</div>
					<h6 className="profile-name mt-5 text-black">Yuki Hayashi</h6>
					<div className="profile-actions">
						<a href="account-settings.html" data-toggle="tooltip" data-placement="top" title="" data-original-title="Settings">
							<i className="icon-settings1"></i>
						</a>
						<a href="javascript:void(0)" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter">
							<i className="icon-twitter1"></i>
						</a>
						<a href="login.html" className="red" data-toggle="tooltip" data-placement="top" title="" data-original-title="Logout">
							<i className="icon-power1"></i>
						</a>
					</div>
				</div>
				{/*-- User profile end */}

				{/*-- Sidebar content start */}
				<div className="sidebar-content">

					{/*-- sidebar menu start */}
					<div className="sidebar-menu">
						<ul className={classes.list}>
							<li className={`sidebar-dropdown ${location.pathname === "/" ? "active" : ""}`}>
								<Link to="/">
									<i className="icon-unlock"></i>
									<span className="menu-text">Authentication</span>
								</Link>
							</li>
							<li className={`box ${location.pathname === "/about" ? "active" : ""}`}>
								<NavLink to="/about" className={({ isActive }) => isActive ? classes.active : undefined} end>
									<i className="icon-circular-graph"></i>
									<span className="menu-text">About</span>
								</NavLink>
							</li>
							<li className={`sidebar-dropdown ${location.pathname === "/events" ? "active" : ""}`}>
								<Link to="/events">
									<i className="icon-calendar1"></i>
									<span className="menu-text">EVENTS</span>
								</Link>
							</li>							
							<li className={`box ${location.pathname === "/testimonial" ? "active" : ""}`}>
								<Link to="/testimonials">
									<i className="icon-circular-graph"></i>
									<span className="menu-text">TESTIMONIALS</span>
								</Link>
							</li>
							<li className={`box ${location.pathname === "/config" ? "active" : ""}`}>
								<Link to="/config">
									<i className="icon-line-graph"></i>
									<span className="menu-text">CONFIG</span>
								</Link>
							</li>
							<li className={`box ${location.pathname === "/galleries" ? "active" : ""}`}>
								<Link to="/galleries">
									<i className="icon-calendar1"></i>
									<span className="menu-text">GALLERY</span>
								</Link>
							</li>
							<li className={`box ${location.pathname === "/sliders" ? "active" : ""}`}>
								<Link to="/sliders">
									<i className="icon-layers2"></i>
									<span className="menu-text">SLIDERS</span>
								</Link>
							</li>
							<li className={`box ${location.pathname === "/statistics" ? "active" : ""}`}>
								<Link to="/statistics">
									<i className="icon-circular-graph"></i>
									<span className="menu-text">STATISTICS</span>
								</Link>
							</li>

							<li className={`box ${location.pathname === "/partners" ? "active" : ""}`}>
								<Link to="/partners">
									<i className="icon-line-graph"></i>
									<span className="menu-text">PARTNERS</span>
								</Link>
							</li>
							{/* <li className={`sidebar-dropdown ${location.pathname === "/previousevents" ? "active" : ""}`}>
								<a href="/previousevents">
									<i className="icon-calendar1"></i>
									<span className="menu-text">PREVIOUSEVENTS</span>
								</a>
							</li> */}
							<li className={`sidebar-dropdown ${location.pathname === "/galleries" ? "active" : ""}`}>
								<a href="#">
									<i className="icon-layers2"></i>
									<span className="menu-text">Layouts</span>
								</a>
							</li>
						</ul>
					</div>
					{/*-- sidebar menu end */}

				</div>
				{/*-- Sidebar content end */}

			</nav>
			{/*-- Sidebar wrapper end */}
		</div>

	)
}
export default Sidebar