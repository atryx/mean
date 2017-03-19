var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('bookmarks');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getAll() {
    var deferred = Q.defer();

    db.bookmarks.find().toArray(function (err, bookmarks) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return bookmarks
        bookmarks = _.map(bookmarks, function (bookmark) {
            return _.omit(bookmark, 'hash');
        });

        deferred.resolve(bookmarks);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.bookmarks.findById(_id, function (err, bookmark) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (bookmark) {
            // return bookmark 
            deferred.resolve(_.omit(bookmark, 'hash'));
        } else {
            // bookmark not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(bookmarkParam) {
    var deferred = Q.defer();

    // validation
    db.bookmarks.findOne(
        { name: bookmarkParam.name },
        function (err, bookmark) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (bookmark) {
                // name already exists
                deferred.reject('Name "' + bookmarkParam.name + '" is already taken');
            } else {
                createBookmark();
            }
        });

    function createBookmark() {
        // set bookmark object to bookmarkParam
        var bookmark = _.omit(bookmarkParam, 'password');

        db.bookmarks.insert(
            bookmark,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, bookmarkParam) {

    var deferred = Q.defer();

    // validation
    db.bookmarks.findById(_id, function (err, bookmark) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (bookmark.name !== bookmarkParam.name) {
            // name has changed so check if the new name is already taken
            db.bookmarks.findOne(
                { name: bookmarkParam.name },
                function (err, bookmark) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (bookmark) {
                        // name already exists
                        deferred.reject('Name "' + req.body.name + '" is already taken')
                    } else {
                        updateBookmark();
                    }
                });
        } else {
            updateBookmark();
        }
    });

    function updateBookmark() {
        // fields to update
        var set = {
            name: bookmarkParam.name,
            url: bookmarkParam.url,
            desc: bookmarkParam.desc,
            date_added: bookmarkParam.date_added,
        };

        db.bookmarks.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.bookmarks.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}