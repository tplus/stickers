define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Sticker = describe('Sticker', function () {
    property('title', String);
    property('content', String);
});