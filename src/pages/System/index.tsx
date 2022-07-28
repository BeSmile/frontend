import React from 'react';
// import img1 from "@public/assets/icon/1.png";
// import img2 from "@public/assets/icon/2.png";
// import img3 from "@public/assets/icon/3.png";
import fetch from 'isomorphic-fetch';

declare var window: any;

const menus = [
    {
        name: 'img1',
        uri: ''
    },
    {
        name: 'img2',
        uri: ''
    },
    {
        name: 'img3',
        uri: ''
    }
];

export default class System extends React.Component {
    componentDidMount() {
        fetch('http://localhost:8080/dist/manifest.json')
            .then((res) => res.json())
            .then((manifest) => {
                console.log(manifest);
                const script = document.createElement('script');
                script.id = 'title';
                script.src = `http://localhost:8080/dist/${manifest['app.js']}`;
                script.onload = function () {
                    window['renderPlugin']('root');
                };

                document.head.appendChild(script);
            });
    }

    render() {
        return (
            <div>
                {menus.map((item, i) => (
                    <div key={i}>
                        <img src={item.uri} />
                        <div>{item.name}</div>
                    </div>
                ))}
                <div id="" />
            </div>
        );
    }
}
