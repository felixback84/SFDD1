import React, { Component } from 'react'
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// components
import ListsItems from "../components/ListsItems";
// Redux stuff
import { connect } from 'react-redux';
import { productMeassures } from '../../../redux/actions/heartbeatUIActions';
// styles
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
const useStyles = productStyle;


class ProductsData extends Component {

	// componentDidMount() {
	// let top5Products = this.props.top5Products
	// let mtsBetweenDevicesToProducts = this.props.mtsBetweenDevicesToProducts
	// 	// redux action
	// 	this.props.productMeassures(top5Products,mtsBetweenDevicesToProducts)
	// 	// print
	// 	console.log(`top5Products: ${JSON.stringify(top5Products)}`)
	// }

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		let top5Products = this.props.top5Products
		let mtsBetweenDevicesToProducts = this.props.mtsBetweenDevicesToProducts
		if (this.props.mtsBetweenDevicesToProducts !== prevProps.mtsBetweenDevicesToProducts) {
		  	// liveDataSets & products redux action
		  	this.props.productMeassures(top5Products,mtsBetweenDevicesToProducts)
		}
	}

	render() {
		// redux state	
		const {
			classes, 
		} = this.props;

		console.log("hi from products")

		return(
			<div>
				<ListsItems 
					classes={classes}
				/>
      		</div>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
	//thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
	top5Products: state.heartbeatThing1.thingLiveDataSets.top5Products,
	mtsBetweenDevicesToProducts: state.heartbeatThing1.thingLiveDataSets.mtsBetweenDevicesToProducts,
	//load:state.heartbeatThing1.load
});

export default connect(mapStateToProps,{productMeassures})(withStyles(useStyles)(ProductsData));

