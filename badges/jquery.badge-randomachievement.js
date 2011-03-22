/*
 * A RandomAchievement is an achievement that is triggered when a user
 * visits the site for the first time.
 */
;(function($) {
    /* jquery.badge.js must be included */
    var Badge = $.fn.badge.Badge;

    $.fn.badge.RandomAchievement = function(opts, options) {
        this.name = 'RandomAchievement';

        callback = options.badge;
        var items = options.items;
        onReady();

        function getData() {
            var data = [];

            if (opts.storage_key) {
                data = $.fn.badge.getStorage(opts.storage_key);
            }

            if (!data) {
                data = {};
            }
            if (!data.RandomAchievement) {
                data.RandomAchievement = {};
            }
            if (!data.RandomAchievement.items) {
                data.RandomAchievement.items = {};
            }
            if (!data.RandomAchievement.unlocked) {
                data.RandomAchievement.unlocked = [];
            }

            return data;
        }

        this.unlockText = function(badge) {
            var s = "";

            s += "Unlocked random item " + badge.value;

            return s;
        };

        function onReady() {
            data = getData();
            items = data.RandomAchievement.items;
            unlocked = data.RandomAchievement.unlocked;
            $.each(options.items, function(i, value) {
                if (!items[value.item]) {
                    var r = Math.random();
                    r = r * 100;
                    if (r < value.probability) {
                        badge = new Badge(value.item);
                        data.RandomAchievement.items[value.item] = true;
                        data.RandomAchievement.unlocked.push(badge);
                        $.fn.badge.setStorage(opts.storage_key, data);
                        callback();
                    }
                }
            });
        };

    };

})(jQuery);
