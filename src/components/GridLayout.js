import React from 'react'
import { Grid } from 'semantic-ui-react'
import DateCard from './weather/DateCard'
import WeatherCard from './weather/WeatherCard'
import ForecastCard from './weather/ForecastCard';
import EventCardGroup from './calendar/EventCardGroup'; 

// Should be able to support more forecasts for bigger displays
const forecastCount = 4;

const GridLayout = ({ weatherData, calendarData }) => {

  const forecastList = weatherData.list.slice(1, forecastCount + 1);

  return (
    <Grid celled='internally'>
      <Grid.Row>
        <Grid.Column width={8}>
          <DateCard></DateCard>
          <WeatherCard weatherData={weatherData}></WeatherCard>
          <ForecastCard forecastList={forecastList}></ForecastCard>
        </Grid.Column>
            <EventCardGroup calendarData={calendarData}></EventCardGroup>
      </Grid.Row>
    </Grid>
  );
}

export default GridLayout
