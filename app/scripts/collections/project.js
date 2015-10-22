/*global Portfolio, Backbone*/

Portfolio.Collections = Portfolio.Collections || {};

(function () {
    'use strict';

    Portfolio.Collections.Project = Backbone.Collection.extend({

        model: Portfolio.Models.Project

    });

})();
