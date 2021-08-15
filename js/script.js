'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'),
            modal = require('./modules/modal'),
            timer =  require('./modules/timer'),
            slider  =  require('./modules/slider'),
            form  =  require('./modules/form'),
            cards  =  require('./modules/cards'),
            calc  =  require('./modules/calc');
    
    tabs();
    modal();
    timer();
    slider();
    form();
    cards();
    calc();

});

 /////////////////   Fetch   ///////////////////////////////
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json));

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));