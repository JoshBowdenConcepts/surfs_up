import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import d3 from 'd3'

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

interface ParsedForecastData {
    date: string
    waves: number
}

const Forecast = ({
    forecastData
}: ForecastProps) => {
    const [forecast, updateForecast] = useState([{
        date: 'Some Date',
        waves: 6
    }]);

    useEffect(() => {
        // Update to a mapped object that has just the time and swell height
        updateForecast(forecastData.map((x: ForecastData, i: number) => {
            return {
                date: moment.unix(x.localTimestamp).format("MM/DD/YYYY, h:mm a"),
                waves: x.swell.components.combined.height
            }
        }))
    }, [])

    return (
        <ForecastContainer>
            {forecast.map((x: any, i: number) => <p key={i}>{x.date}: {x.waves} ft waves</p>)}
        </ForecastContainer>
    )
}

const ForecastContainer = styled.div`
  width: 100%;
`

export default Forecast 