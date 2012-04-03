require('../test_helper.js').controller('stickers', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        content: ''
    };
}

exports['stickers controller'] = {

    'GET new': function (test) {
        test.get('/stickers/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/stickers', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Sticker.find;
        Sticker.find = sinon.spy(function (id, callback) {
            callback(null, new Sticker);
        });
        test.get('/stickers/42/edit', function () {
            test.ok(Sticker.find.calledWith('42'));
            Sticker.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Sticker.find;
        Sticker.find = sinon.spy(function (id, callback) {
            callback(null, new Sticker);
        });
        test.get('/stickers/42', function (req, res) {
            test.ok(Sticker.find.calledWith('42'));
            Sticker.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var sticker = new ValidAttributes;
        var create = Sticker.create;
        Sticker.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, sticker);
            callback(null, sticker);
        });
        test.post('/stickers', {Sticker: sticker}, function () {
            test.redirect('/stickers');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var sticker = new ValidAttributes;
        var create = Sticker.create;
        Sticker.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, sticker);
            callback(new Error, null);
        });
        test.post('/stickers', {Sticker: sticker}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Sticker.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/stickers/1', new ValidAttributes, function () {
            test.redirect('/stickers/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Sticker.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/stickers/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

