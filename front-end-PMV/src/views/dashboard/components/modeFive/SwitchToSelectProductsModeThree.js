import React, { Component } from 'react'
// mui
import Switch from '@mui/material/Switch'
// redux
import { connect } from 'react-redux'
import {postListOfProductsOfStaticDevicesToFind} from "../../../../redux/actions/top5ProductsActions"


class SwitchToSelectProductsModeThree extends Component {

    // state
	constructor(props) {
		super(props)
		this.state = {
            checked:false,
            idSelected:[],
            counterPost:0
        }
	}

    // add products to the list of selected ones
    addIdToListOfSelectedProducts(event){
        // update state

        this.setState((prevState, props) => ({
            [event.target.value]: event.target.checked,
            idSelected:[props.id],
            counterPost:prevState.counterPost++
        }));

        // this.setState({
        //     // [e.target.name]: e.target.checked,
        //     checked:true,
        //     idSelected:[id],
        //     counterPost:this.state.counterPost++
        // })
        console.log(`this.state:${JSON.stringify(this.state)}`)
        // checker
        if(this.state.checked && this.state.counterPost === 1){
            // data to send
            let data = {
                userDeviceId:this.props.thingId.split("-").slice(2).toString(),
                listOfProducts:[
                    {
                        productsId:this.state.idSelected,
                        staticDeviceProperty:this.props.staticdeviceproperty
                    }
                ]
            }
            // redux action
            this.props.postListOfProductsOfStaticDevicesToFind(data)
        }
    }

    render(){
        return (
            <>    
                <Switch
                    checked={this.state.checked}
                    onChange={(e)=>{
                        this.addIdToListOfSelectedProducts(e,this.props.id)
                    }}
                    value="checked"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    thingId:state.heartbeatThing1.thingLiveDataSets.thingId,
    // top5Products 
    loading: state.top5Products1.loading,
})

export default connect(mapStateToProps,{postListOfProductsOfStaticDevicesToFind})(SwitchToSelectProductsModeThree)