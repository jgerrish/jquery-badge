/*
 * jQuery Badge plugin
 *
 * Usage:
 *
   $(document).ready(function () {
      $('div#badge').badge('init', {
          achievements: [ [$.fn.badge.FirstVisitAchievement,
                             { 'badge': awardNewVisitorBadge }]
                          ]

      });
    });
 *
 * Copyright (c) Joshua Gerrish (http://www.joshuagerrish.com), 2011.
 * Dual-licensed under the BSD (BSD-LICENSE.txt) and GPL (GPL-LICENSE.txt)
 * licenses.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
;(function($) {
    /* List of badges unlocked.
       The keys are the different achievement plugin names.
       The values are lists of badges unlocked for that achievement.
    */
    var badges = {};
    var achievements = {};
    var opts = {};

    var methods = {
        init : function(options) {
            init(options);
        },
        /* Replace HTML content of element with a list of badges unlocked */
        showBadges : function() {
            return this.each(function() {
                b = $.fn.badge('getBadges');

                var s = "";

                var ul = $("<ul/>").addClass("badgelist");
                $.each(b, function(i, v) {
                    var achievement = v.achievement;
                    var badge = v.badge;

                    s = achievements[achievement].inst.unlockText(badge);
                    li = $("<li/>").text(s);
                    ul = ul.append(li);
                });

                $(this).append(ul);
            });
        },
        /* Return a list of badges unlocked.
           This method returns a list of unlocked badges.  Each object
           in the list contains the achievement responsible for unlocking the
           badge and the badge itself. */
        getBadges : function() {
            var unlocked = [];

            if (opts.storage_key) {
                data = $.fn.badge.getStorage(opts.storage_key);
            }

            if (data) {
                $.each(data, function(key, value) {
                    $.each(value.unlocked, function(i, v) {
                        var b = {};
                        b.achievement = key;
                        b.badge = v;
                        unlocked = unlocked.concat(b);
                    });
                });
            }

            return unlocked;
        },
        clear: function() {
            return this.each(function() {
                if (opts.storage_key) {
                    key = opts.storage_key;
                    $.jStorage.flush();
                }
            });
        },
        /* Achievements are actions that users can take that unlock badges.
           For example, visiting a certain page on a site, or clicking on
           a certain button.
           
           Developers can create their own achievements.
        */
        /* Add a custom achievement that can be unlocked */
        addAchievement: function(name, func, inst) {
            achievements[name] = {};
            achievements[name]['func'] = func;
            achievements[name]['inst'] = inst;
        },
        listAchievements: function() {
            var a = [];

            $.each(achievements, function(i, value) {
                a.push(i);
            });

            return a;
        },
    };

    $.fn.badge = function(method) {
        if (methods[method]) {
            return methods[method].apply(this,
                             Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.badge');
        }
    };


    function init(options) {
        opts = $.extend({}, $.fn.badge.defaults, options);

        /* Iterate through the achievements, initializing each one */
        $.each(opts.achievements, function(i, value) {
            if ($.isFunction(value[0])) {
                func = value[0];
                f = new func(opts, value[1]);
                methods['addAchievement'].apply(opts, [f.name, value[1], f]);
            }
        });
    };

    /* The following functions abstract the local storage API */
    /* Currently, the jStorage library is used for local storage */

    /* method to get value from local storage */
    $.fn.badge.getStorage = function(key) {
        return $.jStorage.get(key);
    };

    /* method to set value in local storage */
    $.fn.badge.setStorage = function(key, value) {
        return $.jStorage.set(key, value);
    };

    /* method to clear value in local storage */
    $.fn.badge.deleteStorage = function(key) {
        return $.jStorage.deleteKey(key);
    };

    /* A Badge is unlocked when a user achieves an achievement.
       data is Achievement-specific data that is interpreted by each
       Achievement for display and tracking */
    $.fn.badge.Badge = function(data) {
        this.value = data;
    };

    $.fn.badge.defaults = {
        storage_key : "jquery.badge",
        achievements : []
    };

})(jQuery);
