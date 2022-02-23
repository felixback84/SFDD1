import React, { Component } from 'react'
// mui
import Switch from '@mui/material/Switch'
// redux
import { connect } from 'react-redux'
import {postListOfProductsOfStaticDevicesToFind} from "../../../../../redux/actions/uiActions"


class SwitchToSelectProductsModeThree extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
            checked:false,
            idSelected:[]
        }
	}

    // add products to the list of selected ones
    addIdToListOfSelectedProducts(event,id){
        // update state
        this.setState({
            [event.target.name]: event.target.checked,
            idSelected:[id]
        })
        // data to send
        let data = {
            userDeviceId:this.props.thingId.split("-").slice(2).toString(),
            listOfProducts:[
                {
                    productsId:idSelected,
                    staticDeviceProperty:this.props.staticdeviceproperty
                }
            ]
        }
        // redux action
        if(this.state.checked){
            this.props.postListOfProductsOfStaticDevicesToFind(data)
        }
    }

    render() {
        return (
            <>    
                <Switch
                    checked={this.state.checked}
                    onChange={(e)=>{
                        this.addIdToListOfSelectedProducts(e,this.props.id)
                    }}
                    name="checked"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    thingId:state.thingLiveDataSets.thingId,
    // top5Products 
    loading: state.top5Products1.loading,
})

export default connect(mapStateToProps,{postListOfProductsOfStaticDevicesToFind})(SwitchToSelectProductsModeThree)