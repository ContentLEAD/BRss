$.fn.extend({
    BraftonRss: function(obj){
        obj.container = this;
        jQuery.getFeed({
        url: 'https://tech.brafton.com/brss/py/brss.py?url=' + obj.url,
        dateformat: obj.dateformat,
        container: obj.container,
        image: obj.image,
        date: obj.date,
        category: obj.category,
        catheader: obj.catheader,
        author: obj.author,
        authorheader: obj.authorheader,
        description: obj.description,
        wrapper: obj.wrapper,
        wrappername: obj.wrappername,
        style: obj.style,
        count: obj.count,
        success: function(feed) {

            var html = '';

            if (this.wrapper) {
                html += '<div class="' + this.wrappername + '">';
            }

            switch (this.style) {
                case 'grid':
                    html += '<style type="text/css">.item {float: left; width: 33.3%; padding: 0px 10px; box-sizing: border-box;} .item img {max-width: 100%;}</style>';   
                    break;
                case 'zrss':
                    html += '<style type="text/css">.rssRow {float: left; width: 33.3%; padding: 0px 10px; box-sizing: border-box;} .item img {max-width: 100%;}</style>';
                    break;
                case 'grid4':
                    html += '<style type="text/css">.item {float: left; width: 25%; padding: 0px 10px; box-sizing: border-box;} .item img {max-width: 100%;}</style>';
                    break;
                case 'grid4box':
                    html += '<style type="text/css">.item {float: left; width: 50%; padding: 0px 10px; box-sizing: border-box;} .item:nth-of-type(odd) {clear: both;} .item img {max-width: 100%;}</style>';
                    break;
                case 'grid5':
                    html += '<style type="text/css">.item {float: left; width: 33.3%; padding: 0px 10px; box-sizing: border-box;} .item:nth-of-type(4) {clear: both; width: 50%;} .item:nth-of-type(5) {width: 50%;} .item img {max-width: 100%;}</style>';
                    break;
                case 'grid6':
                    html += '<style type="text/css">.item {float: left; width: 33.3%; padding: 0px 10px; box-sizing: border-box;} .item:nth-of-type(4) {clear: both;} .item img {max-width: 100%;}</style>';
                    break;
                default:
                    html += '';
                    break;
                }

            this.container.append('<div class="rssHeader title"><h2>' +
            '<a href="' + feed.link + '">' + feed.title + '</a>' + '</h2></div>');
            
            for(var i = 0; i < feed.items.length && i < this.count; i++) {
            
                var item = feed.items[i];
                
                html += '<div class="rssRow item"><h3>' + '<a href="' + item.link + '">' +
                item.title + '</a>' + '</h3>';

                if(this.date) {
                    switch (this.dateformat) {
                        case 'shortdate':
                            html += '<div class="date updated">' + item.shortdate + '</div>';
                            break;
                        case 'fullmonths':
                            html += '<div class="date updated">' + item.fullmonths + '</div>';
                            break;
                        default:
                            html += '<div class="date updated">' + item.updated + '</div>';
                            break;
                    }
                }

                if(this.category) {
                    html += '<div class="category">' + '<strong>' + this.catheader + '</strong>' +
                    item.category + '</div>';
                }

                if(this.author) {
                    html += '<div class="author">' + '<strong>' + this.authorheader + '</strong>' + 
                    item.author + '</div>';
                }

                if(this.image) {
                    html += '<div class="image">' + '<a target="_blank" href="' + item.link + '">' +
                    '<img src="' + item.image + '" />' + '</a>' + '</div>';
                }

                if (this.description) {
                    html += '<div class="description">' + item.description + '</div>';
                }

                html += '</div>';
            }
            
            jQuery(obj.container).append(html);

            if (this.container) {
                html += '</div>';
            }
        }    
    });
}
});;function JAtom(xml) {
    this._parse(xml);
}

JAtom.prototype = {
    
    _parse: function(xml) {
    
        var channel = jQuery('feed', xml).eq(0);

        this.version = '1.0';
        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').attr('href');
        this.description = jQuery(channel).find('subtitle:first').text();
        this.language = jQuery(channel).attr('xml:lang');
        this.updated = jQuery(channel).find('updated:first').text();
        
        this.items = [];
        
        var feed = this;
        
        jQuery('entry', xml).each( function() {
        
            var item = new JFeedItem();
            
            item.title = jQuery(this).find('title').eq(0).text();
            item.link = jQuery(this).find('link').eq(0).attr('href');
            item.description = jQuery(this).find('content').eq(0).text();
            item.updated = jQuery(this).find('updated').eq(0).text();
            item.id = jQuery(this).find('id').eq(0).text();
            
            feed.items.push(item);
        });
    }
};

;/* jFeed : jQuery feed parser plugin
 * Copyright (C) 2007 Jean-François Hovinne - http://www.hovinne.com/
 * Dual licensed under the MIT (MIT-license.txt)
 * and GPL (GPL-license.txt) licenses.
 */

jQuery.getFeed = function(options) {

    //jQuery(this).find(pubDate).each(function() {
        // switch (options.dateformat) {
            //case 'short':
                //pubDate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
            //break;
        //}
        //console.log('date: ' + pubDate);
    //});

    options = jQuery.extend({

        url: null,
        data: null,
        cache: false,
        success: null,
        failure: null,
        error: null,
        global: true,
        ShowPubDate: true,
        DateFormat: null,
        image: null,
        
    }, options);

    if (options.url) {
        
        if (jQuery.isFunction(options.failure) && jQuery.type(options.error)==='null') {
          // Handle legacy failure option
          options.error = function(xhr, msg, e){
            options.failure(msg, e);
          };
        } else if (jQuery.type(options.failure) === jQuery.type(options.error) === 'null') {
          // Default error behavior if failure & error both unspecified
          options.error = function(xhr, msg, e){
            console.log('getFeed failed to load feed', xhr, msg, e);
          };
        }

        return $.ajax({
            type: 'GET',
            url: options.url,
            data: options.data,
            cache: options.cache,
            success: function(xml) {
                var feed = new JFeed(xml);
                if (jQuery.isFunction(options.success)) options.success(feed);
            },
            error: options.error,
            global: options.global
        });

        //if (options.ShowPubDate){
            //Date = new Date(item.updated);
            //if (jQuery.trim(this.DateFormat).length > 0) {
            //};
        //}

    }

};

function JFeed(xml) {
    if (xml) this.parse(xml);
}

JFeed.prototype = {

    type: '',
    version: '',
    title: '',
    link: '',
    description: '',
    category: '',
    image: '',
    author: '',
    parse: function(xml) {

        var feedClass;

        if (jQuery('channel', xml).length == 1) {

            this.type = 'rss';
            feedClass = new JRss(xml);

        } else if (jQuery('feed', xml).length == 1) {

            this.type = 'atom';
            feedClass = new JAtom(xml);
        }

        if (feedClass) jQuery.extend(this, feedClass);
    }
};

;function JFeedItem() {}

JFeedItem.prototype = {

    title: '',
    link: '',
    description: '',
    updated: '',
    category: '',
    id: '',
    image: '',
    author: '',
};

;function JRss(xml) {
    this._parse(xml);
}

JRss.prototype  = {
    
    _parse: function(xml) {
    
        if(jQuery('rss', xml).length === 0) this.version = '1.0';
        else this.version = jQuery('rss', xml).eq(0).attr('version');

        var channel = jQuery('channel', xml).eq(0);
    
        this.title = jQuery(channel).find('title:first').text();
        this.link = jQuery(channel).find('link:first').text();
        this.description = jQuery(channel).find('description:first').text();
        this.language = jQuery(channel).find('language:first').text();
        this.updated = jQuery(channel).find('lastBuildDate:first').text();

        this.items = [];
        
        var feed = this;
        
        jQuery('item', xml).each( function() {
        
            var item = new JFeedItem();
            
            item.title = jQuery(this).find('title').eq(0).text();
            item.link = jQuery(this).find('link').eq(0).text();
            item.category = jQuery(this).find('category').eq(0).text();
            item.author = jQuery(this).find('creator').eq(0).text();
            item.description = jQuery(this).find('description').eq(0).text();

            //Date Formats
            var fullmonths= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date = new Date(jQuery(this).find('pubDate').eq(0).text());
                item.updated = jQuery(this).find('pubDate').eq(0).text();
                item.shortdate = (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
                item.fullmonths = (fullmonths[date.getMonth()]) + ' ' + date.getDate() + ', ' + date.getFullYear();
            item.id = jQuery(this).find('guid').eq(0).text();
            //item.image = jQuery(this).find('description').find('img').attr('url');
            item.image = jQuery(this).find('enclosure').attr('url');

            feed.items.push(item);

        });
    }
};

