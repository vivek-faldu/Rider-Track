import React from 'react';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import { EventsList } from './components/events/EventsList';

function App() {
    return (
        <div className="App">
            <Header />
                <EventsList/>
            <Footer />
        </div>
    );
}


export default App;
