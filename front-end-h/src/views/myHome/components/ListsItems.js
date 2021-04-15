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

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// cards
export default function ListsItems(props){
	// vars to hold props
	let classes = props.classes
    let top5Products = props.top5products
    let mtsBetweenDevicesToProducts = props.mtsbetweendevicestoproducts
	// print
	console.log(`classes & top5Products: ${classes} - ${JSON.stringify(top5Products)}`)

	// dayjs
	dayjs.extend(relativeTime);

    // product items list
    let itemJSx = []

	// loops
	for(let items in top5Products){
		// cheker
		if(top5Products.hasOwnProperty(items)){
			// print
			console.log(`items:${items}`)
            // map products
			top5Products[items].map((item)=>{
                //if(id === item.thingId){
                    // print
                    console.log(`item:${JSON.stringify(item)}`)
                    // push
                    itemJSx.push(
                        item
                    )
                //}
			})
		}
    }
    
    // match id
    itemJSx.map(JSx => {
        mtsBetweenDevicesToProducts.map((mtsBetweenDevicesToProduct)=>{
            let mts = mtsBetweenDevicesToProduct.meters
            let id = mtsBetweenDevicesToProduct.thingId

            if(JSx.thingId == id){
                <GridItem sm={6} md={3}>
                    <Card product>
                        <CardHeader image>
                            <a href="#pablo">
                                <img src={item.products.imgUrl} alt={item.thingId} />
                            </a>
                        </CardHeader>
                        <CardBody>
                            <h6
                                className={classNames(
                                    classes.cardCategory,
                                    classes.textRose
                                )}
                            >
                                {mts} mts
                            </h6>
                            <h4 className={classes.cardTitle}>{item.products.name}</h4>
                            <div className={classes.cardDescription}>
                                {item.products.description}
                            </div>
                        </CardBody>
                        <CardFooter className={classes.justifyContentBetween}>
                            <div className={classes.price}>
                                <h4>$ {item.products.price}</h4>
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
            }
        }) 
    })

    // return
    return(
        <Fragment>	
            <GridContainer>
                {itemJSx}
            </GridContainer>
        </Fragment>
    )
}
