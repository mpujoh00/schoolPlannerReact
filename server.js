const express = require('express');
const path = require('path');
const app = express();

var data = {"rooms":["110","111","120","121"],
            "groups":["1a","1b","1c","2a","2b","3a","3b","4a","4b"],
            "classes":["Graphical User Interfaces","Computer Networks","Intelligent Information Systems","Data Mining"],
            "teachers":["Ronald","Harrison","Fred","Brian","Tom","Ginevra","Dean"],
            "activities":[
                {"room":"110", "group":"1a", "class":"Graphical User Interfaces", "slot":1, "teacher":"Ronald", "day": "tuesday"},
                {"room":"121", "group":"1c", "class":"Data Mining", "slot":3, "teacher":"Ginevra", "day": "monday"},
                {"room":"111", "group":"3a", "class":"Graphical User Interfaces", "slot":6, "teacher":"Harrison", "day": "thursday"},
                {"room":"121", "group":"4b", "class":"Intelligent Information Systems", "slot":7, "teacher":"Dean", "day": "friday"},
                {"room":"111", "group":"3b", "class":"Computer Networks", "slot":3, "teacher":"Ronald", "day": "thursday"},
                {"room":"110", "group":"2a", "class":"Data Mining", "slot":8, "teacher":"Brian", "day": "monday"},
                {"room":"111", "group":"4a", "class":"Intelligent Information Systems", "slot":2, "teacher":"Ronald", "day": "friday"},
                {"room":"120", "group":"1b", "class":"Graphical User Interfaces", "slot":10, "teacher":"Tom", "day": "tuesday"},
                {"room":"110", "group":"2b", "class":"Computer Networks", "slot":4, "teacher":"Brian", "day": "wednesday"},
                {"room":"110", "group":"1a", "class":"Intelligent Information Systems", "slot":2, "teacher":"Ronald", "day": "friday"},
                {"room":"110", "group":"1c", "class":"Data Mining", "slot":9, "teacher":"Ginevra", "day": "wednesday"}
            ]
};

app.use(express.static(path.join(__dirname, 'build')));  // production server

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/plannerData', (req, res) => {  // get data
    res.json(data);
});

app.post('/createActivity', (req, res) => {  // creates an activity

    data['activities'].push(req.body);
    res.send('Activity created');

});

app.listen(5000);