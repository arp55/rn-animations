import React from 'react'
import { View } from 'react-native'
import List from './List'

const btns=[
    "Total Points","Total Points","Total Points","Total Points"
]

function Accordion() {
    return (
        <>
            {btns.map((btn,i)=>{
                return(
                    <List key={i} btn={btn} />
                )
            })}
        </>
    )
}

export default Accordion