import React from 'react';
// mui stuff
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

// components
import ContentToDialogUserDevice from './ContentToDialogUserDevice';

const ChekerContentToDialogUserDevice = (props) => {
    const {
        createdat, 
        howmanyadventures, 
        description, 
        imgurl, 
        agerate,
        nameofdevice 
    } = props;

    return(
        props.loading ? (
            <CircularProgress size={20}/>
            ) : (
                <Grid container spacing={1} direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <ContentToDialogUserDevice 
                        createdat={createdat}
                        howmanyadventures={howmanyadventures}
                        description={description} 
                        imgurl={imgurl} 
                        agerate={agerate}
                        nameofdevice={nameofdevice} 
                    />
                </Grid>
            )
    )
}

export default ChekerContentToDialogUserDevice;