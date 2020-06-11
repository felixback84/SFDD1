import React, { Component } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Componets
import VideoPlayer from '../../util/VideoPlayer';
import HeaderToCardAdventures from './deviceCard/HeaderToCardAdventures';
import ContentToCardAdventures from './deviceCard/ContentToCardAdventures';
import ActionsToCardAdventures from './deviceCard/ActionsToCardAdventures';

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

export class Adventure extends Component {
    
    render() {
        
        const {  
            classes,
            adventure:{
                audioUrl,
                commentsCount,
                coverUrl,
                createdAt,
                description,
                device:{
                    badgeUrl,
                    nameOfDevice
                },
                duration,
                imgUrl,
                language,
                likesCount,
                price,
                tags,
                title,
                videoUrl
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <HeaderToCardAdventures
                    nameofdevice={nameOfDevice} 
                    agerate={ageRate} 
                    deviceid={deviceId}
                    price={price}
                />
                <VideoPlayer url={videoUrl} widht={100} />
                <ContentToCardAdventures
                    deviceid={deviceId}
                    description={description}
                    nameofdevice={nameOfDevice}
                    agerate={ageRate}
                    price={price}
                />
                <hr className={classes.visibleSeparator}/>
                <ActionsToCardAdventures
                    likescount={likesCount} 
                    commentscount={commentsCount}  
                    price={price}
                    deviceid={deviceId}
                />
            </Card>     
        )
    } 
}

export default withStyles(styles)(Adventure);