import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Route, Link } from "react-router-dom";
import List from "./page/list";
import Links from "./page/links";
import { Report } from "./page/report";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Log } from "./page/log";

class Root extends React.Component{
    render(){
        return (
            <HashRouter>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">List</Link></li>
                            <li className="breadcrumb-item"><Link to="/report">Report</Link></li>
                            <li className="breadcrumb-item"><Link to="/links">Links</Link></li>
                        </ol>
                    </nav>
                    <Provider store={store}>
                        <Route exact path="/" component={List}></Route>
                        <Route path="/report" component={Report}></Route>
                    </Provider>
                    <Route path="/links" component={Links}></Route>
                    <Route path="/log" component={Log}></Route>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(
    <Root />
    , document.getElementById('root')
);
