import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import keys from './config/keys'

var exampleData = require('./example_forecast_devereux.json')

type LocationProps = {
    name: string;
    spotId: number;
}

interface ServerResponse {
    data: ServerData
}
  
interface ServerData {
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

const Location = ({
    name,
    spotId,
    ...props
}: LocationProps) => {
    const [data, setData] = useState(exampleData);
    const [check, setCheck] = useState('Using Example Data')

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/?spotId=${spotId}`)
            .then((response) => {
                return response.json()
            })
            .then((response: ServerData) => {
                setData(response);
                setCheck('Live Data')
            })
            .catch(() => {
                setData(exampleData);
            })
    }, [spotId])

    return (
        <LocationContainer>
            <h2>{name}</h2>
            <p className="data_status"><i>{check}</i></p>
        </LocationContainer>
    );
}

const LocationContainer = styled.div`
  padding: 10px;
  box-sizing: border-box;
  background: white;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  margin: 10px;

  .data_status {
    text-align: center;
    font-size: 12px;
    color: red;
    padding: 7px 0px;
  }
`

export default Location;