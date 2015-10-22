/*global Portfolio, Backbone, JST*/

app.views.Log = Backbone.View.extend({
    events: {
        "click a": "updateCommitView"
    },

    initialize: function() {
        this.render();
    },

    render: function() {    
        var source = $('#log-template').html();
        var template = Handlebars.compile(source);
        var html = app.LogModel.commits.map(template);

        this.$el.append(html);

        app.reveal($('#logs'));
    },

    updateCommitView: function() {
        if (app.CommitInfoView == null) {
            app.CommitInfoView = new app.views.CommitInfo({el: $('#commit-info .content')});
        }
        // just update it
    }
});