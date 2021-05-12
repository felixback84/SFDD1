import React from 'react'
// mui core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Chip from '@material-ui/core/Chip';
// @material-ui/icons 
import Favorite from "@material-ui/icons/Favorite";
import Share from "@material-ui/icons/Share";
// style 
import styles from "assets/theme/components/sectionCards.js";
const useStyles = makeStyles(styles);

// badges
const ArrayListBadge = (props) => {
    let matchDataResults = props.matchdataresults
    let arrWithTags = [];
    let counter = 0
    for (let keyPair in matchDataResults) {
        arrWithTags.push(matchDataResults[keyPair].map((item)=><Chip label={item} key={counter++}/>))
    }  
    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                {arrWithTags}
            </GridItem>
        </GridContainer>
    )
}

const ContentBoxMarkerTop5TagsModeOne = (props) => {
    // styles
    const classes = useStyles();
    // props
    const {
        userCredentials:{
            bio,
            email,
            imgUrl,
            lastName,
            names,
            type,
            userHandle 
        }
    } = props

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={4}>
                    <Card color="info">
                        <CardBody color>
                            {/* company name */}
                            <h5 className={classes.cardCategorySocialWhite}>
                                {type}
                            </h5>
                            {/* arr of badges */}
                            <ArrayListBadge profiletomatch={props.profiletomatch}/>
                            {/* bio */}
                            <h4 className={classes.cardTitleWhite}>
                                {bio}
                            </h4>
                        </CardBody>
                        <CardFooter>
                        <div className={classes.authorWhite}>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                {/* profile image */}
                                <img
                                    src={imgUrl}
                                    alt="..."
                                    className={classes.imgRaised + " " + classes.avatar}
                                />
                                {/* names & lastname */}
                                <span>Talk with: {`${names} ${lastName}`}</span>
                                {/* email */}
                                <span>Write to: {email}</span>
                                {/* userHandle */}
                                <span>See the profile of: {userHandle}</span>
                            </a>
                        </div>
                        <div
                            className={classes.statsWhite + " " + classes.mlAuto}
                        >
                            <Favorite />
                            2.4K ·
                            <Share />
                            45
                        </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default ContentBoxMarkerTop5TagsModeOne