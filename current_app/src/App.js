import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Annotation from './pages/annotation';
import Validation from './pages/validation';
import Cover from './pages/cover';
import Exploration from './pages/exploration';

class App extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path = "/" element = {<Cover />} />
                    <Route exact path = "/annotation" element = {<Annotation />} />
                    <Route exact path = "/validation" element = {<Validation />} />
                    <Route exact path= "/exploration" element = {<Exploration />} />
                </Routes>
            </div>
        )
    }
}

export default App;
