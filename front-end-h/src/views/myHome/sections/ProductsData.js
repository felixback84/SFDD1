import React, { Component } from 'react'
// mui stuff
import { withStyles } from "@material-ui/core/styles";
// components
import ListsItems from "../components/ListsItems";
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../../redux/actions/heartbeatUIActions';
// styles
import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";
const useStyles = productStyle;


class ProductsData extends Component {

	render() {
		// redux state
		const {
			classes, 
			thingLiveDataSets:{
				top5Products,
				mtsBetweenDevicesToProducts
			}
		} = this.props;

		console.log("hi from products")

		return(
			<div>
				<ListsItems 
					top5products={top5Products} 
					classes={classes}
					mtsbetweendevicestoproducts={mtsBetweenDevicesToProducts}
				/>
      		</div>
		)
	}
}

// connect to global state in redux
const mapStateToProps = (state) => ({
  	thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
});

export default connect(mapStateToProps,{heartbeatThingSyncDataWithLiveDB})(withStyles(useStyles)(ProductsData));

