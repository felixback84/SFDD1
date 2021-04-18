import React, { Component, Fragment } from 'react'
// nodejs library that concatenates classes
import classNames from "classnames";
// components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// Redux stuff
import { connect } from 'react-redux';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// cards
class ListsItems extends Component {

    render(){
        
        // dayjs
        dayjs.extend(relativeTime);

        // redux state
        const {
            classes,
            top5ProductsAndMtsBetweenDevicesToProducts
        } = this.props

        // var for cards
        let nodesList = []

        // map
        top5ProductsAndMtsBetweenDevicesToProducts.map((arr)=>{
            nodesList.push(
                <GridItem sm={6} md={3}>
                    <Card product>
                        <CardHeader image>
                            <a href="#pablo">
                                <img src={arr.products.imgUrl} alt={arr.thingId} />
                            </a>
                        </CardHeader>
                        <CardBody>
                            <h6
                                className={classNames(
                                    classes.cardCategory,
                                    classes.textRose
                                )}
                            >
                                {arr.meters} mts
                            </h6>
                            <h4 className={classes.cardTitle}>{arr.products.name}</h4>
                            <div className={classes.cardDescription}>
                                {arr.products.description}
                            </div>
                        </CardBody>
                        <CardFooter className={classes.justifyContentBetween}>
                            <div className={classes.price}>
                                <h4>$ {arr.products.price}</h4>
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
            )
        })

        // return
        return(
            <Fragment>	
                <GridContainer>
                    {nodesList}
                </GridContainer>
            </Fragment>
        )
    }
}

// connect to global state in redux
const mapStateToProps = (state) => ({
    //thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets
    top5ProductsAndMtsBetweenDevicesToProducts: state.heartbeatThing1.top5ProductsAndMtsBetweenDevicesToProducts
});

export default connect(mapStateToProps)(ListsItems);
