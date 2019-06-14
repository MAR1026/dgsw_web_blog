import React from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {Provider} from "mobx-react";


import Home from './Home';
import Board from "./Board";
import './App.scss';

import Stores from './Stores';

const App = () => (
    <Provider stores = {Stores}>
        <BrowserRouter>
            <header className='app-header'>
                <ul className='menubar'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">게시판</Link></li>
                </ul>
                <Link to="/board/login"><button className='loginbtn'>로그인 관리</button></Link>
            </header>

            <section className='app-body'>
                <Route path='/' exact component={Home}/>
                <Route path='/board/view/:postid' component={Board}/>
                <Route path='/board/edit/:postid' component={Board}/>
                <Route path='/board/new' component={Board}/>
                <Route path='/board/login' component={Board}/>
            </section>
        </BrowserRouter>
    </Provider>
);

const checkIsLogined = () => {

}

/*
function App() {
  return (
    <div>
      <Home/>
      <Page1/>
      <Page2/>
      <Page3/>
    </div>
  );
} */

/* class App extends React.Component{
  state = {
    location: 0
  }

  render() {
    let {location} = this.state;

     return (

        <div>
          {location === 0 && <Home/>}
          {location === 1 && <Page1/> }
          {location === 2 && <Page2/> }
          {location === 3 && <Page3/> }
        </div>
    );
  }
} */

export default App;
