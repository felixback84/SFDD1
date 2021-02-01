import React, { Component } from "react";
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// core components
import Carousel from "react-slick";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
// components
import GoogleMaps from './GoogleMaps'
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
		}=this.props

		// map list
    let listOfMatches = top5Coords.map(top5Coord => 
      <div>
				<div
					style={{ backgroundImage: `url("${image1}")` }}
				>
					<div className={classes.container}>
						<GridContainer>
							<GridItem xs={12} sm={4} md={4}>
								<h1 className={classes.title}></h1>
								<h4>
									<div className={classes.container}>
										<GridContainer>
											<GridItem xs={12} sm={6} md={6}>
												<h1 className={classes.title}>Material Kit PRO React</h1>
												<h4>{top5Coord.userCredentials.userHandle}</h4>
											</GridItem>
										</GridContainer>
									</div>
								</h4>
							</GridItem>
							<GridItem xs={12} sm={8} md={8}>
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
      dots: true,
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