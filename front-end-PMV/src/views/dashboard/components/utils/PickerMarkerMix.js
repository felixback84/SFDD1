import React, { Component, Fragment, useState } from 'react'
// mui
import Switch from '@mui/material/Switch';
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
// components
import GMapsServicesModeOne from '../../components/modeOne/GMapsServicesModeOne'
import GMapsServicesModeTwo from '../../components/modeTwo/GMapsServicesModeTwo'
// import GoogleMapModeTwo from '../modeTwo/GoogleMapModeTwo'
// import GoogleMapModeThree from '../modeThree/GoogleMapModeThree'
// modeOne
import ChartResultsSearchingModeOne from "../../sections/modeOne/ChartResultsSearchingModeOne"
// modeTwo
import ChartResultsSearchingModeTwo from "../../sections/modeTwo/ChartResultsSearchingModeTwo"
import ChartResultsSelectedItemsSearchingModeTwo from "../../sections/modeTwo/ChartResultsSelectedItemsSearchingModeTwo"
// modeThree
// import ProductsResultsSearchingModeThree from "../../sections/modeThree/ProductsResultsSearchingModeThree"

// pick the right marker mix
const PickerMarkerMix = ({data}) => {

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
        // case "modeThree":	
        //     if(data.loading == false){
        //         console.log("modeThree")
        //         return(
        //             <>
        //                 {/* map */}
        //                 <Grid container>
        //                     <Grid item xs={12}>
        //                         <Card classes={{ root: data.classes.cardRoot }}>
        //                             <GoogleMapModeThree
        //                                 coords={data.coordz}
        //                                 colorValue={data.color} 
        //                             />
        //                         </Card>
        //                     </Grid>
        //                 </Grid>
        //                 {/* top5Products result */}
        //                 <Grid container>
        //                     <Grid item xs={12}>
        //                         <Card 
        //                             classes={{ root: data.classes.cardRoot }} 
        //                             style={{padding:"10px"}}
        //                         >
        //                             {/* results */}
        //                             <ProductsResultsSearchingModeThree/>
        //                         </Card>
        //                     </Grid>
        //                 </Grid>
        //             </>	
        //         )
        //     }
        // break;
        // case "modeFour":	
        // 	return(
        // 		<MarkerInfoWindowModeFour 
        // 			coords={data.coords}
        // 			top5product={top5Product}
        // 		/>
        // 	)
        // break;
        default:
            return(
                null
            )
    }
}

export default PickerMarkerMix