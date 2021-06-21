import React, { Component } from 'react';
// mui core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Chip from '@material-ui/core/Chip';
// @material-ui/icons 
import Favorite from "@material-ui/icons/Favorite";
import Share from "@material-ui/icons/Share";
// modules
import GoogleMap from '../../sections/GoogleMap.js';
// Redux stuff
import { connect } from 'react-redux';
// _
let _ = require('underscore');

const handleApiLoaded = (map, maps,{...data}) => {
	
	//////////////////////////////////////////////////// userDevices - buyers - users -dynamics
	const markersDynamicDevices = []
	const infoWindowsDynamicDevices = [];
	//badges 
	const arrayListBadgeUSerDevice = (data) => {
		let profileToMatch = data.profileToMatch
		let arrWithTags = [];
		let counter = 0
		for (let keyPair in profileToMatch) {
			arrWithTags.push(profileToMatch[keyPair].map((item)=><Chip label={item} key={counter++}/>))
		}  
		return(
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					{arrWithTags}
				</GridItem>
			</GridContainer>
		)
	}

	// print
	console.log(`arrayListBadgeUSerDevice:${arrayListBadgeUSerDevice(data.profileToMatch)}`)
	
	// to dynamic devices (users - searchers) list by now jus one
	// data infoWindow
	const getInfoWindowStringUserDevice = (data) => `
		<div>
			<div style="font-size: 16px;">
				${data.bio}
			</div>
			<div style="font-size: 14px;">
				<span style="color: grey;">
				${data.email}
				</span>
				<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
			</div>
			<div style="font-size: 14px; color: grey;">
				${data.names} ${data.lastName}
			</div>
			<div style="font-size: 14px; color: grey;">
				${data.type}
			</div> 
			<div style="font-size: 14px; color: green;">
				${true ? 'Open' : 'Closed'}
				${data.userHandle}
			</div>
			
		</div>`;

		markersDynamicDevices.push(new maps.Marker({
			position: {
				lat: data.coords.lat,
				lng: data.coords.lon,
			},
			map,
		}));

		infoWindowsDynamicDevices.push(new maps.InfoWindow({
			content: getInfoWindowStringUserDevice(data.credentials),
		}));

		markersDynamicDevices.forEach((marker, i) => {
			marker.addListener('click', () => {
				infoWindowsDynamicDevices[i].open(map, marker);
		});
	});
	
	//////////////////////////////////////////////////// top5Tags - static devices - vendors
	// var to hold data in arrays to escalate
	const markersStaticsDevices = [];
	const infoWindowsStaticsDevices = [];
	// badges
	const arrayListBadgeStaticDevices = (data) => {
		let top5Tags = data.top5Tags
		let arrWithTags = [];
		let counter = 0

		top5Tags.forEach((top5Tag)=>{
			for (let keyPair in top5Tag.matchDataResults) {
				arrWithTags.push(top5Tag[keyPair].map((item)=><Chip label={item} key={counter++}/>))
			} 
		})
		 
		return(
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					{arrWithTags}
				</GridItem>
			</GridContainer>
		)
	}
	// print
	// console.log(`arrayListBadgeStaticDevices:${arrayListBadgeStaticDevices(data.top5Tags)}`)
	// data infoWindow
	const getInfoWindowStringStaticDevice = (data) => `
		<div>
			<div style="font-size: 16px;">
				${data.bio}
			</div>
			<div style="font-size: 14px;">
				<span style="color: grey;">
				${data.email}
				</span>
				<span style="color: orange;">${String.fromCharCode(9733).repeat(Math.floor(data.rating))}</span><span style="color: lightgrey;">${String.fromCharCode(9733).repeat(5 - Math.floor(data.rating))}</span>
			</div>
			<div style="font-size: 14px; color: grey;">
				${data.names} ${data.lastName}
			</div>
			<div style="font-size: 14px; color: grey;">
				${data.type}
			</div> 
			<div style="font-size: 14px; color: green;">
				${true ? 'Open' : 'Closed'}
				${data.userHandle}
			</div>
			
		</div>`;

	// to static devices list markers
	data.top5Tags.forEach((top5Tag) => {
		markersStaticsDevices.push(new maps.Marker({
			position: {
				lat: top5Tag.coords.lat,
				lng: top5Tag.coords.lon,
			},
			map,
			
		}));

		infoWindowsStaticsDevices.push(new maps.InfoWindow({
			content: getInfoWindowStringStaticDevice(top5Tag.userCredentials),
		}));
	});

	markersStaticsDevices.forEach((marker, i) => {
		marker.addListener('click', () => {
			infoWindowsStaticsDevices[i].open(map, marker);
		});
	});
};

class GoogleMapModeOne extends Component {

	// state
	constructor(props) {
		super(props);
		this.state= {markers: this.props.coords};   
	}

	render(){
		// redux state
		const {
			// user
			credentials,
			profileToMatch,
			coords,
			// top5Tags
			loading,
			top5Tags,
			//matchDataResults,
		} = this.props

		// checker of data available
		if(loading == false){
			// print
			console.log(`coords:${JSON.stringify(this.props.coords)}`)

			return(
				<>
					<GoogleMap
						onGoogleApiLoaded={
							({ map, maps }) => handleApiLoaded(map, maps,
								{
									// user
									credentials,
									profileToMatch,
									//matchDataResults,
									coords,
									// top5Tags
									top5Tags,
								}
							)}
					>	
					</GoogleMap>
				</>
			)
		} else {
			return(
				<>
					<p>...wait for coords</p>
				</>
			)
		}
	}
}


// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
	coords: state.heartbeatThing1.thingLiveDataSets.coords,
	// top5Tags
	loading: state.userDevices1.loading,
	top5Tags: state.userDevices1.top5Tags,
	//matchDataResults: state.userDevices1.top5Tags.matchDataResults
});

export default connect(mapStateToProps)(GoogleMapModeOne)
