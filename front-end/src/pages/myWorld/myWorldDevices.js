import React, { Component } from 'react';

// mui stuff
import Grid from '@material-ui/core/Grid';

// Proptypes
import PropTypes from 'prop-types'; 

// Components
import UserDevice from '../../components/myWorld/userDevices/UserDevice';
import UserDeviceSkeleton from '../../utilities/UserDeviceSkeleton';
 
// Redux stuff
import { connect } from 'react-redux';
import { getUserDevices } from '../../redux/actions/userDevicesActions';

class myWorldDevices extends Component {

    componentDidMount() {
        this.props.getUserDevices(); 
    }

    render() {
        const { userDevices, loading } = this.props;
        
        let userDevicesMarkup = !loading ? (
            userDevices.map(userDevice => <UserDevice key={userDevice.userDeviceId} userDevice={userDevice}/>)
        ) : (
            <UserDeviceSkeleton/>
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={12} xs={12}>
                    {userDevicesMarkup}
                </Grid>
            </Grid> 
        );
    } 
}

// myWorldDevices.propTypes = {
//     user: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    userDevices: state.userDevices1.userDevices,
    loading: state.userDevices1.loading
})

export default connect(mapStateToProps, {getUserDevices})(myWorldDevices);
