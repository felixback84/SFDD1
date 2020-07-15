import React, { Component } from 'react';

// Proptypes
import PropTypes from 'prop-types';

// Componets
import HeaderToCardAdventures from './adventureCard/HeaderToCardAdventures';
import VideoPlayer from '../../util/VideoPlayer';
import ContentToCardAdventures from './adventureCard/ContentToCardAdventures';
import ActionsToCardAdventures from './adventureCard/ActionsToCardAdventures';

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
                adventureId,
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
                    title={title} 
                    price={price}
                    tags={tags}
                />
                <VideoPlayer url={videoUrl} widht={100} />
                <ContentToCardAdventures
                    adventureid={adventureId}
                    description={description}
                    nameofdevice={nameOfDevice}
                    tags={tags}
                    duration={duration}
                    language={language}
                    title={title}
                    createdat={createdAt}
                    price={price}
                />
                <hr className={classes.visibleSeparator}/>
                <ActionsToCardAdventures
                    likescount={likesCount} 
                    commentscount={commentsCount}  
                    price={price}
                    adventureid={adventureId}
                />
            </Card>     
        )
    } 
}

export default withStyles(styles)(Adventure);