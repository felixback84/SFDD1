import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
// mui stuff
// import GridContainer from "components/Grid/GridContainer.js"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Grid from '@mui/material/Grid'
// components
import DataFrameSelectedProductModeFive from "../../components/modeFive/DataFrameSelectedProductModeFive"
import DataFrameSelectedProductLiveModeFive from "../../components/modeFive/DataFrameSelectedProductLiveModeFive"
// Redux stuff
import { connect } from 'react-redux'
// css
import shoppingCartStyle from "../../../../assets/theme/material-kit-pro-react/shoppingCartStyle.js"
const useStyles = shoppingCartStyle


class ProductsResultsSelectedItemsSearchingModeFive extends Component {

    
    render() {
        // redux state & style
        const {
            classes,
            // products
            loading,
            top5Products,
            top5Product,
            top5ProductListener
        } = this.props

        // data to pass
        const dataOfTop5ProductsToPass = top5ProductListener.length != 0 ? top5ProductListener : top5Products

        return (
            <>  
                {/* Page content */}
                <Card classes={{ root: classes.cardRoot }}>
                    {/* Header */}
                    {/* title table header  */}
                    <CardHeader
                        className={classes.cardHeader}
                        title={"Products selected: "} 
                        titleTypographyProps={{
                            component: Box,
                            marginBottom: "0!important",
                            variant: "h3",
                        }}
                    >
                    </CardHeader> 
                    {
                        loading === false && this.props.top5ProductListener.length === 0 ? 
                            <>
                                <Grid container>
                                    <DataFrameSelectedProductModeFive
                                        data={
                                            dataOfTop5ProductsToPass 
                                        } 
                                        classes={classes}
                                    />
                                </Grid>
                            </> 
                            :
                            <>
                                <Grid container>
                                    <DataFrameSelectedProductLiveModeFive
                                        lengthProductsSelected={this.props.thingLiveDataSetsListener.idOfSpecificProducts.length}
                                    />
                                </Grid>
                            </>
                    }
                </Card>
            </>
        )
    }
}
 
// connect to global state in redux
const mapStateToProps = (state) => ({
    // liveDataSets
    thingLiveDataSetsListener:state.heartbeatThing1.thingLiveDataSetsListener,
    // top5Products 
    loading: state.top5Products1.loading,
    top5Products:state.top5Products1.top5Products,
    top5Product:state.top5Products1.top5Product,
    top5ProductListener:state.top5Products1.top5ProductListener,
    // top5ProductsUI:state.top5Products1.top5ProductsUI
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProductsResultsSelectedItemsSearchingModeFive))


