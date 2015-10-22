app.views.CommitInfo = Backbone.View.extend({
    initialize: function() {
        this.render();
        console.log('yoooooooooo');
    },

    render: function() {    
        var source = $('#commit-template').html();
        var template = Handlebars.compile(source);
        var html = app.LogModel.commits.map(template);

        this.$el.append(html);

        app.reveal($('#commit-info'));
    }
});