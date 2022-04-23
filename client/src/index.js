import React from 'react';

import ReactDom from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDom.render(
  <BrowserRouter>
  <ToastContainer autoclose={3000}/>
  <App/>
  </BrowserRouter>
,document.getElementById('root'));