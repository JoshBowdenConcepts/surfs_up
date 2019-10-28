import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

type ForecastProps = {
    forecastData: ForecastData[]
}

interface ForecastData {
    timestamp: number
    localTimestamp: number
    issueTimestamp: number
    fadedRating: number
    solidRating: number
    swell: {
        absMinBreakingHeight: number
        absMaxBreakingHeight: number
        probability: number
        unit: string
        minBreakingHeight: number
        maxBreakingHeight: number
        components: {
            combined: {
                height: number
                period: number
                direction: number
                compassDirection: string
            }
            primary: {
                height: number
                period: number
                direction: number
                compassDirection: string
            }
            secondary: {
                height: number
                period: number
                direction: number
                compassDirection: string
            }
        }
        wind: {
            speed: number
            direction: number
            compassDirection: string
            chill: number
            gusts: number
            unit: string
        }
        condition: {
            pressure: number
            temperature: number
            weather: string
            unitPressure: string
            unit: string
        }
        charts: {
            swell: string
            period: string
            wind: string
            pressure: string
            sst: string
        }
    }
}

const Forecast = ({
    forecastData
}: ForecastProps) => {
    return (
        <ForecastContainer>
            {forecastData.map((x: any, i: number) => <p key={i}>{moment.unix(x.localTimestamp).format("MM/DD/YYYY, h:mm a")}: {x.swell.components.combined.height} ft waves</p>)}
        </ForecastContainer>
    )
}

const ForecastContainer = styled.div`
  width: 100%;
`

export default Forecast