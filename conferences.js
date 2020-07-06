const accessCodes = {
    831620: 'Operations General',
    305305: 'Sales General',
    204097: 'Brendan Teague',
    505505: 'Eben Russell',
    802802: 'Cullen ONeil',
    427427: 'Patty Thornton',
    801801: 'Jay Miles',
    423423: 'Blaz Ruzic',
    201501: 'Dylan Wraga',
    889712: 'Surinder Sandhu',
    201601: 'Matt Benac',
    238881: 'Randi Haller',
    247365: 'Sean DuFosee',
    668727: 'Finance General',
    770770: 'Nate Russell'

};

module.exports = function(code) {
    return accessCodes[code];
};
