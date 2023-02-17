import React, { Component } from 'react'

import WeightTarget from './components/WeightTarget'

export default class App extends Component {
    render() {
        return (
            <WeightTarget weight={72} height={1.75} />
        )
    }
}