import React, { Component } from "react";
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// core components
import Carousel from "react-slick";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// components
import CardForDataOfStaticMatches from '../components/CardForDataOfStaticMatches'
// Redux stuff
import { connect } from 'react-redux';
// styles
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
				<div>
					<div className={classes.container}>
						<GridContainer>
							<GridItem xs={12} sm={12} md={12}>
								{/* card of static */}
								<CardForDataOfStaticMatches 
									credentials={top5Coord.userCredentials}
									coords={top5Coord.coords}
									profiletomatch={top5Coord.matchDataResults}
									thingid={top5Coord.thingId}
								/>
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



