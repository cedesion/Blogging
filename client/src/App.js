import React from 'react'
import { Redirect } from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import Navbar from './Components/Header/Navbar';
import PageNotFound from './Components/PageNotFound';
import AddPost from './Components/Posts/Post/AddPost';
import EditPost from './Components/Posts/Post/EditPost';
import SinglePostDetails from './Components/Posts/Post/SinglePostDetails';
import Posts from './Components/Posts/Posts';
import { AppStyles } from './AppbarStyle';


export default function App() {
  const classes=AppStyles();
  return (
    <div>
      <Navbar/>
      <div className={classes.main}>
      <Switch>
        <Route exact path="/" render={ (props) => <Posts {...props}/> }/>
        <Route exact path="/posts" render={ (props) => <Redirect to="/"/> }/>
        <Route path="/posts/add" render={ (props) => <AddPost {...props}/> }/>
        <Route path="/posts/edit/:id" render={ (props) => <EditPost {...props}/> }/>
        <Route path="/posts/:id" render={ (props) => <SinglePostDetails {...props}/> }/>
        <Route path="/*" render={ (props) => <PageNotFound {...props}/> }/>
      </Switch>
      </div>
    </div>
  )
}
