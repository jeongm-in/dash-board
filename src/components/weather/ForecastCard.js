import React from 'react';
import moment from 'moment/moment';
import { Card, Image, Header } from 'semantic-ui-react';
import { getIconURL, roundToNearest } from '../../utils';

// default open weather map icons don't look pretty on e-ink, so make them monotone black 
const iconStyle = {
    filter: "brightness(0)"
}

const ForecastCard = ({ forecastList }) => {
    return (
        <Card fluid={true} color="black">
            <Card.Content>
                <Card.Group itemsPerRow={4} centered>
                    {forecastList.map((item, index) => {
                        let time = moment.unix(item.dt);
                        return (
                            <Card key={index} color="black">
                                    <Image src={getIconURL(item.weather[0].icon)} size='small' style={iconStyle}></Image>
                                <Card.Header>
                                    <Header as="h2">
                                        {roundToNearest(item.main.temp)}
                                    </Header>
                                </Card.Header>
                                <Card.Content>
                                    <Header as="h3">
                                        {time.format("HH")}
                                    </Header>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </Card.Group>
            </Card.Content>
        </Card>
    );
}


export default ForecastCard;