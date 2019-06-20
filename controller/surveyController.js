const express = require('express');
const router = express.Router();
const survey = require('../models/surveyorm.js');

//Importing the surveyOrm. model which has the specific ORM code
// html routes
router.get('/survey', function (req, res){
    console.log ('Testing survey');
    res.render('survey', {title: "survey"});
    console.log ('test post!!')
});
// api routes
// router.get('/api/survey', function (req, res){
//     survey.getsurvey(function(data){
//         const hbsObject = {
//             profile: data
//         };
    
//     res.render('survey', hbsObject);
// })
// })

router.post('/survey', function(req, res){
    console.log ('Testing survey a');
    
    survey.createsurvey(['first_name', 'last_name', 'gender', 'home_street', 'home_city', 'home_state', 'home_zip', 'mobile','gym_name','gym_street', 'gym_city', 'gym_state', 'gym_zip','primary_training_type', 'secondary_training_type'], [req.body.firstname, req.body.lastname, req.body.gender, req.body.homestreet, req.body.homecity, req.body.homestate, req.body.homezip, req.body.mobile, req.body.gymname, req.body.gymstreet, req.body.gymcity, req.body.gymstate, req.body.gymzip,req.body.primaryexcer, req.body.secondaryexer], function(data){
        console.log ('Testing survey B');
            //Sending some data back to validate

            const hbsObject = {
                survey: data

            };
            res.render('survey', hbsObject);
    })
});

module.exports = router;          