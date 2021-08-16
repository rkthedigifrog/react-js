import { AUTH } from '../../constants/actionTypes';

class Auth {
	constructor() {
		this.isAuthed = false;
		this.token = '';
		this.user = {};
		this.userInfo = {};
	}

	getState() {
		return { ...{
			isAuthed: this.isAuthed,
			token: this.token,
			user: this.user,
			userInfo: this.userInfo,
		} };
	}

	// verify Auth
	checkAuth() {
		this.isAuthed = false;
		this.token = '';
		this.user = null;
		this.user = {};
		if (window.localStorage.getItem('nextday_token') && window.localStorage.getItem('nextday_user') && window.localStorage.getItem('nextday_userInfo')) {
			this.isAuthed = true;
			this.token = window.localStorage.getItem('nextday_token');
			let strUser = window.localStorage.getItem('nextday_user');
			this.user = Object.assign({}, JSON.parse(strUser));
			let strUserInfo = window.localStorage.getItem('nextday_userInfo');
			this.userInfo = Object.assign({}, JSON.parse(strUserInfo));
		}
	}

	// user login 
	loggedIn(token, user, userInfo,isProfileComplete) {
		this.isAuthed = false;
		this.token = '';
		this.token = token;
		window.localStorage.setItem('nextday_token', token);
		this.user = null;
		this.user = {};
		this.user = Object.assign({}, user);
		let strUser = JSON.stringify(user);
		window.localStorage.setItem('nextday_user', strUser);
		this.userInfo = null;
		this.userInfo = {};
		this.userInfo = Object.assign({}, userInfo);
		let strUserInfo = JSON.stringify(userInfo);
		window.localStorage.setItem('nextday_userInfo', strUserInfo);
		window.localStorage.setItem("isProfileComplete", isProfileComplete);
		this.isAuthed = true;
	}

	//User Logout
	loggedOut() {
		this.isAuthed = false;
		this.token = '';
		this.user = null;
		this.user = {};
		this.userInfo = null;
		this.userInfo = {};
		window.localStorage.removeItem('nextday_user');
		window.localStorage.removeItem('nextday_token');
		window.localStorage.removeItem('nextday_userInfo');
		window.localStorage.removeItem('isProfileComplete');
	}

	//update user data
	updateUser(user) {
		this.user = null;
		this.user = {};
		this.user = Object.assign({}, user);
		let strUser = JSON.stringify(user);
		window.localStorage.setItem('nextday_user', strUser);
	}

	// update staff profile
	updateStaffProfile(item,isProfileComplete) {

		this.user = Object.assign({},this.user,item.user);
		let strUser = JSON.stringify(this.user);
		window.localStorage.setItem('nextday_user', strUser);
		this.userInfo  = Object.assign({},this.userInfo,item);
		let strObj = JSON.stringify(this.userInfo);
		window.localStorage.setItem('nextday_userInfo', strObj);
		window.localStorage.setItem('isProfileComplete', isProfileComplete);
	}

	// update client profile
	updateClientProfile(item,isProfileComplete) {
		this.user = Object.assign({},this.user,item.user);
		let strUser = JSON.stringify(this.user);
		window.localStorage.setItem('nextday_user', strUser);
		this.userInfo  = Object.assign({},this.userInfo,item);
		let strObj = JSON.stringify(this.userInfo);
		window.localStorage.setItem('nextday_userInfo', strObj);
		window.localStorage.setItem('isProfileComplete', isProfileComplete);



const AuthObj = new Auth();

// Auth reducer object
const reducer = (state = AuthObj.getState(), action) => {
	switch (action.type) {
		case AUTH.CHECK_AUTH:
			AuthObj.checkAuth();
			break;

		case AUTH.LOGGED_IN:
			AuthObj.loggedIn(action.token, action.user, action.userInfo,action.userInfo.is_profile_complete);
			break;
		case AUTH.LOGGED_OUT:
			AuthObj.loggedOut();
			break;
		case AUTH.UPDATE_USER:
			AuthObj.updateUser(action.user);
			break;

		case AUTH.UPDATING_STAFF_PROFILE:
			AuthObj.updateStaffProfile(action.item,action.isProfileComplete);
			break;

		case AUTH.UPDATING_CLIENT_PROFILE:
			AuthObj.updateClientProfile(action.item,action.isProfileComplete);
			break;
		default: return state;
	}
	return AuthObj.getState();
};

export default reducer;