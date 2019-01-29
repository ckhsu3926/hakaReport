import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter , Route, Link } from "react-router-dom";
import List from "./page/list";
import Links from "./page/links";
import Report from "./page/report";

class Root extends React.Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">List</Link>
                            </li>
                            <li>
                                <Link to="/report">Report</Link>
                            </li>
                            <li>
                                <Link to="/links">Links</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route exact path="/" component={List}></Route>
                    <Route path="/report" component={Report}></Route>
                    <Route path="/links" component={Links}></Route>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(
    <Root />
    , document.getElementById('root')
);
