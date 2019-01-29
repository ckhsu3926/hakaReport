import React, { Component } from 'react';

export default class Report extends React.Component {
    render(){
        return (
            <div>
              <form>
                <label>Facebook Name : </label>
                <input type="text" /><br/>
                <label>hakaMOD_Components.log : </label>
                <input type="file" /><br/>
                <label>hakaMOD_Setup.log : </label>
                <input type="file" /><br/>
                <input type="submit" value="上傳" />
              </form>
            </div>
        );
    }
}