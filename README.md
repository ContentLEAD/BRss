# bRss

<p>bRss is an rss feed parser based off of the <a target="_blank" href="https://github.com/jfhovinne/jFeed/">jFeed</a> plugin.</p>

<h2>Options:</h2>

<strong>url:</strong> the url to the rss feed<br />
<strong>wrapper:</strong> true/false<br />
<strong>wrappername:</strong> if wrapper is set to true, add a name to the div that wraps around your feed items here<br />
<strong>date:</strong> true/false<br />
<strong>dateformat:</strong> if date is set to true, the dateformat can be set to one of these options<br />
<ul>
<li>"fullmonths" - i.e. January 15 2015</li>
<li>"shortdate" - i.e. 1/15/15</li>
</ul>
<strong>image:</strong> true/false<br />
<strong>category:</strong> true/false<br />
<strong>catheader:</strong> if category is set to true, add the text you want to display before the cat name here<br />
<strong>author:</strong> true/false<br />
<strong>authorheader:</strong> if author is set to true, add the text you want to display before the author name here<br />
<strong>description:</strong> true/false - displays the post excerpt<br />
<strong>count:</strong> enter the number of feed items you want to display here<br />
<strong>style:</strong> depending on the number of feed items, there are numerous inline style options:
<ul>
<li>"grid" - default style for three feed items</li>
<li>"zrss" - legacy style option for clients previously using the zrssFeed plugin</li>
<li>"grid4" - displays four items in one row</li>
<li>"grid4box" - displays two items in one row</li>
<li>"grid5" - displays three items in one row, two in a second row</li>
<li>"grid6" - displays thee items in one row, and three in a second row</li>
</ul>

<h3>Setting Everything Up</h3>

<p>First include jQuery, then the bRss script.</p>

<pre>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script type="text/javascript" src="dist/bRss.js"></script>
</pre>

<p>Add this script to define the plugin options. Options that are not included will automatically default to false. This example calls 3 items from brafton.com's blog feed.</p>

<pre>
	<script type="text/javascript">
	jQuery(function() {
		$("#result").BraftonRss({
		    		   url: 'http://brafton.com/blog/feed',
		           wrapper: true,
		       wrappername: 'brss',
		        dateformat: 'fullmonths',
		             image: true,
		              date: true,
		          category: true,
		         catheader: 'Posted in: ',
		            author: true,
		      authorheader: 'By: ',
		       description: true,
		             style: 'grid',
		             count: '3'
		    });
		});
	</script>
</pre>

<p>Last, add the below code to call the feed items wherever you want them to display on the page:</p>

<pre>
	<div id="result"></div>
</pre>