import React, { Component } from 'react'
import GoogleMaps from '.components/GoogleMaps'

export default class graphs extends Component {
    render() {
        return (
            <div>
                <GoogleMaps coords={coords}/>
            </div>
        )
    }
}
