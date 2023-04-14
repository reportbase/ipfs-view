export default
{
	async fetch(request, env, ctx)
    {
        const UNSPLASH_KEY = env.UNSPLASH_KEY
        var url = new URL(request.url);
        var search = url.searchParams.get("search");
        var page = url.searchParams.has("page") ?url.searchParams.get("page") : 0;
        var per_page = 30;
        var pages = 8;
        var data = [];
        var start = page*pages;
        var finish = (page+1)*pages;
        for (var n = start; n < finish; ++n)
        {
            var response = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=${UNSPLASH_KEY}&per_page=${per_page}&page=${n+1}`);
            if (!response.ok)
                break;
            var json = await response.json();
            for (var m = 0; m < json.results.length; ++m)
            {
                var k = json.results[m];
                var j = {};
                var width = k.width;
                var height = k.height;
                var aspect = (width/height).toFixed(2);
                var user = k.user;
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
                j.photographer = user.name;
                j.credit  = `Photo by ${j.photographer} from Unsplash`
                j.datasource = "Unsplash";
                j.photographer_url = user.links.html;
                j.photographer_id = user.id;
                if (k.description)
                    j.description = k.description;
                if (k.alt_description)
                    j.alt_description = k.alt_description;
                j.image_url = k.links.html;
                j.original = k.urls.raw;
                if (width > height)
                    j.full = `${j.original}&q=80&h=1080`;
                else
                    j.full = `${j.original}&q=80&w=2160`;
                j.thumb = k.urls.small;
                j.created = k.created_at.substr(0,10);
                j.id = k.id;
                data.push(j);
            }

            if (json.results.length < per_page)
                break;
        }

        var g = {}
        g.title = `Unsplash Gallery`;
        g.repos = "unsplash";
        g.row = 50;
        g.per_page = per_page;
        g.data = data;

        var headers = new Headers(
        {
		    'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
	    });

        return new Response(JSON.stringify(g), { headers, });
	},
};
