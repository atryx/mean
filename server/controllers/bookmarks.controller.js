var config = require('config.json');
var express = require('express');
var router = express.Router();
var bookmarkService = require('services/bookmark.service');

// routes
router.get('/', getAll);
router.get('/:_id', getById);
router.post('/new', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function getAll(req, res) {
    bookmarkService.getAll()
        .then(function (bookmarks) {
            res.send(bookmarks);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    bookmarkService.getById(req.params._id)
        .then(function (bookmark) {
            if (bookmark) {
                res.send(bookmark);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    bookmarkService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    bookmarkService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    bookmarkService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}