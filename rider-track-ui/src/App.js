import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@material-ui/core';
import store, { persistor } from './store';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import EventsList from './components/events/EventsList';
import EventsDetail from './components/events_detail/EventsDetail';
import {
  HOME_ROUTE, EVENT_REGISTRATION_PATH, EVENT_DETAIL_PATH, EVENT_CREATION_PATH, LIVE_MAP,
  PARTICIPANT_HISTORY, REGISTERED_EVENT_DETAIL_PATH,
} from './RouteConstants';
import EventRegistrationForm from './components/eventregistration/EventRegistrationForm';
import EventCreationForm from './components/eventcreation/EventCreationForm';
import LiveEventMap from './components/maps/LiveEventMap';
import ParticipantHistory from './components/participant_history/ParticipantHistory';
import RegisteredEventDetail from './components/registered_event_detail/RegisteredEventDetail';

function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <div className="App">
          <BrowserRouter>
            <Header />
            <div>
              <Switch>
                <Route exact path={HOME_ROUTE} component={EventsList} />
                <Route path={EVENT_REGISTRATION_PATH} component={EventRegistrationForm} />
                <Route path={EVENT_DETAIL_PATH} component={EventsDetail} />
                <Route path={EVENT_CREATION_PATH} component={EventCreationForm} />
                <Route path={LIVE_MAP} component={LiveEventMap} />
                <Route path={PARTICIPANT_HISTORY} component={ParticipantHistory} />
                <Route path={REGISTERED_EVENT_DETAIL_PATH} component={RegisteredEventDetail} />
              </Switch>
            </div>
            <Footer />
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}


export default App;
