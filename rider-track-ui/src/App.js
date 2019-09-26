import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { EventsList } from './components/events/EventsList';
import EventCreationForm from './components/eventcreation/EventCreationForm';
import EventsDetail from './components/events_detail/EventsDetail';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={EventsList} />
            <Route path="/createevent" component={EventCreationForm} />
            <Route path="/event/:id" component={EventsDetail} />
          </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
