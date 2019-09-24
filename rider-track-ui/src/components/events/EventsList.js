import React from 'react';
import { Card, Divider, FormControl, NativeSelect, FormHelperText } from '@material-ui/core';
import './events.css';
import { live, upcoming, completed } from './EventsConstants';

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
                    <li> {state.header} one</li>
                    <Divider variant="middle" />
                    <li> {state.header} two</li>
                    <Divider variant="middle" />
                    <li>{state.header} three</li>
                </ul>
            </div>
        </Card>
    );
}

