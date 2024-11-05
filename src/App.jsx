/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './routing'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routing />
    </Router>
  )
}

export default App