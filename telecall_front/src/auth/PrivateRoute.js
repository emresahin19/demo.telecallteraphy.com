import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from './Register';


export default class PrivateRoute extends Component {


    render() {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        return (
            <>
                {
                    isAuthenticated ? 
                    (
                        <Route exact path="/" element={this.props.child} />
                    ) 
                    : 
                    (
                        <Routes>
                            <Route path="/register" element={<Register/>}/>
                            <Route exact path="*" element={<Login/>}/>
                        </Routes>
                    )
                }
            </>
        );
    }
}
