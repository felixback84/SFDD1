import React, { Component } from 'react';

// components
import DataSetHilda from './DataSetHilda';
import DataSetHalo from './DataSetHalo';
import UserDeviceSkeleton from '../../../../utilities/UserDeviceSkeleton';

// switch case
class DeviceIds extends Component {

    render(){
        // devices ids
        const HALO = 'MZInC971tJYurv3OYzjR';
        const HILDA = 'gE2ySDQaMymbZe0r6KEH';

        const {
            deviceid, 
            datasets,
            loading 
        } = this.props;
         
        switch(deviceid){
            case HILDA:
                // specific component
                let dataSetsHildaMarkup = !loading ? (
                    datasets.map(dataset => <DataSetHilda 
                                key={dataset.datasetid} 
                                dataset={dataset} 
                            />)
                    ) : (
                        <UserDeviceSkeleton/>
                    );
                return(dataSetsHildaMarkup);       
            case HALO:
                // specific component
                let dataSetsHaloMarkup = !loading ? (
                    datasets.map(dataset => <DataSetHalo 
                                key={dataset.datasetid} 
                                dataset={dataset} 
                            />)
                    ) : (
                        <UserDeviceSkeleton/>
                    );
                return(dataSetsHaloMarkup);
            default:
                return null; 
        } 
    } 
}
export default DeviceIds;