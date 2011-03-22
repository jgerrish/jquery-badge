/*
 * A FirstVisitAchievement is an achievement that is triggered when a user
 * visits the site for the first time.
 */
;(function($) {
    /* jquery.badge.js must be included */
    var Badge = $.fn.badge.Badge;

    /* The Achievement is initialized with two parameters:
       The first parameter is the main jquery.badge options object.
       The second argument is a custom options object that is
       Achievement-specific. */
    $.fn.badge.FirstVisitAchievement = function(opts, options) {
        /* Every achievement must define a unique name */
        this.name = 'FirstVisitAchievement';

        callback = options.badge;
        onReady();

        function getData() {
            var data = [];

            if (opts.storage_key) {
                data = $.fn.badge.getStorage(opts.storage_key);
            }

            if (!data) {
                data = {};
            }
            if (!data.FirstVisitAchievement) {
                data.FirstVisitAchievement = {};
            }
            if (!data.FirstVisitAchievement.unlocked) {
                data.FirstVisitAchievement.unlocked = [];
            }

            return data;
        };

        function onReady() {
            var path = $(location).attr('pathname');
            data = getData();
            unlocked = data.FirstVisitAchievement.unlocked;

            if (!data.FirstVisitAchievement.achieved) {
                data.FirstVisitAchievement.achieved = true;
                badge = new Badge("FirstVisitAchievement");
                unlocked.push(badge);
                $.fn.badge.setStorage(opts.storage_key, data)
                callback();
            }
        }

        /* Every Achievement should also specify an unlockText method */
        this.unlockText = function(badge) {
            return "First visit to the site!";
        };
    };
})(jQuery);
