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
});