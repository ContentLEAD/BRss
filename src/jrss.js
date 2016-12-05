function JRss(xml) {
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

