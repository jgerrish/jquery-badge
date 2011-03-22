
/*
############################################################
# Bits 'n Tuts Twitter Alert jQuery Plugin.					#
# Developed by Dave Earley.									#
# www.BitsnTuts.com											#
# October 2010												#
# Please Leave This Message Intact							#
############################################################
*/


$.fn.twitter_alert = function (options, callback) {
        var defaults = {
                bg_colour: '#FFFFFF',
                border_colour: '#6CF',
                text_colour: '#6CF',
                text_size: '24px',
                text_font: 'Arial, Helvetica, sans-serif',
                message: this.html(),
                fadeout_time: 2000,
                override_css: false,
				height: '50px'
        };
        var settings = $.extend({}, defaults, options);
        return this.each(function () {
                $(this).hide();
                var cssObj = {
                        'font-family': 'Arial, Helvetica, sans-serif',
                        'font-size': settings.text_size,
                        'color': settings.text_colour,
                        'background-color': settings.bg_colour,
                        'padding': '10px',
                        'height': '50px',
                        'border-bottom-width': 'thin',
                        'border-bottom-style': 'solid',
                        'border-bottom-color': settings.border_colour,
                        'position': 'absolute',
                        'z-index': '99999',
                        'left': '0px',
                        'top': '0px',
                        'right': '0px',
                        'filter': 'alpha(opacity=80)',
                        '-moz-opacity': '0.8',
                        'opacity': '0.8',
                        'line-height': settings.height,
                        'text-align': 'center'
                }
                if (settings.override_css == false) {
                        $(this).css(cssObj);
                }
                $(this).html(settings.message);
                $(this).fadeIn().delay(settings.fadeout_time);
                $(this).fadeOut();
        });
};