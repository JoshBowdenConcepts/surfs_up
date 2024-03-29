import React, {  useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';
require('react-vis')


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
    }, [forecastData])

    const reactVisData: any[] = forecast.map((item, index) => {
        return {
            x: index,
            y: item.waves
        }
    });

    // console.table(reactVisData)

    return (
        <ForecastContainer>
            <ForecastChart id="forecast_chart">
                {/* Using React Vis: https://uber.github.io/react-vis/ */}
                {/* Todo: Get this to show data based on date not index*/}
                <XYPlot height={300} width={360} margin={{
                    top: 10
                }}>
                    <HorizontalGridLines />
                    <LineSeries data={reactVisData} curve={'curveNatural'} />
                    <XAxis title="Time/Date" />
                    <YAxis title="Wave Height" />
                </XYPlot>
            </ForecastChart>
        </ForecastContainer>
    )
}

const ForecastContainer = styled.div`
  width: 100%;
`

const ForecastChart = styled.div`
  width: 100%;
`

export default Forecast 