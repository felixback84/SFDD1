import React, { Component, Fragment, useState } from 'react'
// mui
import Switch from '@mui/material/Switch';
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
// components
import GMapsServicesModeOne from '../../components/modeOne/GMapsServicesModeOne'
import GMapsServicesModeTwo from '../../components/modeTwo/GMapsServicesModeTwo'
import GMapsServicesModeThree from '../../components/modeThree/GMapsServicesModeThree'
import GMapsServicesModeFour from '../../components/modeFour/GMapsServicesModeFour'
import GMapsServicesModeFive from '../../components/modeFive/GMapsServicesModeFive'
import GMapsServicesModeSix from '../../components/modeSix/GMapsServicesModeSix'
import GMapsServicesModeSeven from '../../components/modeSeven/GMapsServicesModeSeven'
// modeOne
import ChartResultsSearchingModeOne from "../../sections/modeOne/ChartResultsSearchingModeOne"
// modeTwo
import ChartResultsSelectedItemsSearchingModeTwo from "../../sections/modeTwo/ChartResultsSelectedItemsSearchingModeTwo"
import ChartResultsSearchingModeTwo from "../../sections/modeTwo/ChartResultsSearchingModeTwo"
// modeThree
import ProductsResultsSearchingModeThree from "../../sections/modeThree/ProductsResultsSearchingModeThree"
// modeFour
import ProductsResultsSelectedItemsSearchingModeFour from "../../sections/modeFour/ProductsResultsSelectedItemsSearchingModeFour"
import ProductsResultsSearchingModeFour from "../../sections/modeFour/ProductsResultsSearchingModeFour"
// modeFive
import ProductsResultsSearchingModeFive from "../../sections/modeFive/ProductsResultsSearchingModeFive"
// modeSix
import ProductsResultsSelectedItemsSearchingModeSix from "../../sections/modeSix/ProductsResultsSelectedItemsSearchingModeSix"
import ProductsResultsSearchingModeSix from "../../sections/modeSix/ProductsResultsSearchingModeSix"
// modeSeven
import ChartResultsSearchingModeSeven from "../../sections/modeSeven/ChartResultsSearchingModeSeven"
import ChartResultsSelectedItemsSearchingModeSeven from "../../sections/modeSeven/ChartResultsSelectedItemsSearchingModeSeven"


// Redux stuff
import {connect} from 'react-redux'

// pick the right marker mix
const PickerMarkerMix = ({data,props}) => {

    // print
    console.log(`coordz:${JSON.stringify(data.coordz)}`)

    // hook state
    const [mode, setMode] = useState({
        checked: false,
    }) 

    // handleChange switch
    const handleChange = (event) => {
        setMode({ 
            [event.target.name]: event.target.checked
        })
    }

    // switcher
    switch(data.searchingMode){
        case "modeOne":
            if(data.loading == false){
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch 
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* GMaps Services */}
                                    <GMapsServicesModeOne
                                        checked={mode.checked}
                                        coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>

                        {/* chart top5Coords*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ChartResultsSearchingModeOne/>
                            </Grid>
                        </Grid>
                    </>	
                )
            }
        break;	
        case "modeTwo":	
            if(data.loading == false){
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch 
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* GMaps Services */}
                                    <GMapsServicesModeTwo
                                        checked={mode.checked}
                                        coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        {/* chart top5Coord specifics filter*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ChartResultsSelectedItemsSearchingModeTwo/>
                            </Grid>
                        </Grid>
                        {/* chart all top5Coords*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ChartResultsSearchingModeTwo/>
                            </Grid>
                        </Grid>
                    </>	 
                )
            }
        break;
        case "modeThree":	
            if(data.loading == false){
                console.log("modeThree")   
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch 
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* Gmaps */}
                                    <GMapsServicesModeThree
                                        checked={mode.checked}
                                        // coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid> 
                        {/* top5Products result */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card 
                                    classes={{ root: data.classes.cardRoot }} 
                                    style={{padding:"10px"}}
                                >
                                    {/* results */}
                                    <ProductsResultsSearchingModeThree/>
                                </Card>
                            </Grid>
                        </Grid>
                    </>	
                )
            }
        break;
        case "modeFour":
            if(data.loading == false){
                console.log("modeFour")	
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* Gmaps */}
                                    <GMapsServicesModeFour
                                        checked={mode.checked}
                                        //coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        {/* chart top5Products specific selection from user*/}
                        <Grid container>
                            <Grid item xs={12}> 
                                {/* results */}
                                <ProductsResultsSelectedItemsSearchingModeFour/>
                            </Grid>
                        </Grid>
                        {/* chart all top5Products*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ProductsResultsSearchingModeFour/> 
                            </Grid>
                        </Grid>
                    </>
                )
            }
        break;
        case "modeFive":
            if(data.loading == false){
                console.log("modeFive")	
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* Gmaps */}
                                    <GMapsServicesModeFive
                                        checked={mode.checked}
                                        //coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        {/* chart all top5Products*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ProductsResultsSearchingModeFive/> 
                            </Grid>
                        </Grid>
                    </>
                )
            }
        break;
        case "modeSix":
            if(data.loading == false){
                console.log("modeSix")	
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* Gmaps */}
                                    <GMapsServicesModeSix
                                        checked={mode.checked}
                                        //coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        {/* chart top5Products specific selection from user*/}
                        <Grid container>
                            <Grid item xs={12}> 
                                {/* results */}
                                <ProductsResultsSelectedItemsSearchingModeSix/>
                            </Grid>
                        </Grid>
                        {/* chart all top5Products*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ProductsResultsSearchingModeSix/> 
                            </Grid>
                        </Grid>
                    </>
                )
            }
        break;
        case "modeSeven":
            if(data.loading == false){
                console.log("modeSeven")	
                return(
                    <>
                        {/* map */}
                        <Grid container>
                            <Grid item xs={12}>
                                <Card classes={{ root: data.classes.cardRoot }}>
                                    {/* toogle */}
                                    <Switch
                                        size="small" 
                                        name="checked"
                                        checked={mode.checked}
                                        onChange={handleChange}
                                    />
                                    {/* Gmaps */}
                                    <GMapsServicesModeSeven
                                        checked={mode.checked}
                                        //coords={data.coords}
                                        colorvalue={data.colorValue}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                        {/* chart top5Coord specifics filter*/}
                        <Grid container>
                            <Grid item xs={12}>
                                {/* results */}
                                <ChartResultsSelectedItemsSearchingModeSeven/>
                            </Grid>
                        </Grid>
                        {/* chart top5Products specific selection from user*/}
                        <Grid container>
                            <Grid item xs={12}> 
                                {/* results */}
                                <ChartResultsSearchingModeSeven/> 
                            </Grid>
                        </Grid>
                    </>
                )
            }
        break;
        default:
            return(
                null
            )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products 
    loading: state.top5Products1.loading,
    top5Products:state.top5Products1.top5Products,
    top5ProductsListener:state.top5Products1.top5ProductsListener,
})

export default connect(mapStateToProps)(PickerMarkerMix)
    