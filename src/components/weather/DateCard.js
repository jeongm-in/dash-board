import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import moment from 'moment/moment';

    
const DateCard = () => (
    <Card fluid={true} color="black">
        <Card.Content>
            <Header as="h2">
                {moment().format('dddd, MMMM DD')}
            </Header>
        </Card.Content>
        <Card.Content>
            <Header as="h2">
                {moment().format('HH:mm')}
            </Header>
        </Card.Content>
    </Card>
);


export default DateCard;