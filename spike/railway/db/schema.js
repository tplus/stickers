define('User', function () {
    property('email', String, { index: true });
    property('password', String);
    property('activated', Boolean, {default: false});
});

var Sticker = describe('Sticker', function () {
    property('title', String);
    property('content', String);
});

Sticker.validatesPresenceOf('title', 'content');
Sticker.validatesLengthOf('title', {max: 20, message: {max: 'title is too long'}});
Sticker.validatesLengthOf('content', {max: 200, message: {max: 'content is too long'}});