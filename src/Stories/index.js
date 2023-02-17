import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import Stories from './Stories'

const stories=[
    {
        id:1,
        user:"Agasta",
        url:'https://source.unsplash.com/random/900x600',
    },
    {
        id:2,
        user:"Lowe",
        url:'https://source.unsplash.com/user/erondu/900x600',
    },
    {
        id:3,
        user:"Nimmy",
        url:'https://source.unsplash.com/collection/190725/900x600',
    },
    {
        id:4,
        user:"Charles",
        url:'https://source.unsplash.com/collection/190727/900x600',
    },
    {
        id:5,
        user:"Johny",
        url:'https://source.unsplash.com/collection/190726/900x600',
    }
]

export default class App extends React.Component{
    state={
        ready:false
    }
    async componentDidMount(){
        let imgUrls=[]
        stories.map(story=>{
            Image.prefetch(story.url,(res)=>imgUrls.push(res))
        })

        Promise.all(imgUrls).then((res)=>{
            let downloadedAll=true

            imgUrls.map(res=>{
                if(!res){
                    downloadedAll=false
                }
            })

            if(downloadedAll){
                this.setState({ready:true})
            }
        })
    }

    render(){
        const {ready}=this.state
        if(!ready){
            return <ActivityIndicator size="large" color="blue" />
        }
        return(
            <Stories {...{stories}} />
        )
    }
}