import React, { Component } from 'react';

const linkList = [
    {name:"Facebook社團",url:"https://goo.gl/WdvoRO"},
    {name:"常見問題集",url:"https://goo.gl/iW35Jk"},
    {name:"教學及載點",url:"https://goo.gl/pHuCUh"},
    {name:"亞服戰車世界違規模組列表",url:"https://goo.gl/rha4K3"},
    {name:"本回報網站source code",url:"https://github.com/ckhsu3926/hakaReport"}
];

export default class Links extends React.Component {
    render(){
        return (
            <div>
                <ul className="list-group">
                { linkList.map(
                  (row) => {
                    return (
                      <li key={row.name} className="list-group-item"><a href={row.url} target="_blank">{row.name}</a></li>
                    );
                  }
                )}
                </ul>
            </div>
        );
    }
}