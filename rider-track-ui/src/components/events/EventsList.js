import React from 'react';
import { Card, Divider, FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import './events.css';
import { live, upcoming, completed } from './EventsConstants';
import { EventListItem } from './EventListItem';

/*
    Component that renders the list of events in the web browser
    Author: Sai Saran Kandimalla
    Date: 09/23/2019
    US: 30
    The state management has been referred from : https://material-ui.com/components/selects/
*/
export const EventsList = () => {
    const [state, setState] = React.useState({
        header: live
    });

    const handleEventTypeChange = (name) => (event) => {
        setState({
            header: event.target.value
        });
    }

    // remove after AJAX call to backend is made.
    const numbers = [1,2,3,4,5,6]

    return (
        <Card className="rt-events-card">
            <div className="row">
                <div className="col-md-4">
                    <h1 className="rt-events-header">{state.header}</h1>
                </div>
                <div className="col-md-8">
                    <div className = "rt-event-type-dropdown">
                        <FormControl>
                            <NativeSelect
                                inputProps = {{
                                    name: "event-type-selector"
                                }}
                                onChange = {handleEventTypeChange("event-type-selector")}
                            >
                                <option value={live}>Live</option>
                                <option value={upcoming}>Upcoming</option>
                                <option value={completed}>Completed</option>
                            </NativeSelect>
                            <FormHelperText>select events type</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </div>
            <Divider className="row" />
            <div>
                <ul>
                    {numbers.map((el) =><div><li><EventListItem/></li>
                    <Divider variant="middle" /></div>)}
                </ul>
            </div>
        </Card>
    );
}

