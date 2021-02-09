import React, { Component } from 'react'
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
    import Divider from '@material-ui/core/Divider';
    // core components
    import Card from "components/Card/Card.js";
    import CardAvatar from "components/Card/CardAvatar.js";
    import CardBody from "components/Card/CardBody.js";
    import CardFooter from "components/Card/CardFooter.js";
    import Button from "components/CustomButtons/Button.js";
    // components
    import SwitchButtonToUserDevice from "../components/SwitchButtonToUserDevice"
    // styles
    import teamsStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/teamsStyle.js";
    const useStyles = teamsStyle;

class HeartbeatUIHeader extends Component {
    render() {
        // props
        const {
            classes, 
            userdevice:{
                userDeviceId,
                createdAt,
                thingId,
                device:{
                    badgeUrl,
                    coverUrl,
                    description,
                    nameOfDevice,
                    
                }
            }
        } = this.props;

        return (
            <div>
                <Card profile
                    background
                    style={{ backgroundImage: `url(${coverUrl})` }}
                >
                    <CardAvatar profile>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={badgeUrl} alt={thingId} />
                        </a>
                    </CardAvatar>
                    <CardBody background>
                        {/* switch active property */}
                        <SwitchButtonToUserDevice 
                            labelToSwitch={nameOfDevice} 
                            userdeviceid={userDeviceId}
                        />
                        <Divider variant="fullWidth" />
                        <h3 className={classes.cardTitleWhite}>
                            Mine since: {createdAt}
                        </h3>
                        <Divider variant="fullWidth" />
                        <p className={classes.cardDescription}>
                            {description}
                        </p>
                        <Button round color="warning">
                            ThingId: {thingId}
                        </Button>
                    </CardBody>
                    <CardFooter profile className={classes.justifyContent}/>
                </Card>
            </div>
        )
    }
}

export default (withStyles(useStyles)(HeartbeatUIHeader));
