import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import FileSelection from './FileSelection';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import DocumentQuill from './DocumentQuill';


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<FileSelection/>}/>
          <Route path="/:id" element={<DocumentQuill/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
