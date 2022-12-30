import React from 'react';
import { Card, Header } from 'semantic-ui-react'
import { roundToNearest, displayTempUnit } from '../../utils';

const headerStyle = {
  paddingTop:"8px",
  paddingBottom:"8px",
}


const WeatherCard = ({ weatherData }) => {
  const currentWeather = weatherData.list[0];
  return (
    <Card fluid={true} color="black">
      <Card.Header style={headerStyle}>
        <Header as="h2">
          {roundToNearest(currentWeather.main.temp)} ({roundToNearest(currentWeather.main.feels_like)}) {displayTempUnit()}
        </Header>
      </Card.Header>
      <Card.Content>
        <Header as="h3">
          {currentWeather.weather[0].description}
        </Header>
      </Card.Content>
      <Card.Content>
        <Header as="h2">
          {roundToNearest(currentWeather.main.temp_min)} / {roundToNearest(currentWeather.main.temp_max)} {displayTempUnit()}
        </Header>
      </Card.Content>
    </Card>
  );
}

export default WeatherCard;