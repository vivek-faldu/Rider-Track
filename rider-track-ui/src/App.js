import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import { EventsList } from './components/events/EventsList';
import EventRegistrationForm from './components/eventregistration/EventRegistrationForm'; 

function App() {
    return (
        <div className="App">
            <Header />
                <EventsList/>
                <EventRegistrationForm/>
            <Footer />
        </div>
    );
}


export default App;
