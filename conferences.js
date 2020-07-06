const accessCodes = {
    831620: 'Operations General',
    305305: 'Sales General',

};

module.exports = function(code) {
    return accessCodes[code];
};
