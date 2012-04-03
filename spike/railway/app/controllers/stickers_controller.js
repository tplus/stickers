load('application');

Sticker.validatesPresenceOf('title', 'content');
Sticker.validatesLengthOf('title', {min:3, max: 20, message: {max: 'title is too long', min: 'title is too short'}});
Sticker.validatesLengthOf('content', {min: 10, max: 200, message: {max: 'content is too long', min: 'content is too short'}});

before(loadSticker, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New sticker';
    this.sticker = new Sticker;
    render();
});

action(function create() {
	
    Sticker.create(req.body.Sticker, function (err, sticker) {
        if (err) {
            flash('error', 'Sticker can not be created');
            render('new', {
                sticker: sticker,
                title: 'New sticker'
            });
        } else {
            flash('info', 'Sticker created');
            redirect(path_to.stickers);
        }
    });
});

action(function index() {
    this.title = 'Stickers index';
    Sticker.all(function (err, stickers) {
        send(stickers);
    });
});

action(function show() {
    send(this.sticker);
});

action(function edit() {
    this.title = 'Sticker edit';
    render();
});

action(function update() {
    this.sticker.updateAttributes(body.Sticker, function (err) {
        if (!err) {
            flash('info', 'Sticker updated');
            redirect(path_to.sticker(this.sticker));
        } else {
            flash('error', 'Sticker can not be updated');
            this.title = 'Edit sticker details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.sticker.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy sticker');
        } else {
            flash('info', 'Sticker successfully removed');
        }
        send("'" + path_to.stickers + "'");
    });
});

function loadSticker() {
    Sticker.find(params.id, function (err, sticker) {
        if (err) {
            redirect(path_to.stickers);
        } else {
            this.sticker = sticker;
            next();
        }
    }.bind(this));
}