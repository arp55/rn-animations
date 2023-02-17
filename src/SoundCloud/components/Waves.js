import React, { Component } from 'react'
import { Dimensions, Animated } from 'react-native'

import Svg, {Rect,Defs,ClipPath} from 'react-native-svg'

type Props={
    waveform:{
        width:number;
        height:number;
        samples:number[];
    },
    color:string;
    progress?:number;
}

const AnimatedRect=Animated.createAnimatedComponent(Rect)

const {width:wWidth}=Dimensions.get("window")

const barWidth=4
const barMargin=1
const offset=wWidth/2

export default class Waves extends Component<Props> {
    render(){
        const {waveform,color,progress}=this.props
        const width=waveform.width*(barWidth+barMargin)+offset
        const height=waveform.height+barMargin+(waveform.height*0.60)
        const x = progress ? progress.interpolate({
          inputRange: [0, width-wWidth-offset, width-wWidth],
          outputRange: [`${-width + offset}`,`-${wWidth}`, `0`],
        }) : 0;
        return (
            <Svg {...{width}} {...{height}}>
                <Defs>
                    <ClipPath id="progress">
                        <AnimatedRect x={x} {...{width,height}} />
                    </ClipPath>
                </Defs>
                {
                    waveform.samples.map((sample, key) => (
                    <Rect
                        clipPath="url(#progress)"
                        width={barWidth}
                        height={sample}
                        fill={color}
                        x={key * (barWidth + barMargin) + offset}
                        y={waveform.height - sample}
                        {...{ key }}
                    />
                    ))
                }
                {
                    waveform.samples.map((sample, key) => (
                    <Rect
                        clipPath="url(#progress)"
                        width={barWidth}
                        height={sample * 0.61}
                        fill={color}
                        x={key * (barWidth + barMargin) + offset}
                        y={waveform.height + barMargin}
                        {...{ key }}
                    />
                    ))
                }
            </Svg>
        )
    }
}