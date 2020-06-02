import React, { Component } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Componets
import VideoPlayer from '../../util/VideoPlayer';
import HeaderToCardDevices from './deviceCard/HeaderToCardDevices';
import ContentToCardDevices from './deviceCard/ContentToCardDevices';
import ActionsToCardDevices from './deviceCard/ActionsToCardDevices';

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';

// styles
const styles = (theme) => ({
    card: {
        marginBottom: 20
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '0.5px rgba(0,0,0,0.1)',
        marginBottom: '1px'
    },
});

export class Device extends Component {
    
    render() {
        
        const {  
            classes,
            device:{
                deviceId,
                videoUrl, 
                nameOfDevice,
                howManyAdventures,
                description,
                ageRate,
                price,
                likesCount,
                createdAt,
                commentsCount,
                badgeUrl
                }
        } = this.props;

        return (
            <Card className={classes.card}>
                <HeaderToCardDevices 
                    nameofdevice={nameOfDevice} 
                    agerate={ageRate} 
                    deviceid={deviceId}
                    price={price}
                />
                <VideoPlayer url={videoUrl} widht={100} />
                <ContentToCardDevices 
                    deviceid={deviceId}
                    description={description}
                    nameofdevice={nameOfDevice}
                    agerate={ageRate}
                    price={price}
                />
                <hr className={classes.visibleSeparator}/>
                <ActionsToCardDevices 
                    likescount={likesCount} 
                    commentscount={commentsCount}  
                    price={price}
                    deviceid={deviceId}
                />
            </Card>     
        )
    } 
}

export default withStyles(styles)(Device);
