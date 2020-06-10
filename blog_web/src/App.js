import React from 'react';
import './App.css';

import {BlogsComponent} from "./blogs";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>BLOGST</h1>
                <div>
                    <BlogsComponent />
                </div>
            </header>
        </div>
    )
}

export default App;
