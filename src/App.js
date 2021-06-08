import React, { Component } from 'react'
import './App.less'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import Login from './pages/Login/Login'

export default class app extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin} />
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
}
