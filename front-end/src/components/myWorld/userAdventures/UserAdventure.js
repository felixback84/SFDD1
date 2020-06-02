import React, { Component } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Componets
import VideoPlayer from '../../util/VideoPlayer';
import HeaderToCardUserAdventure from './userAdventureCard/HeaderToCardUserAdventure';
import ContentToCardUserAdventure from './userAdventureCard/ContentToCardUserAdventure';
import ActionsToCardUserAdventure from './userAdventureCard/ActionsToCardUserAdventure';

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

export class UserAdventure extends Component {
    
    render() {
        
        const {  
            classes,
            userAdventure:{
                active,
                userAdventureId,
                adventureId,
                createdAt,
                userHandle,
                adventure:{
                    audioUrl,
                    description,
                    device:{
                        badgeUrl,
                        nameOfDevice
                    },
                    duration,
                    imgUrl,
                    language,
                    tags,
                    title,
                    videoUrl
                }
            }
            
        } = this.props;

        return (
            <Card className={classes.card}>
                <HeaderToCardUserAdventure 
                    title={title} 
                    tags={tags} 
                    useradventureid={userAdventureId}
                />
                <VideoPlayer url={videoUrl} widht={100} />
                <ContentToCardUserAdventure 
                    createdat={createdAt} 
                    nameofdevice={nameOfDevice} 
                    description={description}
                    title={title}
                    duration={duration}
                    language={language}
                />
                <hr className={classes.visibleSeparator}/>
                <ActionsToCardUserAdventure useradventureid={userAdventureId} adventureid={adventureId}/>
            </Card>     
        )
    } 
}

// UserDevice.propTypes = {
//     user: PropTypes.object.isRequired,
//     userDevice: PropTypes.object.isRequired,
//     classes: PropTypes.object.isRequired,
//     openDialog: PropTypes.bool
// }

export default withStyles(styles)(UserAdventure);
