import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import DocumentQuill from './DocumentQuill';


class App extends Component {
  render() {
    return (
      <div>
        <DocumentQuill></DocumentQuill>
      </div>
    );
  }
}

export default App;
