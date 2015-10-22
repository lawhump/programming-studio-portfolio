/*global Portfolio, Backbone*/

// Portfolio.Models = Portfolio.Models || {};

/*
(function () {
    'use strict';

    Portfolio.Models.Model = Backbone.Model.extend({

        url: 'data/',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }

        parse: function (data) {
            // return parsed;
        },

        fetch: function (options) {
            options = options || {};
            options.dataType = "xml";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });

})();
*/

var app = app || {};

(function () {
    'use strict';
    app.models.Log = Backbone.Model.extend({
        defaults: {
            commits: [],
            visible: false
        },

        initialize: function() {
            console.log('initializing my model');
        },

        addToLog: function(commits) {
            this.commits = commits;
            this.visible = true;

            app.LogView = new app.views.Log({el: $('#logs table tbody')});
        },

        destroyLog: function() {}
    });
    // console.log('bruh');
})();