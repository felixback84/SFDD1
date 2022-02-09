import React, { Component } from 'react'
// Redux stuff
import { connect } from 'react-redux'


class GoogleMap extends Component {

	// state
	constructor(props) {
		super(props)
		this.gMap = this.gMap.bind(this)
		this.state = {
			GMap:null
		}
	}
	
	// to create the map
	gMap(){
		// gmaps
		let google = window.google
		// geolocation dynamic user
		const myLatlng = new google.maps.LatLng(
			this.props.coords.lat, 
			this.props.coords.lon
		)
		// map options
		const mapOptions = {
			zoom: 19,
			center: myLatlng,
		}
		// map instance
		const nodeHTMLToMap = document.getElementById(this.props.id)
		const GMap = new google.maps.Map(nodeHTMLToMap, mapOptions)
		// pass to state
		this.setState({GMap})
	}

	// to init GMap connection
	componentDidMount() {
	// 	if (!window.google) {
	// 		let s = document.createElement('script')
	// 		s.type = 'text/javascript'
	// 		s.src = `3`
	// 		let x = document.getElementsByTagName('script')[0]
	// 		x.parentNode.insertBefore(s, x)
	// 		//We cannot access google.maps until it's finished loading
	// 		s.addEventListener('load', e => {
	// 			this.gMap()
	// 		})
	// 	} else {
	// 		this.gMap()
	// 	}
		this.gMap()
	}

	render(){
		const markers = this.props.onMapLoad(this.state.GMap)
		return (
			<div 
				style={
					{ 
						width: '100%', 
						height: 600 
					}
				} 
				id={this.props.id} 
			>
				{/* buyer marker */}
				{markers}
			</div>
		)
	}				
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	// user
	credentials: state.user.credentials,
	// userDevices
	loading: state.userDevices1.loading,
	userDevices: state.userDevices1.userDevices,
	// liveDataSets
	profileToMatch: state.heartbeatThing1.thingLiveDataSets.profileToMatch,
	coords: state.heartbeatThing1.thingLiveDataSetsListener.coords,
	// top5Tags
	top5Tags: state.top5Tags1.top5Tags,
	top5TagsListener: state.top5Tags1.top5TagsListener,
	matchDataResults: state.top5Tags1.top5Tags.matchDataResults
});

export default connect(mapStateToProps)(GoogleMap)


