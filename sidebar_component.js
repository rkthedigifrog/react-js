import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { API_URL } from '../../constants/environment';

import temp_avatar from '../../styles/images/avatar.png';

import * as authActions from '../../actions/auth';

const image_url = API_URL + "webroot/files/userprofile/"; 
const mapDispatchToProps = (dispatch) => {
	return ({
		actions: bindActionCreators({...authActions}, dispatch),
	});
}

const mapStateToProps = (state) => {
	return ({
		user: state.auth.user,
		userInfo: state.auth.userInfo,
	});
}

class SideBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.clickLogOut = this.clickLogOut.bind(this);
	}

	clickLogOut(e) {
		e.preventDefault();
		this.props.actions.logOut();
		toastr["success"]("Staff logout is done.");
		window.location.href = '/#/home';
	}

	render() {
		const { profile_image } = this.props.user;
		return (
			<div>
				<div className="well white-bg box-shadow">
					<div className="user">
						<img src={ profile_image ? image_url + profile_image :  temp_avatar } className="circle" />
						<small>Hello,</small>
						<div className="name">{this.props.user.first_name} {this.props.user.last_name}</div>
					</div>
				</div>

				<div className="well white-bg box-shadow p-0 m-0">
					<div className="list-group m-0">
						<NavLink to="/profile" className="list-group-item text-uppercase">
							<span className="fa fa-user fa-fw"></span> profile
						</NavLink>
						{
							this.props.user.role_id == "3" ?
								<NavLink to="/newjob" className="list-group-item text-uppercase">
									<span className="fa fa-briefcase fa-fw"></span> Open jobs
								</NavLink>
							: ""
						}
						{
							this.props.user.role_id == "4" ?
								<NavLink to="/newjob" className="list-group-item text-uppercase">
									<span className="fa fa-briefcase fa-fw"></span> New jobs
								</NavLink>
							: ""
						}
						
						{
							this.props.user.role_id == "3" ?
								<NavLink to="/addnewjob" className="list-group-item text-uppercase">
									<span className="fa fa-users fa-fw"></span> add new job
								</NavLink>
							: ""
						}
						{
							this.props.user.role_id == "4" ?
								<NavLink to="/appliedjob" className="list-group-item text-uppercase">
									<span className="fa fa-users fa-fw"></span> applied jobs
								</NavLink>
							: ""
						}
						<NavLink to="/jobinprogress" className="list-group-item text-uppercase">
							<span className="fa fa-file-text-o fa-fw"></span> Jobs In  Progress
						</NavLink>
						<NavLink to="/pastjob" className="list-group-item text-uppercase">
							<span className="fa fa-file-text-o fa-fw"></span> past jobs
						</NavLink>
						<NavLink to="/review" className="list-group-item text-uppercase">
							<span className="fa fa-star fa-fw"></span> my reviews
						</NavLink>
						<NavLink to="/settings" className="list-group-item text-uppercase">
							<span className="fa fa-sliders fa-fw"></span> settings
						</NavLink>
						<NavLink to="/check" className="list-group-item text-uppercase">
							<span className="fa fa-clock-o fa-fw"></span> check in/out
						</NavLink>
						<a href="javascript:void;" onClick={ this.clickLogOut } className="list-group-item text-uppercase">
							<span className="fa fa-power-off fa-fw"></span> logout
						</a>
					</div>
				</div>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);