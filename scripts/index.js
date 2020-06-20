var dib_id = '0UXY1WTT8TFEPK91HI5Z';

(function () {
    var jQuery; if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.3.1') {
        var script_tag = document.createElement('script'); script_tag.setAttribute("type", "text/javascript"); script_tag.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"); if (script_tag.readyState) { script_tag.onreadystatechange = function () { if (this.readyState == 'complete' || this.readyState == 'loaded') { scriptLoadHandler(); } }; } else { script_tag.onload = scriptLoadHandler; }
        (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
    } else { jQuery = window.jQuery; main(); }
    function scriptLoadHandler() { jQuery = window.jQuery.noConflict(true); main(); }
    function main() {
        jQuery(document).ready(function ($) {
            var querystring = window.location.search.substring(1); querystring = removeParams(querystring); if (querystring) { querystring = '&' + querystring }
            if (typeof dib_categories != 'undefined' && dib_categories != '') { querystring += '&categories=' + dib_categories; }
            if (typeof dib_recent_posts != 'undefined' && dib_recent_posts > 0) { querystring += '&recentposts=' + dib_recent_posts; }
            if (typeof dib_recent_posts_categories != 'undefined' && dib_recent_posts_categories) { querystring += '&recentpostscategories=' + dib_recent_posts_categories; }
            if (typeof dib_recent_post_list != 'undefined' && dib_recent_post_list > 0) { querystring += '&recentpostlist=' + dib_recent_post_list; }
            if (typeof dib_specific_posts != 'undefined' && dib_specific_posts.length > 0) { querystring += '&specificposts=' + dib_specific_posts; }
            if (typeof dib_specific_posts_list != 'undefined' && dib_specific_posts_list.length > 0) { querystring += '&specificpostslist=' + dib_specific_posts_list; }
            if (typeof dib_list_include_content != 'undefined') { querystring += '&listincludecontent=' + dib_list_include_content; }
            if (typeof dib_base_url != 'undefined') { querystring += '&baseurl=' + dib_base_url; }
            var base_url = 'https://api.dropinblog.com'; if (window.dib_url) { base_url = window.dib_url; }
            var url = base_url + "/v1/embed/?b=" + window.dib_id + querystring; $.ajax({
                url: url, dataType: "jsonp", jsonpCallback: "dibResponse", cache: true, success: function (data) {
                    $('#dib-posts').html(data.data.content); if (data.data.categories) { $('#dib-categories').html(data.data.categories); }
                    if (data.data.authors) { $('#dib-authors').html(data.data.authors); }
                    if (data.data.recent_posts) { $('#dib-recent-posts').html(data.data.recent_posts); }
                    if (data.data.recent_post_list) { $('#dib-recent-post-list').html(data.data.recent_post_list); }
                    if (data.data.specific_posts) { $('#dib-specific-posts').html(data.data.specific_posts); }
                    if (data.data.specific_posts_list) { $('#dib-specific-posts-list').html(data.data.specific_posts_list); }
                    if (data.data.cssfile) { $('head').append('<link href="' + data.data.cssfile + '" rel="stylesheet">'); }
                    if (data.data.customCss) { $('head').append('<style>' + data.data.customCss + '</style>'); }
                    if (data.data.additional_css_files) { $.each(data.data.additional_css_files, function (i, cssfile) { $('head').append('<link href="' + cssfile + '" rel="stylesheet">'); }) }
                    if (data.data.additional_js_files) { $.each(data.data.additional_js_files, function (i, jsfile) { $('body').append('<script src="' + jsfile + '" type="text/javascript"></script>'); }) }
                    if (typeof dib_ignore_meta == 'undefined' || !dib_ignore_meta) {
                        var canonical_found = false; var headlinks = document.getElementsByTagName("link"); for (var i = 0; i < headlinks.length; i++) { if (headlinks[i].rel == 'canonical') { headlinks[i].href = window.location; canonical_found = true; } }
                        if (!canonical_found) { $('head').append('<link rel="canonical" href="' + window.location + '" />\n'); }
                        if (data.data.headTitle) { document.title = data.data.headTitle; }
                        if (data.data.headDescription) { var meta = document.getElementsByTagName("meta"); for (var i = 0; i < meta.length; i++) { if (meta[i].name.toLowerCase() == "description") { meta[i].content = data.data.headDescription; } } }
                    }
                }
            });
        });
    }
    function removeParams(querystring) {
        var param, params_arr = []; var keys = ['gclid', 'prefn1', 'dwcont', 'cgid', 'msclkid']; if (window.dib_id == 'LRJUHNOU4NJ8YT68R9XC') { keys.push("q"); }
        if (querystring !== "") {
            params_arr = querystring.split("&"); for (var i = params_arr.length - 1; i >= 0; i -= 1) { param = params_arr[i].split("=")[0]; for (j = 0; j < keys.length; j++) { if (param === keys[j]) { params_arr.splice(i, 1); } } }
            querystring = params_arr.join("&");
        }
        return querystring;
    }
})();