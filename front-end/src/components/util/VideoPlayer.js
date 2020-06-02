import React from 'react';
// react player
import ReactPlayer from "react-player"; 
// mui stuff
import CardMedia from '@material-ui/core/CardMedia';

export default function VideoPlayer(props) {

    return(
        <CardMedia className={props.className}>
            <ReactPlayer
                url={props.url}
                height={props.height}
                width= {`${props.width}%`}
            />
        </CardMedia>
    )

}    