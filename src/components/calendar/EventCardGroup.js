import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import moment from 'moment/moment';


const EventCardGroup = ({ calendarData }) => {


    return (
        <Grid.Column width={8}>
            {
                calendarData.map((item, index) => {
                    return (
                        <Card fluid={true} key={index} color="black">
                            <Card.Content textAlign="left">
                                <Header as="h3" style={timestampStyle}>
                                    {moment.unix(item.eventStartTimestamp).format('DD ddd HH:mm')} - {moment.unix(item.eventEndTimestamp).format('HH:mm')}
                                </Header>
                            </Card.Content>
                            <Card.Description>
                                <Header as="h1">
                                    {item.eventSummary}
                                </Header>
                            </Card.Description>
                        </Card>
                    )
                })
            }
        </Grid.Column>
    )
};


export default EventCardGroup;