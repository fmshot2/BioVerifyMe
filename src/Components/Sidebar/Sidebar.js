// import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './Sidebar.module.css';


const divStyle = {
	"overflow-y": "auto",
};
function Sidebar() {
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
							<li className="sidebar-dropdown active">
								<Link to="/">
								<i className="icon-unlock"></i>
									<span className="menu-text">Authentication</span>
								</Link>								
							</li>
										{/* <li>
											<Link to={'/abouts'}></Link>
											<i className="icon-circular-graph"></i>
									<span className="menu-text">About</span>
										</li>
										<li>
											<Link to={"/config"}>CONFIG</Link>
										</li>
										<li>
											<Link to={"/galleries"}>GALLERY</Link>
										</li> */}
							<li className={({ isActive }) =>
									isActive ? classes.active : undefined
								}>
								<Link to="/about">
									<i className="icon-circular-graph"></i>
									<span className="menu-text">About</span>
								</Link>
							</li>
							<li>
								<Link to="/config">
									<i className="icon-line-graph"></i>
									<span className="menu-text">CONFIG</span>
								</Link>
							</li>
							<li>
								<Link to="/galleries">
									<i className="icon-calendar1"></i>
									<span className="menu-text">GALLERY</span>
								</Link>
							</li>
							<li>
								<Link to="/sliders">
									<i className="icon-layers2"></i>
									<span className="menu-text">SLIDERS</span>
								</Link>
							</li>
							<li>
								<Link to="/statistics">
									<i className="icon-circular-graph"></i>
									<span className="menu-text">STATISTICS</span>
								</Link>
							</li>
							<li>
								<Link to="/testimonials">
									<i className="icon-circular-graph"></i>
									<span className="menu-text">TESTIMONIALS</span>
								</Link>
							</li>
							<li>
								<Link to="/partners" className="current-page">
									<i className="icon-line-graph"></i>
									<span className="menu-text">PARTNERS</span>
								</Link>
							</li>
							<li className="sidebar-dropdown">
							<Link to="/events" className="current-page">
									<i className="icon-calendar1"></i>
									<span className="menu-text">EVENTS</span>
								</Link>
							</li>
							<li className="sidebar-dropdown">
								<a href="/previousevents">
									<i className="icon-calendar1"></i>
									<span className="menu-text">PREVIOUSEVENTS</span>
								</a>
							</li>
							<li className="sidebar-dropdown">
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