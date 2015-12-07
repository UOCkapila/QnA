/**
 * Created by kapila on 12/7/15.
 */

/**
 * Created by kapila on 12/1/15.
 */

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');                 // log requests to the console (express4)
var bodyParser = require('body-parser');        // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(5555);
console.log("App listening on port 5555");

//connect to mongoDB ===========================================
mongoose.connect('mongodb://localhost/qnaapplications');


var question = new mongoose.Schema({
    question : String
    //answer1 : String,
    //answer2 : String,
    //answer3 : String,
    //answer4 : String,
    //correct : Number
});

var questionModel = mongoose.model('question', question);

// routes ======================================================================================

app.get('/api/question' , function(req ,res){
    questionModel.find(function(err, qustions){
        if(err)
            res.send(err);

        res.json(qustions);
    })
});

app.post('/api/question', function(req, res){
    questionModel.create({
        question : req.body.question,
        answer1 : req.body.answer1,
        answer2 : req.body.answer2,
        answer3 : req.body.answer3,
        answer4 : req.body.answer4,
        correct : req.body.correct,
        done : false
    }, function(err, qustion) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        questionModel.find(function(err, qustions) {
            if (err)
                res.send(err)
            res.json(qustions);
        });
    });

});

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
