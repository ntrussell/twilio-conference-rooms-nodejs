const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

const conferences = require('./conferences');

const app = express();
app.use(urlencoded({extended: false}));
app.use((request, response, next) => {
    response.type('text/xml');
    next();
})

app.post('/voice', (request, response) => {
    const twiml = new VoiceResponse();
    twiml.say('Thank you for calling RPCS. You have reached the Conference Call Center', { voice: 'Polly.Joanna' });
    twiml.redirect('/gather');
    response.send(twiml.toString());
});

app.post('/gather', (request, response) => {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
        timeout: '10',
        finishOnKey: '#',
        action: '/join'
    });
    gather.say('To join an RPCS conference, please enter the 6 digit access code provided on your meeting invitation.', { voice: 'Polly.Joanna' });
    twiml.redirect('/gather');
    response.send(twiml.toString());
});

app.post('/join', (request, response) => {
    const twiml = new VoiceResponse();
    const conference = conferences(request.body.Digits);
    if (conference) {
        twiml.say('You are now entering the RPCS conference.', { voice: 'Polly.Joanna' });
        const dial = twiml.dial();
        dial.conference(conference);
    } else {
        twiml.say('The access code you entered is not a valid RPCS Conference Room, please try again.', { voice: 'Polly.Joanna' });
        twiml.redirect('/gather');
    }
    response.send(twiml.toString());
});

console.log('Conference system app HTTP server running at http://127.0.0.1:8081');
app.listen(8081);
