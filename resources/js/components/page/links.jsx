import React, { Component } from 'react';

const linkList = [{name:"Facebook社團",url:"https://goo.gl/WdvoRO"},
  {name:"公告欄",url:"https://goo.gl/TsPN7P"},
  {name:"常見問題集",url:"https://goo.gl/iW35Jk"},
  {name:"教學及載點",url:"https://goo.gl/pHuCUh"},
  {name:"痛車清單：戰車",url:"https://goo.gl/b9uzDn"},
  {name:"美服戰車世界違規模組列表",url:"https://goo.gl/t22zi7"},
  {name:"亞服戰車世界違規模組列表",url:"https://goo.gl/rha4K3"}
];

export default class Links extends React.Component {
    render(){
        return (
            <div>
                <ul>
                { linkList.map(
                  (row) => {
                    return (
                      <li key={row.name}><a href={row.url} target="_blank">{row.name}</a></li>
                    );
                  }
                )}
                </ul>
            </div>
        );
    }
}