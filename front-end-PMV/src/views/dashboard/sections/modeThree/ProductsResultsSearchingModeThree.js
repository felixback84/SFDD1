import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles"
// nodejs library that concatenates classes
import classNames from "classnames";
// mui stuff
import GridContainer from "components/Grid/GridContainer.js"
import GridItem from "components/Grid/GridItem.js"
import Button from "../../../../components/CustomButtons/Button.js"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter"
import Tooltip from "@material-ui/core/Tooltip"
// mui icons
import Favorite from "@material-ui/icons/Favorite";
// Redux stuff
import { connect } from 'react-redux';
// css
import shoppingCartStyle from "../../../../assets/theme/material-kit-pro-react/shoppingCartStyle.js"
const useStyles = shoppingCartStyle;

class ProductsResultsSearchingModeThree extends Component {

    // create the list of nodes
    arrTop5Products(arrTop5Products,classes){
        // var to hold the list of nodes
        let arr = []
        // loop
        arrTop5Products.map((arrTop5Product)=>{
            // print
            console.log(`arrTop5Product: ${arrTop5Product}`)
            // arr push
            arr.push(
                <div>
                    <GridItem sm={6} md={3}>
                        <Card product>
                            <CardHeader image>
                                <a href="#pablo">
                                    <img  alt="cardProduct" />
                                </a>
                            </CardHeader>
                            <CardBody>
                                <h6
                                    className={classNames(
                                        classes.cardCategory,
                                        classes.textRose
                                    )}
                                >
                                    Trending
                                </h6>
                                <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                                <div className={classes.cardDescription}>
                                    {/* description */}
                                    {arrTop5Product.products.description}
                                </div>
                            </CardBody>
                            <CardFooter className={classes.justifyContentBetween}>
                                <div className={classes.price}>
                                    <h4>$1,459</h4>
                                </div>
                                <div className={classes.stats}>
                                    <Tooltip
                                        id="tooltip-top"
                                        title="Save to Wishlist"
                                        placement="top"
                                        classes={{ tooltip: classes.tooltip }}
                                    >
                                        <Button justIcon color="rose" simple>
                                            <Favorite />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </div>
            )
        })
        return arr
    }
    
    render() {
        // redux state & style
        const {
            classes,
            // products
            loading,
            top5Products
        } = this.props

        return (
            <>
                <GridContainer>
                    {/* arr of products */}
                    {
                        loading != true ?
                            this.arrTop5Products(top5Products,classes) :
                                <p>...loading products</p>
                    }
                </GridContainer>
            </>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    // top5Products
    loading: state.top5Products1.loading,
    top5Products:state.top5Products1.top5Products
});

export default connect(mapStateToProps)(withStyles(useStyles)(ProductsResultsSearchingModeThree))


