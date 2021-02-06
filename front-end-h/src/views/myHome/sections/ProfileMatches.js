import React, { Component } from "react";
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// core components
import Carousel from "react-slick";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// components
import GoogleMaps from '../components/GoogleMaps'
import CardForDataOfStaticMatches from '../components/CardForDataOfStaticMatches'
import ArraysListBadge from '../components/ArraysListBadge'
// Redux stuff
import { connect } from 'react-redux';
// styles
import image1 from "assets/img/bg.jpg";
import carouselStyle from "assets/jss/material-kit-pro-react/views/componentsSections/carouselStyle.js";
import "assets/scss/plugins/_plugin-react-slick.scss"

const useStyles = carouselStyle;

class ProfileMatches extends Component{
	
	render(){
		// classes & redux state
		const{
			classes,
			thingLiveDataSets:{
				top5Coords
			}
		} = this.props

		// map list
    let listOfMatches = top5Coords.map((top5Coord) => 
    <div>
			{/* profile to */}
			<ArraysListBadge key={top5Coord.thingId} profiletomatch={top5Coord.matchDataResults}/>
				<div
					style={{ backgroundImage: `url("${image1}")` }}
				>
					<div className={classes.container}>
						<GridContainer>
							<GridItem xs={12} sm={4} md={4}>
								{/* card of static */}
								<CardForDataOfStaticMatches credentials={top5Coord.userCredentials}/>
							</GridItem>
							<GridItem xs={12} sm={7} md={7} style={{marginTop:30}}>
								{/* google maps */}
								<GoogleMaps coords={top5Coord.coords}/>
							</GridItem>
						</GridContainer> 
					</div>
				</div>
			</div>
		)
		
		// settings slider
    const settings = {
			dots: false,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false
		};
		
		return (
			<div>
				<Carousel {...settings}>
					{listOfMatches}
				</Carousel>
			</div>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProfileMatches));



