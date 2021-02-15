import React, { Component } from 'react';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Skeleton from "components/Loaders/Skeleton.js";
// componets
import HeartbeatUIHeader from './HeartbeatUIHeader';
import HeartbeatUIStatus from './HeartbeatUIStatus';
import HeartbeatUIDataSens from './HeartbeatUIDataSens';
import HeartbeatUIMyProfile from './HeartbeatUIMyProfile';
import HeartbeatUISearchingMode from './HeartbeatUISearchingMode';
import HeartbeatUIGoogleMaps from './HeartbeatUIGoogleMaps';
// Redux stuff
import { connect } from 'react-redux';
import { heartbeatThingSyncDataWithLiveDB } from '../../../redux/actions/heartbeatUIActions';
import { getUserDevice } from '../../../redux/actions/userDevicesActions';
// styles
import heartbeatUIStyle from "assets/jss/material-kit-pro-react/views/heartbeatUIStyle.js"
const useStyles = heartbeatUIStyle;

class HeartbeatUI extends Component {
    //redux action
    componentWillMount(){
        // liveDataSets Data
        const thingId = this.props.thingid;
        this.props.heartbeatThingSyncDataWithLiveDB(thingId);
        // userDevixe data
        const userDeviceId = this.props.userdeviceid;
        this.props.getUserDevice(userDeviceId);
    } 

    render(){  

        // props
        const {
            classes,
            thingLiveDataSets:{
                active,
                batteryLife,
                colorValue,
                connectionStatus,
                coords,
                createdAt,
                motorSpeed,
                nameOfDevice,
                profileToMatch,
                searchingMode,
                thingId,
                top5Coords,
                mtsBetweenDevices
            },
            userDevices1:{
                loading,
                userDevice
            }
        } = this.props;

        // underscore
        let _ = require('underscore');
        // less distances in mts for matches
        let resMts = _.min(mtsBetweenDevices, function(o){ 
                return o.meters; 
            }
        )
        // pick data from the closer match
        let top5CoordData = top5Coords.filter(top5Coord => {
            if(_.isEqual(top5Coord.thingId,resMts.thingId)){
                return top5Coord
            }    
        })
        // markup
        let heartbeatUIMarkUp = !loading ? (
            <div>
                {/* data cards */}
                <div className={classes.sectionGray}>
                    <div className={classes.container}>
                        <GridContainer>
                            {/* Header */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUIHeader
									userdevice={userDevice}
								/>
                            </GridItem> 
							{/* Status Thing */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUIStatus
                                    active={active}
                                    thingid={thingId}
                                    connectionstatus={connectionStatus}
                                    batterylife={batteryLife}
								/>
                            </GridItem>
							{/* Data sens Thing */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUIDataSens
									createdat={createdAt}
									colorvalue={colorValue}
                                    motorspeed={motorSpeed}
                                    mtsbetweendevices={resMts.meters}
                                    top5coorddata={top5CoordData}
								/>
                            </GridItem> 
							{/* My profile sens Thing */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUIMyProfile
									userdeviceid={this.props.userdeviceid}
								/>
                            </GridItem>
							{/* Searching mode Thing */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUISearchingMode
									userdeviceid={this.props.userdeviceid}
								/>
                            </GridItem>
							{/* Maps mode Thing */}
                            <GridItem xs={12} sm={12} md={12}>
								<HeartbeatUIGoogleMaps
									userdeviceid={this.props.userdeviceid}
								/>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        ) : (
        	<Skeleton/>
        );

        return (
            <div>
                {heartbeatUIMarkUp}
            </div>
            
        );
    }  
}  

// redux state
const mapStateToProps = (state) => ({
    thingLiveDataSets: state.heartbeatThing1.thingLiveDataSets,
    userDevices1: state.userDevices1
})
//export default Device;
export default connect(mapStateToProps,{heartbeatThingSyncDataWithLiveDB,getUserDevice})(withStyles(useStyles)(HeartbeatUI));