import React from 'react';
import './App.css';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { EventsList } from './components/events/EventsList';
import EventRegistrationForm from './components/eventregistration/EventRegistrationForm'; 
import EventsDetail from './components/events_detail/EventsDetail';

function App() {
    return (
        <div className="App">
            <Header />
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path = "/" component = {EventsList}/>
                            <Route path = "/register" component = {EventRegistrationForm}/>
                            <Route path= "/event/:id" component = {EventsDetail}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            <Footer />
        </div>
    );
}


export default App;
