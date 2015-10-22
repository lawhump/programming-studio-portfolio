/*global Portfolio, $*/
var ADDED_ASSIGNMENT_ONE = false;
var ADDED_ASSIGNMENT_TWO = false;

var app = (function() {
 
    var api = {
        views: {},
        models: {},
        collections: {},
        router: null,
        LogModel: null,
        LogView: null,
        CommitInfoView: null,

        init: function() {
            this.content = $("#logs");
            this.LogModel = new this.models.Log();
            return this;
        },

        addToLog: function(commits) {
            this.LogModel.addToLog(commits);
        },

        destroyLog: function() {},

        reveal: function(elem) {
            elem.show();
            elem.fadeTo(350, 1);
        }
    };

    var ViewsFactory = {
        log: function() {
            if(!this.logView) {
                this.logView = new api.views.log({ 
                    el: $("#log")
                });
            }
            return this.logView;
        }
    };

    console.log('initializing app');

    var Router = Backbone.Router.extend({});
    api.router = new Router();
 
    return api;
 
})();

// Smooth scrolling
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Click listeners
$('.project a').on('click', function(e) {
    // Still pretty hacky and not BBesque but whatever
    if (e.target.id.includes('chess')) {
        var part = e.target.id.split('-')[1];

        if (part === '0') {
            if (!ADDED_ASSIGNMENT_ONE) {
                getRelevantCommits('Assignment1.0');
            }
        }

        else if (part === '1') {
            if (!ADDED_ASSIGNMENT_ONE) {
                getRelevantCommits('Assignment1.1');
            }
        }

        else if (part === '2') {
            if (!ADDED_ASSIGNMENT_ONE) {
                getRelevantCommits('Assignment1.2');
            }
        }

        else {
            if (!ADDED_ASSIGNMENT_ONE) {
                getRelevantCommits('Assignment1');
            }
        }
    }

    else {
        if (part === '0') {
            if (!ADDED_ASSIGNMENT_TWO) {
                getRelevantCommits('Assignment2.0');
            }
        }

        else if (part === '1') {
            if (!ADDED_ASSIGNMENT_TWO) {
                getRelevantCommits('Assignment2.1');
            }
        }

        else {
            if (!ADDED_ASSIGNMENT_TWO) {
                getRelevantCommits('Assignment2');
            }
        }
    }
});

function getRelevantCommits(assignment) {
    // var source   = $("#log-template").html();
    // var template = Handlebars.compile(source);

    // var $logs = $('#logs');

    var baseURL = 'https://subversion.ews.illinois.edu/svn/fa15-cs242/';
    var out = [];

    $.when($.ajax({
          url: 'data/svn_log.xml',
          data: {
             key: "value"
          },
          error: function() {
             console.log("something went wrong")
          },
          dataType: 'xml',
          success: function(xml) {
            // console.log(xml);
            $(xml).find('log logentry').each(function(index){
                var assignmentPath = $(this).find('paths').text();
                if (assignmentPath.includes(assignment)){
                    var _logEntry = $(this).attr('revision');
                    var _author = $(this).find('author').text();
                    var _date = $(this).find('date').text();
                    var _path = [];
                    $(this).find('paths path').each(function(index) {
                        var text = $(this).text();
                        var p = '<dd><a href="'+baseURL+text+'">'+text+'</a></dd>';
                        _path.push(p);
                        // console.log({'kind': $(this).attr('kind'),'path': $(this).text()});
                    });
                    var _msg = $(this).find('msg').text();

                    var context = {
                      revision: _logEntry,
                      author: _author,
                      date: _date,
                      path: _path,
                      msg: _msg,
                      assignment: assignment,
                      baseURL: baseURL
                    };
                    
                    out.push(context);
                }
            });
          },
          type: 'GET'
        }).done(function() {
            app.addToLog(out);
        }));
}

$(document).ready(function () {
    'use strict';
    app.init();
});
