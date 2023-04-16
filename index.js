//todo: https://obfuscator.io
//todo: safari max size

/* ++ += ==
Copyright 2017 Tom Brinkman
http://www.reportbase.com
*/

const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const SAFIROX = SAFARI || FIREFOX;
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*2;
const SWIPETIME = 100;
const MENUBARWIDTH = 12;
const MENUPANWIDTH = 40;
const MENUBARHEIGHT = 60;
const THUMBORDER = 2;
const JULIETIME = 100;
const DELAY = 10000000;
const ALIEXTENT = 60;
const BEXTENT = 80;
const TIMEOBJ = 3927;
const DELAYCENTER = TIMEOBJ/1000;
const TIMEMID = TIMEOBJ/2;
const MENUSELECT = "rgba(255,175,0,0.75)";
const MENUTAP = "rgba(255,175,0,0.75)";
const SCROLLNAB = "rgba(0,0,0,0.4)";
const BARFILL = "rgba(0,0,0,0.4)";
const MENUCOLOR = "rgba(0,0,0,0.60)";
const OPTIONFILL = "white";
const THUMBFILP = "rgba(0,0,0,0.2)";
const THUMBFILL = "rgba(0,0,0,0.3)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const ARROWFILL = "white";
const SCROLLBARWIDTH = 8;
const SLIDEDEFAULT = 1500;
const SEARCHBOT = "rgb(200,200,200)";

globalobj = {};
let photo = {}
photo.image = 0;

function randomNumber(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function numberRange (start, end) {return new Array(end - start).fill().map((d, i) => i + start); }

let url = new URL(window.location.href);
url.row = url.searchParams.has("r") ? Number(url.searchParams.get("r")) : 50;
url.slideshow = url.searchParams.has("s") ? Number(url.searchParams.get("s")) : 0;
url.slidetop = url.searchParams.has("o") ? Number(url.searchParams.get("o")) : 1;
url.slidereduce = url.searchParams.has("e") ? Number(url.searchParams.get("e")) : 500;
url.thumb = url.searchParams.has("t") ? Number(url.searchParams.get("t")) : 1;
url.page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;

Math.clamp = function (min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

let circular_array = function (title, data)
{
    this.title = title;
    this.ANCHOR = 0;
    this.CURRENT = 0;
    this.data = data;
    this.length = function () { return Array.isArray(this.data) ? this.data.length : Number(this.data); };

    this.getcurrent = function ()
    {
        if (this.CURRENT < this.length() && Array.isArray(this.data))
            return this.data[this.CURRENT];
        return this.CURRENT;
    };

    this.get = function (index)
    {
        index += this.CURRENT;
        if (index >= this.length())
            index = 0;
        else if (index < 0)
            index = this.length()-1;
        return Array.isArray(this.data) ? this.data[index] : index;
    };

    this.anchor = function () { return this.ANCHOR; };
    this.current = function () { return this.CURRENT; };

    this.print = function()
    {
        return (this.current()+1).toFixed(0)  +"-"+ this.length().toFixed(0)
    };

    this.split = function(k,j,size)
    {
        k = Math.floor(k);
        let s = j.split("-");
        let begin = Number(s[0]);
        let end = Number(s[1]);
        let mn = begin;
        let mx = end;
        let ad = (mx-mn)/size;
        if (mx == mn)
            size = 1;
        let lst = [];
        for (let n = 0; n < size; ++n, mn+=ad)
            lst.push(mn.toFixed(4));
        this.data = lst;
        this.set(k);
        this.begin = begin;
        this.end = end;
    }

    this.berp = function ()
    {
        if (this.length() == 1)
            return 0;
        return Math.berp(0,this.length()-1,this.current());
    };

    this.lerp = function ()
    {
        if (this.length() == 1)
            return 0;
        return Math.lerp(0,this.length()-1,this.current()/this.length());
    };

    this.rotate = function (index)
    {
        this.CURRENT+=index;
        if (this.CURRENT >= this.length())
            this.set(this.CURRENT-this.length());
        else if (this.CURRENT < 0)
            this.set(this.length()-this.CURRENT);
    };

    this.setanchor = function (index)
    {
        if (typeof index === "undefined" || Number.isNaN(index) || index == null)
            index = 0;
        this.ANCHOR = Math.clamp(0, this.length() - 1, index);
    };

    this.setdata = function (data)
    {
        this.data = data;
        if (this.current() >= this.length())
            this.setcurrent(this.length()-1);
    };

    this.setcurrent = function (index)
    {
        if (typeof index === "undefined" || Number.isNaN(index) || index == null)
            index = 0;
        this.CURRENT = Math.clamp(0, this.length() - 1, index);
    };

    this.set = function (index)
    {
        this.setcurrent(index);
        this.setanchor(index);
    };

    this.add = function (index)
    {
        this.set(Number(this.current())+Math.floor(index));
    };

    this.addperc = function (perc)
    {
        var k = this.current() + ((perc/100)*this.length());
        this.set(k);
    };

    this.setperc = function (perc)
    {
        var k = Math.floor(perc*this.length());
        this.set(k);
    };

    this.find = function (k)
    {
        let j = this.data.findIndex(function(a){return a == k;})
        if (j == -1)
            return 0;
        return this.data[j];
    }
};

var timemain = new circular_array("TIMEMAIN", 30);
timemain.set(0);
var speedyobj = new circular_array("SPEEDY", 100);
var colobj = new circular_array("COLUMNS", [0,10,20,30,40,50,60,70,80,90].reverse());
var channelobj = new circular_array("CHANNELS", [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);

function drawslices()
{
    if (photo.image &&
        photo.image.complete &&
        photo.image.naturalHeight)
    {
        for (var n = 0; n < 1; n++)
        {
            var context = _4cnvctx;
            var rect = context.rect();
            if (rect.width == 1)
                continue;

            if (!context.timemain && context.lastime == context.timeobj.current())
                continue;
            else
                context.lastime = context.timeobj.current();

            if (context.timemain)
            {
                context.slidestop -= context.slidereduce;
                if (context.slidestop > 0)
                {
                    context.timeobj.rotate(context.autodirect*context.slidestop);
                }
                else
                {
                    clearInterval(context.timemain);
                    context.timemain = 0;
                }
            }

            var stretch = stretchobj.getcurrent();
            context.virtualpinch = context.virtualwidth*stretch.getcurrent()/100;
            var colwidth = context.colwidth;
            context.virtualeft = (context.virtualpinch-rect.width)/2-colwidth;
            var j = (colwidth/(colwidth+context.virtualwidth))*TIMEOBJ;
            var time = (context.timeobj.getcurrent()+j)/1000;
            var slicelst = context.sliceobj.data;
            var slice = slicelst[0];
            if (!slice)
                break;
            context.save();
            if (galleryobj.getcurrent().ispng || factorobj.enabled)
                context.clear();
            context.translate(-colwidth, 0);
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            var j = time+slice.time;
            var b = Math.tan(j*VIRTCONST);
            var bx = Math.berp(-1, 1, b) * context.virtualpinch - context.virtualeft;
            var extra = colwidth;
            var width = rect.width+extra;
            var x1,xn,s1,sn;
            for (var m = 0; m < slicelst.length; ++m)
            {
                slicelst[m].visible = 0;
                slicelst[m].stretchwidth = 0;
            }

            for (var m = 1; m < slicelst.length; ++m)
            {
                var slice = slicelst[m];
                var j = time + slice.time;
                var b = Math.tan(j*VIRTCONST);
                var bx2 = Math.berp(-1, 1, b) * context.virtualpinch - context.virtualeft;
                var stretchwidth = bx2-bx;//todo shows lines on firefox
                slice.stretchwidth = stretchwidth;
                slice.bx = bx;
                if (m == 1)
                {
                    x1 = slice.bx;
                    s1 = stretchwidth;
                }
                else if (m == slicelst.length-1)
                {
                    xn = slice.bx;
                    sn = stretchwidth-2;
                }

                if (bx >= rect.width+colwidth || bx2 < colwidth)
                {
                    bx = bx2;
                    continue;
                }

                slice.visible = 1;
                slice.strechwidth = stretchwidth;
                var wid = factorobj.enabled ? context.colwidth : stretchwidth;
                context.drawImage(slice.canvas, slice.x, 0, context.colwidth, rect.height,
                  slice.bx, 0, wid, rect.height);
                bx = bx2;
            }

            var x = xn+sn;
            var w = x1-x;
            if (x+w > colwidth && x < rect.width+colwidth)
            {
                var slice = slicelst[0];
                slice.visible = 1;
                slice.strechwidth = w;
                var wid = factorobj.enabled ? context.colwidth : w;
                context.drawImage(slice.canvas, 0, 0, context.colwidth, rect.height,
                      x, 0, wid, rect.height);
            }

            context.restore();
            delete context.selectrect;
            delete context.thumbrect;
            delete context.slicectrl;

            if (context.setcolumncomplete)
            {
                thumbobj.getcurrent().draw(context, rect, 0, 0);
            }

             context.setcolumncomplete = 1;
        }
    }

    var lst = [_1cnvctx, _2cnvctx, _3cnvctx,  _5cnvctx, _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx,];
    for (var n = 0; n < lst.length; n++)
    {
        var context = lst[n];
        if (!context.enabled)
            continue;
        if (!context.canvas.height)
            continue;
        var time = context.timeobj.getcurrent()/1000;
        if ((context.lastime.toFixed(8) == time.toFixed(8)))
            continue;
        else
            context.lastime = Number(time.toFixed(8));

        if (context.slideshow > 0)
        {
            var k = (context.swipetype == "swipeup")?-1:1;
            context.timeobj.rotate(k*context.slideshow);
            context.slideshow -= context.slidereduce
        }
        else
        {
            context.slideshow = 0;
            clearInterval(context.timemain);
            context.timemain = 0;
        }

        var slices =  context.sliceobj.data;
        var r = context.rect();
        var w = r.width;
        var h = r.height;
        context.fillStyle = MENUCOLOR;
        context.clear();
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.visibles = [];

        var k;
        for (var m = 0; m < slices.length; ++m)
        {
            var slice = slices[m];
            slice.fitwidth = 0;
            slice.fitheight = 0;
            slice.time = time + (m*context.delayinterval);
            var e = (context.virtualheight-r.height)/2;
            var bos = Math.tan(slice.time *VIRTCONST);
            let y = Math.berp(-1, 1, bos) * context.virtualheight;
            y -= e;
            var x = w/2;
            var j = context.buttonheight*3;
            if (y < -j || y >= window.innerHeight+j)
                continue;
            context.visibles.push({slice, x, y, m});
        }

        for (var m = 0; m < context.visibles.length; ++m)
        {
            var j = context.visibles[m];
            j.slice.center = {x: j.x, y: j.y};
            context.save();
            context.translate(j.x, j.y);
            context.draw(context, context.rect(), j.slice, j.m);
            context.restore();
        }

        var rect = context.rect();
        context.bar.draw(context, rect, 0, 0);
        context.scroll.draw(context, rect, 0, 0);
    }
}

const opts =
{
    synchronized: true,
    alpha: true,
    antialias: false,
    depth: false,
};

const opts4 =
{
    synchronized: true,
    antialias: false,
    depth: false,
};

let _1cnv = document.getElementById("_1");
let _1cnvctx = _1cnv.getContext("2d", opts);
let _2cnv = document.getElementById("_2");
let _2cnvctx = _2cnv.getContext("2d", opts);
let _3cnv = document.getElementById("_3");
let _3cnvctx = _3cnv.getContext("2d", opts);
let _4cnv = document.getElementById("_4");
let _4cnvctx = _4cnv.getContext("2d", opts4);
let _5cnv = document.getElementById("_5");
let _5cnvctx = _5cnv.getContext("2d", opts);
let _6cnv = document.getElementById("_6");
let _6cnvctx = _6cnv.getContext("2d", opts);
let _7cnv = document.getElementById("_7");
let _7cnvctx = _7cnv.getContext("2d", opts);
let _8cnv = document.getElementById("_8");
let _8cnvctx = _8cnv.getContext("2d", opts);
let _9cnv = document.getElementById("_9");
let _9cnvctx = _9cnv.getContext("2d", opts);
let headcnv = document.getElementById("head");
let headcnvctx = headcnv.getContext("2d", opts);

headcnvctx.scrollobj = new circular_array("TEXTSCROLL", window.innerWidth/4);

let contextlst = [_1cnvctx,_2cnvctx,_3cnvctx,_4cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
let canvaslst = [];
canvaslst[0] = document.createElement("canvas");
canvaslst[1] = document.createElement("canvas");
canvaslst[2] = document.createElement("canvas");
canvaslst[3] = document.createElement("canvas");
canvaslst[4] = document.createElement("canvas");
canvaslst[5] = document.createElement("canvas");

var Empty = function()
{
    this.draw = function (context, rect, user, time)
    {
    }
};

var BarPanel = function (header)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.cancel = new rectangle();
        context.header = new rectangle();
        context.font = "1rem Archivo Black";
        var a = new RowA([50,0,BEXTENT],
        [
            new LayerA(
            [
                new Rectangle(context.header),
                new Fill(BARFILL),
                new Text("white", "center", "middle", 0, 0, 1),
                new Col([0,0,50,15],
                [
                    0,
                    0,
                    new Layer(
                    [
                        new Rectangle(context.cancel),
                        new Shrink(new CirclePanel(context.tapped==1?MENUSELECT:SCROLLNAB,SEARCHFRAME,4),10,10),
                        new Text(SEARCHBOT, "center", "middle", 0, 0, 1),
                    ]),
                    0,
                ]),
            ]),
            0,
            0
        ]);

        a.draw(context, rect,
        [
            [
                0,
                0,
                header,
                "X",
            ],
            0,
            0,
        ]);

        context.restore();
    }
};

var AboutBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.email = new rectangle();
        context.font = "1rem Archivo Black";
        var a = new Row([50,0,BEXTENT],
        [
            new BarPanel("Options"),
            0,
            new LayerA(
            [
                new Fill(BARFILL),
                new Rectangle(),
                new RowA([0,24,24,0],
                [
                    0,
                    new Text("white", "center", "middle",0, 0, 1),
                    new Text("white", "center", "middle",0, 0, 1),
                    0,
                ]),
            ])
        ]);

        a.draw(context, rect,
        [
            0,
            context.email,
            [
                0,
                "Contact",
                "images@reportbase.com",
                0,
            ]
        ], time);

        context.restore();
    }
};


var SearchBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.cancel = new rectangle();
        context.header = new rectangle();
        context.footer = new rectangle();
        context.moveup = new rectangle();
        context.movedown = new rectangle();
        context.search = new rectangle();
        context.font = "0.92rem Archivo Black";
        var a = new RowA([70,0,80],
        [
            new Layer(
            [
                new Fill(BARFILL),
                new Rectangle(context.header),
                new ColA([15,70,0,70,15],
                [
                    0,
                    0,
                    new MultiText(0),
                    new Layer(
                    [
                        new Rectangle(context.cancel),
                        new Shrink(new CirclePanel(context.tapped==3?MENUSELECT:SCROLLNAB,SEARCHFRAME,4),19,19),
                        new Text("white",  "center", "middle", 0, 0, 1),
                    ]),
                    0,
                ]),
            ]),
            0,
            new Layer(
            [
                new Fill(BARFILL),
                new Rectangle(context.footer),
                new ColA([15,60,0, 20,60,20, 0,60,15],
                [
                    0,
                    new Layer(
                    [
                        new Rectangle(context.moveup),
                        new Shrink(new CirclePanel(context.tapped==1?MENUSELECT:SCROLLNAB,SEARCHFRAME,4),19,19),
                        new Shrink(new ArrowPanel(SEARCHBOT,0),22,32),
                    ]),
                    new Text("white", "right", "middle", 0, 0, 1),
                        0,
                        new Layer(
                        [
                            new Rectangle(context.search),
                            new SearchPanel("white","black"),
                        ]),
                        0,
                    new Text("white", "left", "middle", 0, 0, 1),
                    new Layer(
                    [
                        new Rectangle(context.movedown),
                        new Shrink(new CirclePanel(context.tapped==2?MENUSELECT:SCROLLNAB,SEARCHFRAME,4),19,19),
                        new Shrink(new ArrowPanel(SEARCHBOT,180),22,32),
                    ]),
                    0,
                ]),
            ])
        ]);

        var e = url.path;
        if (galleryobj.repos)
            e = `${galleryobj.repos}\n${url.path}`;
        else if (galleryobj.title)
            e = galleryobj.title;
        var j = Math.lerp(1,context.sliceobj.length(),1-context.timeobj.berp());
        a.draw(context, rect,
        [
            [
                0,
                0,
                e.proper().split("\n"),
                "X",
                0,
            ],
            0,
            [
                0,
                0,
                j.toFixed(0),
                0,
                0,
                0,
                context.sliceobj.length().toFixed(0),
                0,
                0,
            ],
        ])

        context.restore();
    }
};

var DualPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.font = "1rem Archivo Black";
        var a = new ColA([SCROLLBARWIDTH,0,SCROLLBARWIDTH],
        [
            new CurrentVPanel(new Fill("rgba(255,255,255,0.75)"), 90, 0),
            0,
            new CurrentVPanel(new Fill("rgba(255,255,255,0.75)"), 90, 1),
        ]);

        a.draw(context, rect,
        [
            context.index == 7 ? context.scrollobj.getcurrent(): context.scrollobj,
            0,
            context.timeobj
        ],
        0);

        context.restore();
    }
};

var ScrollBarPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.font = "1rem Archivo Black";

        var a = new Col([SCROLLBARWIDTH,0,SCROLLBARWIDTH],
        [
            0,
            0,
            new CurrentVPanel(new Fill("rgba(255,255,255,0.75)"), 90, 1),
        ]);

        a.draw(context, rect, context.timeobj, 0);
        context.restore();
    }
};

var eventlst =
[
    {name: "_1cnvctx", mouse: "DEFAULT", thumb: "DEFAULT", tap: "DEFAULT", pan: "DEFAULT", swipe: "DEFAULT", draw: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "DEFAULT", press: "DEFAULT", pinch: "DEFAULT", bar: new Empty(), scroll: new ScrollBarPanel(), buttonheight: 0},
    {name: "_2cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "SMENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU",  drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new BarPanel("Account"), scroll: new ScrollBarPanel(), buttonheight: 50},
    {name: "_3cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "SMENU", pan: "MENU", swipe: "MENU", draw: "EMENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new BarPanel("Search"), scroll: new DualPanel(), buttonheight: 90},
    {name: "_4cnvctx", mouse: "BOSS", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", draw: "BOSS", wheel: "BOSS", drop: "BOSS", key: "BOSS", press: "BOSS", pinch: "BOSS", bar: new Empty(), scroll: new DualPanel(), buttonheight: 30},
    {name: "_5cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "SMENU", pan: "MENU", swipe: "MENU", draw: "EMENU", wheel:  "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new BarPanel("Metadata"), scroll: new DualPanel(), buttonheight: 90},
    {name: "_6cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "SMENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new BarPanel("Share"), scroll: new ScrollBarPanel(), buttonheight: 50},
    {name: "_7cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "EMENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new Empty(), scroll: new DualPanel(), buttonheight: 90},
    {name: "_8cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "SEARCHTAP", pan: "MENU", swipe: "MENU", draw: "SEARCH", wheel: "MENU", drop: "DEFAULT", key: "GMENU", press: "GPRESS", pinch: "DEFAULT", bar: new SearchBar(), scroll: new DualPanel(), buttonheight: 200},
    {name: "_9cnvctx", mouse: "MENU", thumb: "DEFAULT", tap: "OPTIONTAP", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new AboutBar(), scroll: new ScrollBarPanel(), buttonheight: 50},
];

function seteventspanel(panel)
{
    _1ham.panel = panel;
    _2ham.panel = panel;
    _3ham.panel = panel;
    _4ham.panel = panel;
    _5ham.panel = panel;
    _6ham.panel = panel;
    _7ham.panel = panel;
    _8ham.panel = panel;
    _9ham.panel = panel;
}

function setevents(context, obj)
{
    context.bar = obj.bar;
    context.scroll = obj.scroll;
    context.buttonheight = obj.buttonheight;

    var k = pinchlst.findIndex(function (a) { return a.name == obj.pinch });
    k = pinchlst[k];
    context.pinch_ = k.pinch;
    context.pinchstart_ = k.pinchstart;
    context.pinchend_ = k.pinchend;

    var k = droplst.findIndex(function (a) { return a.name == obj.drop });
    k = droplst[k];
    context.drop = k.drop;

    var k = keylst.findIndex(function (a) { return a.name == obj.key });
    k = keylst[k];
    context.keyup_ = k.keyup;
    context.keydown_ = k.keydown;

    var k = wheelst.findIndex(function (a) { return a.name == obj.wheel });
    k = wheelst[k];
    context.wheelup_ = k.up;
    context.wheeldown_ = k.down;

    var k = mouselst.findIndex(function (a) {return a.name == obj.mouse});
    k = mouselst[k];
    context.mouse = k;

    var k = presslst.findIndex(function (a) {return a.name == obj.press});
    k = presslst[k];
    context.pressup_ = k.pressup;
    context.press_ = k.press;

    var k = swipelst.findIndex(function (a) {return a.name == obj.swipe});
    k = swipelst[k];
    context.swipeleftright_ = k.swipeleftright;
    context.swipeupdown_ = k.swipeupdown;

    var k = menulst.findIndex(function (a) {return a.name == obj.draw});
    k = menulst[k];
    context.draw = k.draw;

    var k = taplst.findIndex(function (a) {return a.name == obj.tap});
    k = taplst[k];
    context.tap_ = k.tap;

    var k = panlst.findIndex(function (a) {return a.name == obj.pan});
    k = panlst[k];
    context.panstart_ = k.panstart;
    context.pan_ = k.pan;
    context.panupdown_ = k.updown;
    context.panleftright_ = k.leftright;
    context.panend_ = k.panend;
}


function calculateAspectRatioFit(imgwidth, imgheight, rectwidth, rectheight)
{
	let ratio = Math.min(rectwidth/imgwidth, rectheight/imgheight);
	let imgaspectratio = imgwidth/imgheight;
	let rectaspectratio = rectwidth/rectheight;
	let xstart = 0;
	let ystart = 0;
	let width = imgwidth * ratio;
	let height = imgheight * ratio;
	if (imgaspectratio < rectaspectratio)
	{
		xstart = (rectwidth - width) / 2;
		ytart = 0;
	}
	else if (imgaspectratio > rectaspectratio)
	{
		xstart = 0;
		ystart = (rectheight - height) / 2;
	}

	return new rectangle(xstart, ystart, width, height);
}

function downloadtext(name, text)
{
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', name);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

Math.berp = function (v0, v1, t) { return (t - v0) / (v1 - v0); };
Math.lerp = function (v0, v1, t) { return (1 - t) * v0 + t * v1; };

String.prototype.proper = function()
{
    if (!this.length)
        return this;
    return this.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

String.prototype.clean = function()
{
	let _trimLeft  = /^\s+/,
        _trimRight = /\s+$/,
	    _multiple  = /\s+/g;
	return this.replace(_trimLeft, '').replace(_trimRight, '').replace(_multiple, ' ');
};

Array.prototype.sum = function()
{
    return this.reduce(function(a,b){return a+b;});
};

Array.prototype.move = function (from, to)
{
    this.splice(to, 0, this.splice(from, 1)[0]);
};

String.prototype.wild = function (e)
{
    let re = new RegExp("^" + e.split("*").join(".*") + "$");
    return re.test(this);
};

var PatternPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        const cnv = document.createElement('canvas');
        const ctx = cnv.getContext('2d');
        cnv.width = 50;
        cnv.height = 50;
        ctx.fillStyle = '#fec';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.arc(0, 0, 50, 0, .5 * Math.PI);
        ctx.stroke();
        const pattern = context.createPattern(cnv, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
};

var DrawHeader = function (e)
{
    this.draw = function (context, rect, user, time)
    {
        var lst = wraptext(context, user, rect.width);
        var len = Math.min(lst.length,Math.floor(rect.height/20));
        var k = len < lst.length;
        rect.y -= 12;
        var lines = wraptext(context, user, rect.width);
        if (e)
        {
            var j = Math.floor(Math.lerp(0,lines.length-1,e));
            lines = lines.slice(j);
        }

        for (var m = 0; m < lines.length; m++)
        {
            var str = lines[m].clean();
            if (!str.length)
                continue;
            var a = new Text("white", "center", "middle", 0, 0, 1);
            a.draw(context, rect, str, 0);
            rect.y += 20;
        }
    };
};

var MultiText = function (e)
{
    this.draw = function (context, rect, user, time)
    {
        var lst = [];
        for (var n = 0; n < user.length; n++)
        {
            var str = user[n].clean();
            if (!str.length)
                continue;
            lst = lst.concat(wraptext(context, str, Math.min(640,rect.width)));
        }

        var rowheight = 20;
        var len = Math.min(lst.length,Math.floor(rect.height/rowheight));
        var k = len < lst.length;
        rect.y -= (len*(rowheight))/2;
        rect.y += 10;

        if (e)
        {
            var j = Math.round(Math.lerp(0,lst.length-1,e));
            lst = lst.slice(j);
        }

        for (var n = 0; n < Math.min(len,lst.length); n++)
        {
            var lines = wraptext(context, lst[n], Math.min(640,rect.width));
            for (var m = 0; m < lines.length; m++)
            {
                var str = lines[m].clean();
                if (!str.length)
                    continue;
                var a = new Text("white", "center", "middle", 0, 0, 1);
                a.draw(context, rect, str, 0);
                rect.y += rowheight;
            }
        }
    };
};

var Fill = function (color)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fillStyle = color?color:user;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };
};

var InfoPanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
		context.fillStyle = "white";
		context.strokeStyle = "white";
        context.font = "2rem Archivo Black";

        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,3),15,15),
            _5cnvctx.enabled ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
            new Text("white", "center", "middle",0, 0, 0),
        ]);

        a.draw(context, rect, "i", time);
        context.restore();
    }
};

var SharePanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();

        var Panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                context.save();
                var a = new CirclePanel("white",TRANSPARENT,3);
                rect.x += 12;
                rect.y += 7;
                rect.width = 9;
                rect.height = 9;
                a.draw(context, rect, user, time);
                rect.y += 17;
                a.draw(context, rect, user, time);
                rect.x += -16;
                rect.y += -8;
                a.draw(context, rect, user, time);
		        context.strokeStyle = "white";
                context.lineWidth = 1.5;
                context.beginPath();
                context.moveTo(rect.x+2, rect.y+2);
                context.lineTo(rect.x+16, rect.y+11);
                context.stroke();
                context.moveTo(rect.x+2, rect.y+5);
                context.lineTo(rect.x+16, rect.y-3);
                context.stroke();
                context.restore();
            }
        };

        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,3),16,16),
            _6cnvctx.enabled ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
            new Shrink(new Panel(),20,20),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var PagesPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var a = new Col([0,9,4,9,4,9,0],
        [
            0,
            new CirclePanel("white","white",0),
            0,
            new CirclePanel("white","white",0),
            0,
            new CirclePanel("white","white",0),
            0,
        ])
        a.draw(context, rect, user, time);
        context.restore();
    }
};

var ThumbPanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,3),15,15),
            thumbobj.current() ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
            new Shrink(new CirclePanel(TRANSPARENT,"white",3),22,22),
        ])
        a.draw(context, rect, user, time);
        context.restore();
    }
};

var SearchPanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var Panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                var a = new CirclePanel(TRANSPARENT,"white",4);
                rect.x -= 2;
                rect.y += 7;
                rect.width = 19 ;
                rect.height = 19;
                a.draw(context, rect, user, time);
		        context.strokeStyle = "white";
                context.lineWidth = 8;
                context.beginPath();
                context.moveTo(rect.x+14, rect.y+16);
                context.lineTo(rect.x+22, rect.y+27);
                context.stroke();
            }
        };

        const overlay = document.querySelector('.search-overlay');
        var j = overlay.style.display == 'flex';

        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,4),13,13),
            j ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),17,17) : 0,
            new Shrink(new Panel(),20,20),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var FolderPanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,"white",3),15,15),
            galleryobj.getcurrent().file ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
        ])
        a.draw(context, rect, user, time);
		context.fillStyle = "white";
		context.strokeStyle = "white";
        var x = rect.x+20;
        var y = rect.y+33;
        context.lineWidth = 2.5;
        context.strokeRect(x, y, 21, 16);
        context.fillRect(x, y-5, 10, 4);
        context.restore();
    }
};

var FullPanel = function (color, shadow)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,3),15,15),
            screenfull.isFullscreen ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
        ])
        a.draw(context, rect, user, time);
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.strokeStyle = color;
		context.shadowColor = shadow;

        var e = 6;
        var x = 21.5;
        var y = 31;
        var r = new rectangle(rect.x+x,rect.y+y,rect.width,rect.height);
        context.lineWidth = 3;
        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e
        path.moveTo(x,y);
        y -= e;
        path.lineTo(x,y);
        x += e;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x+e*3;
        var y = r.y;
        var path = new Path2D();
        y += e;
        path.moveTo(x,y);
        y -= e;
        path.lineTo(x,y);
        x -= e;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x+e*3;
        var y = r.y;
        var path = new Path2D();
        y += e*2;
        path.moveTo(x,y);
        y += e;
        path.lineTo(x,y);
        x -= e;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e*2;
        path.moveTo(x,y);
        y += e;
        path.lineTo(x,y);
        x += e;
        path.lineTo(x,y);
        context.stroke(path);
        context.restore();
    }
};

var ProgressPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        const PROGRESSFILL = "white";
        const PROGRESSFALL = "black";
        user = _4cnvctx.timeobj;
        context.save();
        var percent = (1-user.berp())*100;
        let centerX = rect.x + rect.width / 2;
        let centerY = rect.y + rect.height / 2;
        let radius = rect.height/2-16;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = "black"
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = PROGRESSFILL;
        context.fill();

        let startAngle = 1.5 * Math.PI;
        let unitValue = (Math.PI - 0.5 * Math.PI) / 25;
        if (percent >= 0 && percent <= 25)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 25 && percent <= 50)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 50 && percent <= 75)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 75 && percent <= 100)
            endAngle = startAngle + (percent * unitValue);

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle, false);
        context.closePath();
        context.fillStyle = PROGRESSFALL;
        context.fill();
        context.restore();
    };
};

var Stroke = function (color, width)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.lineWidth = width;
        context.strokeStyle = color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    }
}

var PlusPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var a = new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,4),15,15);
        a.draw(context, rect, 0, 0);

        context.save();
        context.translate(rect.width/2-9,rect.height/2-8);
	    var w = rect.width
        var h = rect.height
        var x = rect.x;
        var y = rect.y;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = "black";
		context.fillStyle = "white";
	    var path = new Path2D();
        x += 6;
        y -= 3;
		path.moveTo(x,y);
        x += 5;
		path.lineTo(x,y);
        y += 22;
		path.lineTo(x,y);
        x += -5;
		path.lineTo(x,y);
        y += 22;
		path.lineTo(x,y);
		context.fill(path);

        var x = rect.x-3;
        var y = rect.y+5;
		path.moveTo(x,y);
        x += 22;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
        x += -22;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
		context.fill(path);
        context.restore();
    };
};

var MinusPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var a = new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,4),15,15);
        a.draw(context, rect, 0, 0);

        context.save();
        context.translate(rect.width/2-7,rect.height/2-7);
	    var w = rect.width
        var h = rect.height
        var x = rect.x;
        var y = rect.y;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.fillStyle = "white";
        context.shadowColor = "black";
	    var path = new Path2D();
        var x = rect.x-3;
        var y = rect.y+5;
		path.moveTo(x,y);
        x += 21;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
        x += -21;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
		context.fill(path);
        context.restore();
    };
};

var ArrowPanel = function (color, degrees)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var w = rect.width
        var h = rect.height
        var x = rect.x
        var y = rect.y
        var k = degrees == 270 ? 0 : 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.translate(x+w/2-k, y+h/2);
        context.rotate(degrees*Math.PI/180.0);
        context.translate(-x-w/2, -y-h/2);
	    var path = new Path2D();
		path.moveTo(rect.x+rect.width/2,rect.y);
		path.lineTo(rect.x+rect.width,rect.y+rect.height-3);
		path.lineTo(rect.x,rect.y+rect.height-3);
		path.lineTo(rect.x+rect.width/2,rect.y);
		context.lineWidth = 2;
		context.fillStyle = color;
		context.strokeStyle = color;
    	context.fill(path);
        context.restore();
    };
};

function rectangle(x, y, w, h, user)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.user = user;
    this.right = x+w;
    this.left = x;
    this.top = y;
    this.bottom = y+h;
}

rectangle.prototype.hitest = function (x, y)
{
    return x >= this.x && y >= this.y &&
		x < (this.x + this.width) && y < (this.y + this.height);
};

rectangle.prototype.get = function (x, y, w, h)
{
    return new rectangle(this.x + x, this.y + y, w, h);
};

rectangle.prototype.getindex = function(cols, rows, x, y)
{
    var b = (x-this.x)/this.width;
    var col = Math.floor(b*cols);
    var b = (y-this.y)/this.height;
    var row = Math.floor(b*rows);
    return cols*row+col;
}

rectangle.prototype.shrink = function (x, y)
{
	this.x += x;
	this.y += y;
	this.width -= x*2;
	this.height -= y*2;
    return this;
};

rectangle.prototype.expand = function (x, y)
{
	this.x -= x;
	this.y -= y;
	this.width += x*2;
	this.height += y*2;
    return this;
};

var addressobj = {}

addressobj.full = function (k)
{
    var zoom = zoomobj.getcurrent();
    var out = url.origin;
    out += url.pathname;
    if (!url.path)
        url.path = "0000";
    var p = url.path;
    if (!k)
        p+="."+galleryobj.current().pad(4);

    if (galleryobj.repos)
        out += `?${galleryobj.repos}=${p}`;
    else if (url.searchParams.has("sidney"))
        out += "?sidney="+p;
    else
        out += "?p="+p;

    out +=
        "&page="+url.page+
        "&t="+thumbobj.current()+
        "&s="+url.slideshow+
        "&o="+url.slidetop+
        "&e="+url.slidereduce+
        "&h="+headobj.current()+
        "&r="+(100*rowobj.berp()).toFixed();

    return out.toLowerCase();
};

CanvasRenderingContext2D.prototype.moveup = function()
{
    var k = rowobj.length()/channelobj.length()
    rowobj.add(-k);
}

CanvasRenderingContext2D.prototype.movedown = function()
{
    var k = rowobj.length()/channelobj.length()
    rowobj.add(k);
}

CanvasRenderingContext2D.prototype.movepage = function(j)
{
    var context = this;
    if (!_4cnvctx.setcolumncomplete)
        return;

    var e = galleryobj.current();
    galleryobj.rotate(j);
    var k = galleryobj.getcurrent();
    galleryobj.set(e);
    if (!k.file && (_4cnvctx.movingpage || !k.loaded || galleryobj.length() == 1))
    {
        clearTimeout(context.movepagetime);
        context.movepagetime = setTimeout(function() { masterload(); }, 500);
        _4cnvctx.movingpage = 0;
        this.refresh();
        return;
    }

    galleryobj.rotate(j);
    _4cnvctx.movingpage = j;
    if (!globalobj.slideshow)
    {
        headobj.set(3);
        headham.panel = headobj.getcurrent();
    }

    delete _4cnvctx.thumbcanvas;
    delete photo.image;
    _4cnvctx.setcolumncomplete = 0;
    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    contextobj.reset();
    setTimeout(function()
    {
        _4cnvctx.movingpage = 0;
        _4cnvctx.refresh();
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    }, 500);
}

CanvasRenderingContext2D.prototype.hide = function ()
{
    if (this.canvas.height == 0 && !this.enable)
        return;
    this.canvas.height = 0;
    this.enabled = 0;
};

CanvasRenderingContext2D.prototype.tab = function ()
{
    var context = this;
    context.slidestop = url.slidetop;
    context.slidereduce = context.slidestop/url.slidereduce;
    clearInterval(context.timemain);
    context.timemain = setInterval(function () { drawslices() }, timemain.getcurrent());
}

CanvasRenderingContext2D.prototype.refresh = function ()
{
    this.lastime = -0.0000000000101010101;
    drawslices()
};

CanvasRenderingContext2D.prototype.show = function (x, y, width, height)
{
	if (this.canvas.style.left != x+"px")
	    this.canvas.style.left = x+"px";
	if (this.canvas.style.top != y+"px");
		this.canvas.style.top = y+"px";
	if (this.canvas.width != width)
	    this.canvas.width = width;
	if (this.canvas.height != height)
	    this.canvas.height = height;
};

CanvasRenderingContext2D.prototype.rect = function ()
{
    return new rectangle(0, 0, this.canvas.width, this.canvas.height);
};

CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear || function (rect)
    {
        if (!rect)
            rect = new rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

var makehammer = function (context, v, t)
{
    var canvas = context.canvas;
    var ham = new Hammer(canvas, { domEvents: true });
	context.ham = ham;
    ham.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    ham.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    ham.get('swipe').set({ velocity: 0.6});//0.30
	ham.get('swipe').set({ threshold: 20});//10
	ham.get('press').set({ time: 350 });//251

	ham.on("pinch", function (evt)
	{
		evt.preventDefault();
		var x = evt.center.x;
		var y = evt.center.y;
		if (typeof (ham.panel.pinch) == "function")
			ham.panel.pinch(context, evt.scale);

		context.pinchblock = 1;
		clearTimeout(globalobj.pinch);
		globalobj.pinch = setTimeout(function() { context.pinchblock = 0; }, 400);
	});

	ham.on("pinchend", function (evt)
	{
		evt.preventDefault();
		if (typeof (ham.panel.pinchend) == "function")
			ham.panel.pinchend(context);
	});

	ham.on("pinchstart", function (evt)
	{
		context.pinchblock = 1;
		evt.preventDefault();
		var x = evt.center.x;
		var y = evt.center.y;
		if (typeof (ham.panel.pinchstart) == "function")
			ham.panel.pinchstart(context,
			    new rectangle(0, 0, ham.element.width, ham.element.height), x, y);
	});

	ham.on("swipeleft swiperight", function (evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
   	    evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.swipeleftright) == "function")
            ham.panel.swipeleftright(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.on("swipeup swipedown", function (evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
   	    evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.swipeupdown) == "function")
            ham.panel.swipeupdown(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.element.addEventListener("dragleave", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragenter", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragover", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("drop", function (evt)
    {
   	    evt.preventDefault();
        if (typeof (ham.panel.drop) !== "function")
            return;
        ham.panel.drop(context, evt);
    }, false);

    ham.element.addEventListener("mouseout", function (evt)
    {
        if (typeof (ham.panel.mouseout) !== "function")
            return;
        ham.panel.mouseout(context, evt);
    });

    ham.element.addEventListener("mouseenter", function (evt)
    {
        if (typeof (ham.panel.mouseenter) !== "function")
            return;
        ham.panel.mouseenter(context, evt);
    });

    ham.element.addEventListener("mousemove", function (evt)
    {
        var xj = parseInt(canvas.style.left, 10);
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof (ham.panel.mousemove) !== "function")
            return;
        ham.panel.mousemove(context, context.rect(), x, y);
    });

    ham.element.addEventListener("wheel", function (evt)
    {
        var xj = parseInt(canvas.style.left, 10);
        var x = evt.offsetX;
        var y = evt.offsetY;
        evt.preventDefault();
        if (evt.deltaY < 0)
        {
            if (typeof (ham.panel.wheelup) == "function")
                ham.panel.wheelup(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
        else
        {
            if (typeof (ham.panel.wheeldown) == "function")
                ham.panel.wheeldown(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
    });

	ham.on("press", function (evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.press) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.press(context,
			new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("pressup", function (evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.pressup) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.pressup(context,
			new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("panmove", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panmove) == "function")
            ham.panel.panmove(context, rect, x, y);
    });

    ham.on("panend", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panend) == "function")
            ham.panel.panend(context, rect, x, y);
    });

	ham.on("panstart", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        ham.x = evt.center.x;
        ham.y = evt.center.y;
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panstart) == "function")
            ham.panel.panstart(context, rect, x, y);
	});

    ham.on("panleft panright", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panleftright) == "function")
            ham.panel.panleftright(context, rect, x, y, evt.type);
        else if (evt.type == "panleft" && typeof (ham.panel.panleft) == "function")
            ham.panel.panleft(context, rect, x, y);
        else if (evt.type == "panright" && typeof (ham.panel.panright) == "function")
            ham.panel.panright(context, rect, x, y);
    });

    ham.on("pandown panup", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
    	evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, ham.element.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, ham.element.height - 1, evt.center.y - evt.target.offsetTop);
     	if (typeof (ham.panel.panupdown) == "function")
            ham.panel.panupdown(context, rect, x, y, evt.type);
        else if (evt.type == "panup" && typeof (ham.panel.panup) == "function")
            ham.panel.panup(context, rect, x, y);
        else if (evt.type == "pandown" && typeof (ham.panel.pandown) == "function")
            ham.panel.pandown(context, rect, x, y);
    });

    ham.on("pan", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
		var x = evt.center.x - evt.target.offsetLeft;
		var y = evt.center.y - evt.target.offsetTop;
		if (x < 0 || x >= ham.element.width)
			return;
		if (y < 0 || y >= ham.element.height)
			return;
		if (typeof (ham.panel.pan) == "function")
			ham.panel.pan(context,
				new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt.additionalEvent);
    });

	ham.on("tap", function (evt)
    {
		ham.context = 0;
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (x < 0 || x >= ham.element.width)
            return;
        if (y < 0 || y >= ham.element.height)
            return;
		if (typeof (ham.panel.tap) != "function")
			return;
        var k = evt.srcEvent;
		ham.panel.tap(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
 	});

	var panel = new function () { this.draw = function () {}; }();
    ham.panel = panel;
    return ham;
};

var _1ham = makehammer(_1cnvctx,0.5,15);
var _2ham = makehammer(_2cnvctx,0.5,15);
var _3ham = makehammer(_3cnvctx,0.5,15);
var _4ham = makehammer(_4cnvctx,0.5,15);
var _5ham = makehammer(_5cnvctx,0.5,15);
var _6ham = makehammer(_6cnvctx,0.5,15);
var _7ham = makehammer(_7cnvctx,0.5,15);
var _8ham = makehammer(_8cnvctx,0.5,15);
var _9ham = makehammer(_9cnvctx,0.5,15);
var headham = makehammer(headcnvctx,0.5,15);
_4ham.get('pinch').set({ enable: true });

var wheelst =
[
{
    name: "DEFAULT",
    up: function (context, ctrl, shift, alt) { },
 	down: function (context, ctrl, shift, alt) { },
},
{
    name: "MENU",
    up: function (context, ctrl, shift, alt)
    {
        var k = (16/context.virtualheight)*context.timeobj.length();
        context.timeobj.rotate(-k);
        context.refresh()
    },
 	down: function (context, ctrl, shift, alt)
    {
        var k = (16/context.virtualheight)*context.timeobj.length();
        context.timeobj.rotate(k);
        context.refresh()
    },
},
{
    name: "BOSS",
    up: function (context, x, y, ctrl, shift, alt)
    {
        if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            var obj = heightobj.getcurrent();
            delete context.thumbcanvas;
            obj.add(5);
            context.refresh();
        }
        else if (alt && ctrl)
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(-3);
            _4cnvctx.timeobj.rotate(TIMEOBJ*0.03);
            contextobj.reset()
        }
        else if (shift)
        {
            rowobj.add(-rowobj.length()*0.05);
            contextobj.reset();
        }
        else if (alt)
        {
            context.pinched = 1;
            stretchobj.getcurrent().add(-5);
            context.refresh()
        }
        else if (ctrl)
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(-5);
            contextobj.reset()
        }
        else
        {
            _4cnvctx.timeobj.rotate(TIMEOBJ*0.01);
            context.refresh();
        }
	},
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            var obj = heightobj.getcurrent();
            delete context.thumbcanvas;
            obj.add(-5);
            context.refresh();
        }
        else if (alt && ctrl)
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(3);
            _4cnvctx.timeobj.rotate(-TIMEOBJ*0.03);
            contextobj.reset()
        }
        else if (shift)
        {
            rowobj.add(rowobj.length()*0.05);
            contextobj.reset();
        }
        else if (alt)
        {
            context.pinched = 1;
            stretchobj.getcurrent().add(5);
            context.refresh()
        }
         else if (ctrl)
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(5);
            contextobj.reset()
        }
        else
        {
            _4cnvctx.timeobj.rotate(-TIMEOBJ*0.01);
            context.refresh();
        }
	},
},
];

var pinchlst =
[
{
    name: "DEFAULT",
    pinch: function (context, scale) { },
    pinchend: function (context) { },
    pinchstart: function (context, rect, x, y) { },
},
{
    name: "BOSS",
    pinch: function (context, scale)
    {
        var obj = context.obj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();
        _4cnvctx.pinched = 1;

        if (context.isthumbrect)
        {
            delete context.thumbcanvas;
            var f = Math.floor(obj.length()*Math.max(e,0.1));
            obj.set(f);
            context.refresh();
        }
        else
        {
            var f = Math.floor(obj.length()*e);
            scale = parseFloat(scale).toFixed(2);
            if (scale >= 1 && obj.current() < (obj.length()*0.15))
            {
                obj.set(f+2);
                context.savepinch = obj.getcurrent();
            }
            else if (scale <= 1 && obj.current() < (obj.length()*0.15))
            {
                obj.set(f-2);
                context.savepinch = obj.getcurrent();
            }
            else
            {
                obj.set(f);
            }

            contextobj.reset();
        }

        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    },
    pinchstart: function (context, rect, x, y)
    {
        context.pinching = 1;
        headobj.set(2);
        headham.panel = headobj.getcurrent();
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        context.clearpoints();
        context.isthumbrect = context.thumbrect && context.thumbrect.expand &&
            context.thumbrect.expand(40,40).hitest(x,y);
        if (context.isthumbrect)
            context.obj = heightobj.getcurrent();
        else
            context.obj = pinchobj.getcurrent().getcurrent();
        context.savepinch = context.obj.getcurrent()
    },
    pinchend: function (context)
    {
        clearTimeout(context.pinchtime);
        context.pinchtime = setTimeout(function()
        {
            context.pinching = 0;
            context.isthumbrect = 0;
            context.refresh();
        }, 40);
    },
},
];

var rowobj = new circular_array("ROW", window.innerHeight);
rowobj.set(Math.floor((url.row/100)*window.innerHeight));

var pretchobj = new circular_array("PORTSTRETCH", 100);
var letchobj = new circular_array("LANDSTRETCH", 100);
var stretchobj = new circular_array("Stretch", [pretchobj,letchobj]);

var poomobj = new circular_array("PORTZOOM", 100);
var loomobj = new circular_array("LANDZOOM", 100);
var zoomobj = new circular_array("Zoom", [poomobj,loomobj]);

var pinchobj = new circular_array("PINCH", [zoomobj,stretchobj]);

var traitobj = new circular_array("TRAIT", 100);
var scapeobj = new circular_array("SCAPE", 100);
var heightobj = new circular_array("HEIGHT", [traitobj,scapeobj]);

var factorobj = new circular_array("FACTOR", 100);
factorobj.set(12);

function promptFile()
{
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    return new Promise(function(resolve)
    {
        document.activeElement.onfocus = function()
        {
            document.activeElement.onfocus = null;
            setTimeout(resolve, 500);
        };

        input.onchange = function()
        {
            var files = Array.from(input.files);
            return resolve(files);
        };

        input.click();
    });
}

function dropfiles(files)
{
    menuhide();
    if (!files || !files.length)
        return;
    delete galleryobj.repos;
    galleryobj.data = [];
    for (var i = 0; i < files.length; i++)
    {
        var fileName = files[i].name;
        var fileExtension = fileName.replace(/^.*\./, '');
        if (fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' ||
            fileExtension == 'webp' || fileExtension == 'avif' || fileExtension == 'gif')
        {
            var k = {}
            k.pos = i;
            k.file = files[i];
            if (k.file.size > 6000*4000)
                continue;
            k.thumbimg = new Image();
            k.thumbimg.src = URL.createObjectURL(files[i]);
            k.func = function (index)
            {
                delete galleryobj.repos;
                delete photo.image;
                menuhide();
                galleryobj.set(this.pos);
                contextobj.reset()
            }

            galleryobj.data.push(k);
        }
    }

    _8cnvctx.sliceobj.data = galleryobj.data;
    var slices = _8cnvctx.sliceobj;
    _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
    _8cnvctx.buttonheight = 200;
    _8cnvctx.delayinterval = DELAYCENTER / slices.length();
    _8cnvctx.virtualheight = slices.length()*_8cnvctx.buttonheight;
    galleryobj.set(0);
    delete _4cnvctx.thumbcanvas;
    delete photo.image;
    _4cnvctx.tapping = 0;
    _4cnvctx.isthumbrect = 0;
    headobj.set(3);
    headham.panel = headobj.getcurrent();
    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    _4cnvctx.setcolumncomplete = 0;
    contextobj.reset();
}

var droplst =
[
{
    name: "DEFAULT",
    drop: function (context, evt) { },
},
{
    name: "BOSS",
    drop: function (context, evt) { dropfiles(evt.dataTransfer.files); },
},
];

var panlst =
[
{
    name: "DEFAULT",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type) { },
	panstart: function (context, rect, x, y) { },
    enabled : function() { return 1; },
	panend: function (context, rect, x, y) { }
},
{
    name: "MENU",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) {},

	pan: function (context, rect, x, y, type)
    {
        context.panning = 1;
        clearTimeout(context.panend);
        context.panend = setTimeout(function()
        {
            context.panning = 0;
            context.refresh();
        }, 1000);

        var obj = context.scrollobj;
        if (context.index == 7)
            obj = context.scrollobj.getcurrent();
        if (obj && context.leftside)
        {
            var k = panvert(obj, y);
            if (k == -1)
                return;
            if (k == obj.anchor())
                return;
            obj.set(k);
            context.refresh()
        }
        else if (context.rightside)
        {
            var obj = context.timeobj;
            var m = y/rect.height;
            m = Math.floor((1-m)*obj.length());
            obj.set(m);
            context.refresh()
        }
        else if (obj && (type == "panleft" || type == "panright"))
        {
            if (context.type == "panup" || context.type == "pandown")
                return;
            context.type = type;
            var k = panhorz(obj, rect.width-x);
            if (k == -1)
                return;
            if (k == obj.anchor())
                return;
            obj.set(k);
            context.refresh()
        }
        else if (type == "panup" || type == "pandown")
        {
            if (context.type == "panleft" || context.type == "panright")
                return;
            context.type = type;
            var jvalue = ((context.timeobj.length()/context.virtualheight)*(context.starty-y));
            var j = context.startt - jvalue;
            var len = context.timeobj.length();
            if (j < 0)
                 j = len+j-1;
            else if (j >= len)
                 j = j-len-1;
            j = j % context.timeobj.length();
            context.timeobj.set(j);
            context.refresh()
        }
    },
	panstart: function (context, rect, x, y)
    {
        context.type = 0;
        context.leftside = x < MENUPANWIDTH;
        context.rightside = x > rect.width-MENUPANWIDTH;
        context.starty = y;
        context.startt = context.timeobj.current();
    },
	panend: function (context, rect, x, y)
    {
        delete context.starty;
        delete context.startt;
        delete context.timeobj.offset;

        var obj = context.scrollobj;
        if (context.index == 7)
            obj = context.scrollobj.getcurrent();
        if (obj)
            delete obj.offset;
        context.refresh();
    }
},
{
    name: "BOSS",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type)
	{
        if (context.pressedthumb)
        {
            var positx = positxobj.getcurrent();
            var posity = posityobj.getcurrent();
            positx.set((x/rect.width)*100);
            posity.set((y/rect.height)*100);
            context.refresh();
        }
        else if (context.isthumbrect)
        {
            var pt = context.getweightedpoint(x,y);
            x = pt?pt.x:x;
            y = pt?pt.y:y;
            context.hithumb(x,y);
            if (!zoomobj.getcurrent().getcurrent())
                context.refresh();
            else if (y != context.lasty)
                contextobj.reset()
            else
                context.refresh();
            context.lasty = y;
        }
        else if (context.pantype != 2 && (type == "panleft" || type == "panright"))
        {
            context.pantype = 1
            context.autodirect = (type == "panleft")?-1:1;
            var len = context.timeobj.length();
            var diff = context.startx-x;
            var jvalue = ((len/context.virtualwidth))*diff;
            var j = context.startt - jvalue;
            if (j < 0)
                j = len+j-1;
            else if (j >= len)
                j = j-len-1;
            if (Number.isNaN(j))
                return;
            context.timeobj.set(j);
            context.refresh()
        }
        else if (context.pantype != 1 && (type == "panup" || type == "pandown"))
        {
            context.autodirect = (x < rect.width/2) ? 1 : -1;
            context.pantype = 2
            var zoom = zoomobj.getcurrent()
            if (Number(zoom.getcurrent()))
            {
                var h = (rect.height*(1-zoom.getcurrent()/100))*2;
                y = ((y/rect.height)*speedyobj.getcurrent())*h;
                var k = panvert(rowobj, h-y);
                if (k == -1)
                    return;
                if (k == rowobj.anchor())
                    return;
                rowobj.set(k);
                contextobj.reset();
            }
        }
    },
	panstart: function (context, rect, x, y)
	{
        clearInterval(globalobj.slideshow);
        globalobj.slideshow = 0;
        clearInterval(context.timemain);
        context.panning = 1;
        context.timemain = 0;
        context.startx = x;
        context.starty = y;
        context.pantype = 0;
        context.startt = context.timeobj.current();
        context.isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        context.clearpoints();
    },
    panend: function (context, rect, x, y)
	{
        setTimeout(function()
        {
            context.panning = 0;
            context.pressedthumb = 0;
            context.isthumbrect = 0;
            delete context.isthumbrect;
            delete context.startx;
            delete context.starty;
            delete context.startt;
            delete rowobj.offset;
            context.refresh();
        }, 40);
    }
},
];

var panobj = new circular_array("PAN", panlst);

CanvasRenderingContext2D.prototype.clearpoints = function()
{
    this.x1 = this.x2 = this.x3 =
    this.x4 = this.x5 = this.x6 = this.x7 =
    this.x8 = this.x9 = this.x10 =
    this.x11 = this.x12 = this.x9 = this.x10 = this.x11 =
    this.x12 = this.x13 = this.x14 =
    this.x15 = this.x16 = this.x17 =
    this.x18 = this.x19 = this.x20 =
    this.x21 = this.x22 = this.x23 =
    this.x24 = this.x25 = this.x26 =
    this.x27 = this.x28 = this.x29 = this.x30 =
    this.y1 = this.y2 = this.y3 = this.y4 =
    this.y5 = this.y6 = this.y7 =
    this.y8 = this.y9 = this.y10 =
    this.y11 = this.y12 = this.y13 =
    this.y14 = this.y15 = this.y16 =
    this.y17 = this.y18 = this.y19 =
    this.y20 = this.y21 = this.y22 =
    this.y23 = this.y24 = this.y25 =
    this.y26 = this.y27 = this.y28 =
    this.y29 = this.y30 =
    0;
}

CanvasRenderingContext2D.prototype.getweightedpoint = function(x,y)
{
    this.x30 = this.x29;
    this.x29 = this.x28;
    this.x28 = this.x27;
    this.x27 = this.x26;
    this.x26 = this.x25;
    this.x25 = this.x24;
    this.x24 = this.x23;
    this.x23 = this.x22;
    this.x22 = this.x21;
    this.x21 = this.x20;
    this.x20 = this.x19;
    this.x19 = this.x18;
    this.x18 = this.x17;
    this.x17 = this.x16;
    this.x16 = this.x15;
    this.x15 = this.x14;
    this.x14 = this.x13;
    this.x13 = this.x12;
    this.x12 = this.x11;
    this.x11 = this.x10;
    this.x10 = this.x9;
    this.x9 = this.x8;
    this.x8 = this.x7;
    this.x7 = this.x6;
    this.x6 = this.x5;
    this.x5 = this.x4;
    this.x4 = this.x3;
    this.x3 = this.x2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y30 = this.y29;
    this.y29 = this.y28;
    this.y28 = this.y27;
    this.y27 = this.y26;
    this.y26 = this.y25;
    this.y25 = this.y24;
    this.y24 = this.y23;
    this.y23 = this.y22;
    this.y22 = this.y21;
    this.y21 = this.y20;
    this.y20 = this.y19;
    this.y19 = this.y18;
    this.y18 = this.y17;
    this.y17 = this.y16
    this.y16 = this.y15;
    this.y15 = this.y14;
    this.y14 = this.y14;
    this.y13 = this.y12;
    this.y12 = this.y11;
    this.y11 = this.y10;
    this.y10 = this.y9;
    this.y9 = this.y8;
    this.y8 = this.y7;
    this.y7 = this.y6;
    this.y6 = this.y5;
    this.y5 = this.y4;
    this.y4 = this.y3;
    this.y3 = this.y2;
    this.y2 = this.y1;
    this.y1 = y;

    var x,y;
    if (this.x25)
    {
        x = (this.x25+this.x24+this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/25;
        y = (this.y25+this.y24+this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/25;
    }
    else if (this.x24)
    {
        x = (this.x24+this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/24;
        y = (this.y24+this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/24;
    }
    else if (this.x23)
    {
        x = (this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/23;
        y = (this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/23;
    }
    else if (this.x22)
    {
        x = (this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/22;
        y = (this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/22;
    }
    else if (this.x21)
    {
        x = (this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/21;
        y = (this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/21;
    }
    else if (this.x20)
    {
        x = (this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/20;
        y = (this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/20;
    }
    else if (this.x19)
    {
        x = (this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/19;
        y = (this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/19;
    }
    else if (this.x18)
    {
        x = (this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/18;
        y = (this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/18;
    }
    else if (this.x17)
    {
        x = (this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/17;
        y = (this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/17;
    }
    else if (this.x16)
    {
        x = (this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/16;
        y = (this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/16;
    }
    else if (this.x15)
    {
        x = (this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/15;
        y = (this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/15;
    }
    else if (this.x14)
    {
        x = (this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/14;
        y = (this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/14;
    }
    else if (this.x13)
    {
        x = (this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/13;
        y = (this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/13;
    }
    else if (this.x12)
    {
        x = (this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/12;
        y = (this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/12;
     }
    else if (this.x11)
     {
        x = (this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/11;
        y = (this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/11;
     }
    else if (this.x10)
     {
        x = (this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/10;
        y = (this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/10;
     }
    else if (this.x9)
     {
        x = (this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/9;
        y = (this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/9;
     }
    else if (this.x8)
     {
        x = (this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/8;
        y = (this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/8;
     }
     if (this.x7)
     {
        x = (this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/7;
        y = (this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/7;
     }
    else if (this.x6)
     {
        x = (this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/6;
        y = (this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/6;
     }
    else if (this.x5)
    {
        x = (this.x5+this.x4+this.x3+this.x2+this.x1)/5;
        y = (this.y5+this.y4+this.y3+this.y2+this.y1)/5;
     }
    else if (this.x4)
    {
        x = (this.x4+this.x3+this.x2+this.x1)/4;
        y = (this.y4+this.y3+this.y2+this.y1)/4;
     }
    else if (this.x3)
     {
        x = (this.x3+this.x2+this.x1)/3;
        y = (this.y3+this.y2+this.y1)/3;
     }
    else if (this.x2)
     {
        x = (this.x2+this.x1)/2;
        y = (this.y2+this.y1)/2;
     }
    else if (this.x1)
     {
        x = (this.x1)/1;
        y = (this.y1)/1;
     }

    return {x,y}
}

var mouselst =
[
{
    name: "DEFAULT",
    down: function (evt) { },
 	out: function (evt) { },
    enter: function (evt) { },
    up: function (evt) { },
	move: function (context, rect, x, y) { },
},
];

var mouseobj = new circular_array("MOUSE", mouselst);

var presslst =
[
{
    name: "DEFAULT",
    pressup: function (context, rect, x, y) { },
    press: function (context, rect, x, y) { }
},
{
    name: "GPRESS",
    pressup: function (context, rect, x, y)
    {
    },
    press: function (context, rect, x, y)
    {
        context.scrollobj.rotate(1);
        context.refresh();
    }
},
{
    name: "BOSS",
    pressup: function (context, rect, x, y)
    {
        context.isthumbrect = 0;
        context.pressed = 0;
        context.pressedthumb = 0;
        context.refresh();
    },
    press: function (context, rect, x, y)
    {
        clearInterval(globalobj.slideshow);
        globalobj.slideshow = 0;

        context.pressed = 1;
        var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        if (isthumbrect)
        {
            context.pressedthumb = 1;
        }
        else
        {
            thumbobj.rotate(1);
            headobj.set(headobj.current() == 1 ? 3 : 1);
            headham.panel = headobj.getcurrent();
            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.refresh();
        }

        context.refresh();
    }
},
];

var swipelst =
[
{
    name: "DEFAULT",
    swipeleftright: function (context, rect, x, y, evt) {},
    swipeupdown: function (context, rect, x, y, evt) {},
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt)
    {
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        context.swipped = 1;
        context.slideshow = (context.timeobj.length()/context.virtualheight)*36;
        context.swipetype = evt.type;
        context.slidereduce = context.slideshow/12;
        clearInterval(context.timemain);
        context.timemain = setInterval(function () { context.refresh(); }, globalobj.timemain);
        context.refresh();
        clearTimeout(context.swipeupdown);
        context.swipeupdown = setTimeout(function()
        {
            context.swipped = 0;
            context.refresh();
        }, 1000);
    },
},
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        setTimeout(function()
        {
            if (headobj.current() == 5)
                headobj.set(3);
            else
                headobj.set(headobj.current()?0:3);
            headham.panel = headobj.getcurrent();
            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            context.autodirect = evt.type == "swipeleft"?-1:1;
            context.tab();
        }, SWIPETIME);
    },

    swipeupdown: function (context, rect, x, y, evt)
    {
        headobj.set(evt.type == "swipeup" ? 5 : 1);
        headham.panel = headobj.getcurrent();
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        context.refresh();
        var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        if (isthumbrect)
            return;
        clearTimeout(context.swipeupdowntime)
        context.swipeupdowntime = setTimeout(function()
        {
            if (evt.type == "swipedown")
                context.moveup();
            else
                context.movedown();
            contextobj.reset();
        }, SWIPETIME);
    },
},
];

var keylst =
[
{
	name: "DEFAULT",
	keyup: function (evt) { },
	keydown: function (evt) { }
},
{
	name: "GMENU",
	keyup: function (evt) { },
	keydown: function (evt)
	{
        if (ismodal())
            return;
		var context =
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
		    _4cnv.height ? _4cnvctx : _1cnvctx;
        var obj = context.scrollobj;
        if (context.index == 7)
            obj = context.scrollobj.getcurrent();
        var key = evt.key.toLowerCase();
		if (key == "pageup" || key == "arrowup" || key == "j")
		{
            context.timeobj.rotate(-TIMEOBJ/context.sliceobj.length());
            context.refresh()
        }
        else if (key == "pagedown" || key == "arrowdown" || key == "k")
		{
            context.timeobj.rotate(TIMEOBJ/context.sliceobj.length());
            context.refresh()
        }
        else if (obj && (key == "arrowright" || key == "l"))
		{
            obj.addperc(2.5);
            context.refresh()
        }
        else if (key == " ")
        {
            menuhide();
            startslideshow();
        }
        else if (key == "enter")
        {
            menuhide();
        }
 	}
},
{
	name: "MENU",
	keyup: function (evt) { },
	keydown: function (evt)
	{
        if (ismodal())
            return;
		var context =
            _3cnvctx.enabled ? _3cnvctx :
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
            _4cnvctx;

        var key = evt.key.toLowerCase();
		if (key == "pageup" || key == "arrowup" || evt.key == "j")
		{
            var k = (20/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(k);
            context.refresh()
        }
        else if (key == "pagedown" || kkey == "arrowdown" || evt.key == "k")
		{
            var k = (20/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(-k);
            context.refresh()
        }
        else if (key == " ")
        {
            menuhide();
            startslideshow();
        }
        else if (key == "enter")
        {
            menuhide();
        }
  	}
},
{
	name: "BOSS",
	keyup: function (evt)
	{
		var context = _4cnvctx;
        globalobj.ctrlhit = 0;
        globalobj.shifthit = 0;
        context.refresh();
	},
	keydown: function (evt)
	{
        if (ismodal())
            return;
		var context = _4cnvctx;
		var rect = context.rect();
        if (evt.ctrlKey)
            globalobj.ctrlhit = 1;
        if (evt.shiftKey)
            globalobj.shifthit = 1;

        context.refresh();
        var key = evt.key.toLowerCase();

        if (key == "f")
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
            evt.preventDefault();
        }
        else if (key == " ")
        {
            var j = globalobj.slideshow;
            menuhide();
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            if (!j)
                startslideshow();
        }
        else if (key == "\\")
        {
            evt.preventDefault();
            factorobj.enabled = factorobj.enabled ? 0 : 1;
            context.refresh();
        }
        else if (key == "arrowleft" || key == "h")
        {
            evt.preventDefault();
            context.autodirect = 1;
            context.tab();
        }
        else if (key == "arrowright" || key == "l")
        {
            context.autodirect = -1;
            evt.preventDefault();
            context.tab();
        }
        else if (key == "arrowup" || key == "k")
        {
            if (!rowobj.current())
                return;
            context.moveup();
            contextobj.reset();
            evt.preventDefault();
        }
        else if (key == "arrowDown" || key == "j" )
        {
            if (rowobj.current() >= rowobj.length()-1)
                return;
            context.movedown();
            contextobj.reset();
            evt.preventDefault();
        }
        else if (key == "-")
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(-1);
            contextobj.reset()
        }
        else if (key == "+")
        {
            context.pinched = 1;
            zoomobj.getcurrent().add(1);
            contextobj.reset()
        }
        else if (key == "9")
        {
            factorobj.add(-1);
            contextobj.reset()
        }
        else if (key == "0")
        {
            factorobj.add(1);
            contextobj.reset()
        }
        else if (key == "[")
        {
            stretchobj.getcurrent().add(-1);
            context.refresh();
        }
        else if (key == "]")
        {
            stretchobj.getcurrent().add(1);
            context.refresh();
        }
        else if (key == "tab")
        {
            evt.preventDefault();
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            context.autodirect = (evt.shiftKey)?1:-1;
            headobj.set(headobj.current() == 0 ? 3 : 0);
            headham.panel = headobj.getcurrent();
            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.tab();
        }
        else if (key == "enter")
        {
            evt.preventDefault();
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            context.movepage(evt.shiftKey?-1:1);
            evt.preventDefault();
        }
        else if (key == "pageup")
        {
            evt.preventDefault();
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            context.movepage(-1);
            evt.preventDefault();
        }
        else if (key == "pagedown")
        {
            evt.preventDefault();
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            context.movepage(1);
            evt.preventDefault();
        }
	}
},

];

CanvasRenderingContext2D.prototype.hithumb = function(x,y)
{
    if (typeof x !== "undefined")
    {
        var rect = this.thumbrect;
        var c = (x-rect.x) % rect.width;
        var b = c/rect.width;
        var e = this.sliceobj.length();
        var m = (1-b)*e;
        var j = DELAYCENTER/e;
        var time = j*m;
        var k = time % DELAYCENTER;
        var e = this.timeobj.length()*(k/DELAYCENTER);
        this.timeobj.set(e);
    }

    if (typeof y !== "undefined")
    {
        var b = (y-rect.y)/rect.height;
        var e = b*rowobj.length();
        rowobj.set(e);
    }
}

var taplst =
[
{
	name: "DEFAULT",
	tap: function (context, rect, x, y, shift, ctrl) { }
},
{
	name: "BOSS",
	tap: function (context, rect, x, y, shift, ctrl)
	{
        clearInterval(context.timemain);
        context.timemain = 0;
        clearInterval(globalobj.slideshow);
        globalobj.slideshow = 0;
        context.pressed = 0;
        context.pressedthumb = 0;

        if (ismenu())
        {
            menuhide();
            return;
        }

        if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            if (context.selectrect && context.selectrect.hitest(x,y)>=0)
            {
                context.tapping = context.tapping?0:1;
                context.refresh();
            }
            else
            {
                menuhide();
                context.hithumb(x,y);
                contextobj.reset()
                context.tapping = 1;
                context.refresh();
            }
        }
        else
        {
            if (headobj.current() == 5)
                headobj.set(3);
            else
                headobj.set(headobj.current()?0:3);
            headham.panel = headobj.getcurrent();
            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh();
        }
    }
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
        var obj = context.scrollobj;
        if (obj && x < MENUBARWIDTH*2)
        {
            var j = y/rect.height;
            var k = obj.length()*j;
            obj.set(k);
            context.refresh();
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.timeobj.set(k);
            context.refresh();
        }
        else
        {
            var k = getbuttonfrompoint(context, x, y);
            if (k == -1)
            {
                menuhide();
                return;
            }

            var slice = context.sliceobj.data[k];
            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func(k)
                context.refresh();
            }, JULIETIME*3);
        }
    },
},
{
    name: "SMENU",
    tap: function (context, rect, x, y)
    {
        var obj = context.scrollobj;
        if (context.cancel && context.cancel.hitest(x,y))
        {
            context.tapped = 1;
            context.refresh()
            clearTimeout(context.tappedhit)
            context.tappedhit = setTimeout(function()
                {
                    menuhide();
                    context.tapped = 0;
                    context.refresh()
                }, 400);
        }
        else if (context.header && context.header.hitest(x,y))
        {
        }
        else
        {
            var k = getbuttonfrompoint(context, x, y);
            if (k == -1)
            {
                menuhide();
                return;
            }

            var slice = context.sliceobj.data[k];
            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func(k)
                context.refresh();
            }, JULIETIME*3);
        }
    },
},
{
    name: "OPTIONTAP",
    tap: function (context, rect, x, y)
    {
        var obj = context.scrollobj;
        if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.timeobj.set(k);
            context.refresh();
        }
        else if (context.cancel && context.cancel.hitest(x,y))
        {
            context.tapped = 1;
            context.refresh()
            clearTimeout(context.tappedhit)
            context.tappedhit = setTimeout(function()
                {
                    menuhide();
                    context.tapped = 0;
                    context.refresh()
                }, 400);
        }
        else if (context.header && context.header.hitest(x,y))
        {
        }
        else if (context.email && context.email.hitest(x,y))
        {
            window.location.href = "mailto:images@reportbase.com";
        }
        else
        {
            var k = getbuttonfrompoint(context, x, y);
            if (k == -1)
            {
                menuhide();
                return;
            }

            var slice = context.sliceobj.data[k];
            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func(k)
                context.refresh();
            }, JULIETIME*3);
        }
    },
},
{
    name: "SEARCHTAP",
    tap: function (context, rect, x, y)
    {
        var obj = context.scrollobj.getcurrent();
        if (x < MENUBARWIDTH*2)
        {
            var j = y/rect.height;
            var k = obj.length()*j;
            obj.set(k);
            context.refresh();
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.timeobj.set(k);
            context.refresh();
        }
        else if (context.cancel && context.cancel.hitest(x,y))
        {
            context.tapped = 3;
            context.refresh()
            clearTimeout(context.tappedhit)
            context.tappedhit = setTimeout(function()
                {
                    menuhide();
                    context.tapped = 0;
                    context.refresh()
                }, 400);
        }
        else if (context.header && context.header.hitest(x,y))
        {
        }
        else if (context.search && context.search.hitest(x,y))
        {
            showsearch();
        }
        else if (context.moveup && context.moveup.hitest(x,y))
        {
            context.timeobj.rotate(TIMEOBJ/context.sliceobj.length());
            context.tapped = 1;
            context.refresh()
            clearTimeout(context.tappedhit)
            context.tappedhit = setTimeout(function()
                {
                    context.tapped = 0;
                    context.refresh()
                }, 400);
        }
        else if (context.movedown && context.movedown.hitest(x,y))
        {
            context.timeobj.rotate(-TIMEOBJ/context.sliceobj.length());
            context.tapped = 2;
            context.refresh()
            clearTimeout(context.tappedhit)
            context.tappedhit = setTimeout(function()
                {
                    context.tapped = 0;
                    context.refresh()
                }, 400);
        }
        else if (context.footer && context.footer.hitest(x,y))
        {
        }
        else
        {
            var k = getbuttonfrompoint(context, x, y);
            if (k == -1)
            {
                menuhide();
                return;
            }

            var slice = context.sliceobj.data[k];
            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func.exec(k)
                context.refresh();
            }, JULIETIME*3);
        }
    },
},
];

Number.prototype.inrange = function(a, b)
{
    var min = Math.min(a, b),
        max = Math.max(a, b);
    return this >= min && this < max;
}

Number.prototype.pad = function(size)
{
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
	    return s;
}

var thumblst =
[
    new function ()
	{
    	this.draw = function (context, r, user, time)
        {
        }
    },
    new function ()
	{
    	this.draw = function (context, r, user, time)
        {
            if (!photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var rect = new rectangle(r.x, r.y, r.width, r.height);
            rect.shrink(THUMBORDER*2, THUMBORDER*2);

            var he = heightobj.getcurrent();
            var b = Math.berp(0,he.length()-1,he.current());
            var height = Math.max(60,Math.lerp(0, rect.height, b));
            var width = Math.max(60,Math.lerp(0, rect.width, b));
            var r = calculateAspectRatioFit(photo.image.width, photo.image.height, width, height);
            var h = Math.floor(r.height);
            var w = Math.floor(r.width);

            var jp = 0;
            if (h < 20)
            {
                h = 20;
                jp
            }

            var positx = positxobj.getcurrent();
            var posity = posityobj.getcurrent();
            var x = Math.floor(Math.nub(positx.getcurrent(), positx.length(), w, rect.width))+THUMBORDER*2;
            var y = Math.floor(Math.nub(posity.getcurrent(), posity.length(), h, rect.height))+THUMBORDER*2;

            context.thumbrect = new rectangle(x,y,w,h);
            context.save();
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            if ((context.isthumbrect && jp) || context.tapping || context.pressedthumb)
            {
                var blackfill = new Fill(THUMBFILP);
                blackfill.draw(context, context.thumbrect, 0, 0);
            }
            else
            {
                if (!context.thumbcanvas)
                {
                    context.thumbcanvas = document.createElement('canvas');
                    context.thumbcanvas.width = w;
                    context.thumbcanvas.height = h;
                    var thumbcontext = context.thumbcanvas.getContext('2d');
                    thumbcontext.drawImage(photo.image,0,0,w,h);
                }

                context.globalAlpha = alphaobj.berp();
                context.drawImage(context.thumbcanvas, x, y, w, h);
                context.globalAlpha = 1.0;
            }

            var r = new rectangle(x,y,w,h);
            var whitestroke = new Stroke(THUMBSTROKE,THUMBORDER);
            if (!galleryobj.pose)
                whitestroke.draw(context, r, 0, 0);
            var region = new Path2D();
            region.rect(x,y,w,h);
            context.clip(region);

            var ww = Math.max(30,(rect.width/context.virtualwidth)*w);
            var stretch = stretchobj.getcurrent();
            if (stretch < 50)
                stretch = (50-stretch.getcurrent())/100;
            else
                stretch = (stretch.getcurrent()-50)/100;
            stretch = 1-stretch;
            ww *= stretch;

            var b = Math.berp(0,photo.image.height,context.imageheight);
            var hh = Math.lerp(0,h,b);
            var b = Math.berp(0,photo.image.height,context.nuby);
            var yy = y+Math.lerp(0,h,b);
            var jj = context.timeobj.berp();
            var bb = w*(1-jj);
            var xx = x+bb-ww/2;
            context.lineWidth = THUMBORDER;
            var r = new rectangle(xx,yy,ww,hh);
            context.selectrect = []
            context.selectrect.push(r);
            var blackfill = new Fill(THUMBFILL);
            blackfill.draw(context, r, 0, 0);
            var whitestroke = new Stroke(THUMBSTROKE,THUMBORDER*2);
            whitestroke.draw(context, r, 0, 0);

            if (xx > x)//leftside
            {
                var r = new rectangle(xx-w,yy,ww,hh);
                context.selectrect.push(r);
                blackfill.draw(context, r, 0, 0);
                whitestroke.draw(context, r, 0, 0);
            }
            else if (xx < x)//right side
            {
                var r = new rectangle(w+xx,yy,ww,hh);
                context.selectrect.push(r);
                blackfill.draw(context, r, 0, 0);
                whitestroke.draw(context, r, 0, 0);
            }

            context.restore();
        }
    }
];

var thumbobj = new circular_array("THUMB", thumblst);
thumbobj.set(url.thumb);

var alphaobj = new circular_array("ALPHA", 100);
alphaobj.set(100)

var getbuttonfrompoint = function (context, x, y)
{
	var lst = context.sliceobj.data;

	var k;
    for (k = 0; k < lst.length; k++)
    {
		var hit = lst[k];
		if (!hit.fitwidth || !hit.fitheight)
			continue;
		var w = hit.fitwidth;
		var h = hit.fitheight;
		var x1 = hit.center.x - w / 2;
		var y1 = hit.center.y - h / 2;
		var x2 = x1 + w;
		var y2 = y1 + h;
		if (x >= x1 && x < x2 &&
			y >= y1 && y < y2)
			break;
    }

	return k<lst.length?k:-1;
}

var menulst =
[
{
    name: "DEFAULT",
    draw: function (context, rect, user, time){}
},
{
    name: "EMENU",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight ;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height+40;
        context.font = "0.9rem Archivo Black";
        var clr = SCROLLNAB;
        var str = user.title;
        if (user.tap)
            clr = MENUTAP;
        var e = context.scrollobj.berp();

        var a = new Layer(
        [
            new Expand(new Rounded(clr, 2, SEARCHFRAME, 8, 8), 0, 20),
            new Col([10,0,10], [0,new MultiText(e),0])
        ]);

        a.draw(context, rect, user.line.split("\n"), time);
        context.restore();
    }
},
{
    name: "SEARCH",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height+100;
        context.font = "0.92rem Archivo Black";
        var clr = SCROLLNAB;
        if (time == galleryobj.current())
            clr = MENUSELECT;
        else if (user.tap)
            clr = MENUTAP;

        var a = new Expand(new Rounded(clr, 3, SEARCHFRAME, 8, 8), 0, 50);
        a.draw(context, rect, 0, 0);

        if (!user.lst)
        {
            var lst = [];
            var index = `${time+1} of ${galleryobj.length()}`
            lst.push(index);
            let keys = Object.keys(user);
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = user[key]
                if (value && value.length && typeof value === 'string')
                {
                    if (value.substr(0,4).toLowerCase() != "http")
                        lst.push(value);
                }
            }

            user.lst = lst;
        }

        if (!user.thumbimg)
        {
            user.thumbimg = new Image();
            if (user.thumb)
                user.thumbimg.src = user.thumb;
            else if (user.full)
                user.thumbimg.src = user.full;
            else if (user.url)
                user.thumbimg.src = user.url;
            else
            {
                var template = galleryobj.thumb ? galleryobj.thumb : "thumb";
                user.thumbimg.src = `https://reportbase.com/image/${user.id}/${template}`;
            }

            user.thumbimg.onload = function() { context.refresh(); }
        }

        var obj = context.scrollobj;
        if (obj.current() == 0 &&
            user.thumbimg && user.thumbimg.complete && user.thumbimg.naturalHeight)
        {
            obj = obj.getcurrent();
            var h2 = rect.height+BEXTENT;
            var w2 = rect.width-20;
            var a2 = w2/h2;
            if (user.thumbimg.width/user.thumbimg.height > a2)
            {
                var h1 = user.thumbimg.height;
                var w1 = h1*a2;
                var y1 = 0;
                var x1 = Math.nub(obj.getcurrent(), obj.length(), w1, user.thumbimg.width);
                context.drawImage(user.thumbimg, x1, y1, w1, h1, 10, -40, w2, h2);
                var a = new Layer(
                    [
                        new Fill("rgba(0,0,0,0.4)"),
                        new CurrentHPanel(new Fill("rgb(255,255,255,0.75)"), 90, 0),
                    ]);
                a.draw(context, new rectangle(10,-40,w2,6), obj, 0);
            }
            else
            {
                var w1 = user.thumbimg.width;
                var h1 = w1/a2;
                var x1 = 0;
                var y1 = Math.nub(obj.getcurrent(), obj.length(), h1, user.thumbimg.height);
                context.drawImage(user.thumbimg, x1, y1, w1, h1, 10, -40, w2, h2);
                var a = new Layer(
                    [
                        new Fill("rgba(0,0,0,0.4)"),
                        new CurrentVPanel(new Fill("rgba(255,255,255,0.75)"), 90, 0),
                    ]);
                a.draw(context, new rectangle(10,-40,6,h2), obj, 0);
            }

            if (!context.panning)
            {
                var a = new Expand(new RowA([20,24,24,0,60,0,24,24,20],
                    [
                        0,
                        galleryobj.repos?new Text("white", "center", "middle",0, 0, 1):0,
                        galleryobj.repos?new Text("white", "center", "middle",0, 0, 1):0,
                        0,
                        new Layer(
                        [
                            new CirclePanel(user.tap?MENUTAP:SCROLLNAB,SEARCHFRAME,4),
                            new Text("white", "center", "middle",0, 0, 1)
                        ]),
                        0,
                        galleryobj.repos?new Text("white", "center", "middle",0, 0, 1):0,
                        galleryobj.repos?new Text("white", "center", "middle",0, 0, 1):0,
                        0,
                    ]),-60,50);

                var j = time + 1;
                var repos = galleryobj.repos;
                if (repos)
                {
                    var k = repos.indexOf("_");
                    if (k >= 1)
                        repos = repos.substr(0,k);
                }

                a.draw(context, rect,
                [
                    0,
                    "",
                    "",
                    0,
                    j.toFixed(0),
                    0,
                    `Photo by ${user.photographer}`,
                    `from ${user.datasource}`,
                    0,
                ], 0);
            }
        }
        else
        {
            var e = _8cnvctx.textscrollobj.berp();
            var a = new Col([20,0,20],
            [
                0,
                new MultiText(e),
                0,
            ]);

            a.draw(context, rect, user.lst, 0);
        }

        context.restore();
    }
},
{
    name: "MENU",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height+20;
        context.font = "0.9rem Archivo Black";
        var clr = SCROLLNAB;
        var fontclr = "white";
        var str = user.title;

        if (user.tap)
        {
            clr = MENUTAP;
        }
        else if (user.path == "PROJECT")
        {
            if (time == galleryobj.current())
                clr = MENUSELECT;
        }
        else if (user.path == "CLOSE")
        {
            clr = "black";
        }
        else if (user.path == "FULLPANEL")
        {
            if (screenfull.isFullscreen)
                clr = MENUSELECT;
        }
         else if (user.path == "THUMBNAIL")
        {
            if (thumbobj.current() == 1)
                clr = MENUSELECT;
        }
        else if (user.path == "DETACH")
        {
            if (factorobj.enabled)
                clr = MENUSELECT;
        }

        var a = new Layer(
        [
            new Expand(new Rounded(clr, 2, SEARCHFRAME, 8, 8), 0, 10),
            new Shrink(new Text(fontclr, "center", "middle",0, 0, 1), 20, 0),
        ]);

        a.draw(context, rect, user.title, time);
        context.restore();
    }
},
{
    name: "BOSS",
    draw: function (unused, rect, user, time)
    {
	}
},
];

let slicelst = [];
const SLICERADIUS = 135000;
for (let n = 499; n >= 1; n=n-1)
    slicelst.push({slices: n*3, delay: SLICERADIUS/n});

function resetcanvas()
{
    if (!photo.image ||
        !photo.image.complete ||
        !photo.image.naturalHeight)
        return;

    var canvas = _4cnv;
    var context = _4cnvctx;
    if (canvas.width != window.innerWidth ||
        canvas.height != window.innerheight)
    {
        window.footrect = new rectangle(0,window.innerHeight-ALIEXTENT,window.innerWidth,ALIEXTENT);
        window.headrect = new rectangle(0,0,window.innerWidth,ALIEXTENT);
        window.leftrect = new rectangle(0,0,window.innerWidth/2,window.innerHeight);
        window.rightrect = new rectangle(window.innerWidth/2,0,window.innerWidth/2,window.innerHeight);
        window.rect = new rectangle(0,0,window.innerWidth,window.innerHeight);
        window.landscape = function(){return window.rect.width > window.rect.height?1:0;}
        window.portrait = function(){return window.rect.width < window.rect.height?1:0;}
        heightobj.set(window.landscape());
        stretchobj.set(window.landscape());
        zoomobj.set(window.landscape());
        positxobj.set(window.landscape());
        posityobj.set(window.landscape());
        context.show(0,0,window.innerWidth,window.innerHeight);
    }

    var zoomax = 92.50;
    var n = 0;
    for (; n < zoomax; ++n)
    {
        var zoom = (100-n)/100;
        var height = photo.image.height*zoom;
        var aspect = photo.image.width/height;
        var width = context.canvas.height * aspect;
        if (width/window.innerWidth > 1.5)
            break;
    }

    var zoom = zoomobj.getcurrent()
    zoom.split(zoom.current(), `${n}-${zoomax}`, 100);
    var z = zoom.getcurrent();
    var zoom = (100-z)/100;
    context.imageheight = photo.image.height*zoom;
    context.virtualheight = context.canvas.height;
    var imageaspect = photo.image.width/context.imageheight;
    context.virtualwidth = context.canvas.height * imageaspect;
    context.virtualfactor = context.virtualwidth/window.innerWidth;
    context.virtualwindow = window.innerWidth/context.virtualwidth;
    context.virtualaspect = context.virtualwidth / context.canvas.height;
    context.virtualextent = context.virtualwidth.toFixed(0) + "x" + context.canvas.height;
    context.virtualsize = ((context.virtualwidth * context.canvas.height)/1000000).toFixed(1) + "MP";
    var y = Math.clamp(0,context.canvas.height-1,context.canvas.height*rowobj.berp());
    context.nuby = Math.nub(y, context.canvas.height, context.imageheight, photo.image.height);

    if (!context.isthumbrect &&
        !context.pinching &&
        !galleryobj.pose)
    {
        _4cnvctx.tab();
    }

    var f = 3;
    if (factorobj.enabled)
        f = factorobj.current();
    else if (context.pinched)
        f = 12;
    else if(context.virtualfactor < 1.25)
        f = 12;
    else if (context.virtualfactor < 1.75)
        f = 9;
    else if (context.virtualfactor < 2.25)
        f = 6;

    var slicewidth = context.virtualwidth/f;

    var j = 0;
    for (; j < slicelst.length; ++j)
    {
        var k = slicelst[j];
        var fw = context.virtualwidth / k.slices;
        if (fw >= slicewidth)
            break;
    }

    var canvaslen = SAFIROX?Math.ceil(context.virtualwidth/MAXVIRTUAL):1;
    var e = slicelst[j-1];
    var delay = e.delay;
    var slices = Math.ceil(e.slices/canvaslen);
    context.delayinterval = delay/100000;
    context.delay = e;
    var gwidth = photo.image.width/canvaslen;
    var bwidth = context.virtualwidth/canvaslen;
    context.colwidth = bwidth/slices;

    var slice = 0;
    context.sliceobj.data = []

    var j = 0;
    for (var n = 0; n < canvaslen; ++n)
    {
        var cnv = canvaslst[n];
        if (cnv.height != context.canvas.height)
            cnv.height = context.canvas.height;
        if (cnv.width != bwidth)
            cnv.width = bwidth;

        var ctx = cnv.getContext('2d');
        ctx.drawImage(photo.image,
            n*gwidth, context.nuby, gwidth, context.imageheight,
            0, 0, bwidth, cnv.height);

        for (var e = 0; e < slices; ++e)
        {
            var k = {};
            k.x = e*context.colwidth;
            k.p = k.x/context.virtualwidth;
            k.slice = slice;
            k.time = j;
            k.canvas = cnv;
            slice++;
            context.sliceobj.data.push(k);
            j += context.delayinterval;
        }
    }

    context.refresh();
}

var extentlst =
[
{
    name: "DEFAULT",
    init: function ()
    {
    },
},
{
    name: "TALL",
    init: function ()
    {
        galleryobj.template = "portrait";
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(90);
        traitobj.split(75, "0.1-1.0", traitobj.length());
        scapeobj.split(75, "0.1-1.0", scapeobj.length());
        poomobj.set(60);
        loomobj.set(60);
    },
},
{
    name: "PORTRAIT",
    init: function ()
    {
        galleryobj.template = "portrait";
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(90);
        traitobj.split(75, "0.1-1.0", traitobj.length());
        scapeobj.split(75, "0.1-1.0", scapeobj.length());
        poomobj.set(60);
        loomobj.set(60);
    },
},
{
    name: "ULTRAWIDE",
    init: function ()
    {
        galleryobj.template = "wide";
        galleryobj.thumb = "widethumbnail";
        positxpobj.set(50);
        positypobj.set(100);
        positxlobj.set(50);
        positylobj.set(100);
        traitobj.split(95, "0.1-1.0", traitobj.length());
        scapeobj.split(95, "0.1-1.0", scapeobj.length());
        poomobj.set(0);
        loomobj.set(0);
    },
},
{
    name: "WIDE",
    init: function ()
    {
        galleryobj.template = "landscape";
        galleryobj.thumb = "landthumb";
        positxpobj.set(50);
        positypobj.set(95);
        positxlobj.set(50);
        positylobj.set(95);
        traitobj.split(90, "0.1-1.0", traitobj.length());
        scapeobj.split(50, "0.1-1.0", scapeobj.length());
        poomobj.set(30);
        loomobj.set(30);
    },
},
{
    name: "LANDSCAPE",
    init: function ()
    {
        galleryobj.template = "landscape";
        galleryobj.thumb = "landthumb";
        positxpobj.set(50);
        positypobj.set(95);
        positxlobj.set(50);
        positylobj.set(95);
        traitobj.split(95, "0.1-1.0", traitobj.length());
        scapeobj.split(50, "0.1-1.0", scapeobj.length());
        poomobj.set(30);
        loomobj.set(30);
    },
},
];

var extentobj = new circular_array("EXTENT", extentlst);

url.path = "BOAT";
url.project = 0;
var leftmenu = 1;
var path = `res/boat.json`;

function setpathparoject(str)
{
    var e = url.searchParams.get(str);
    let k = e ? e.split(".") : [0000];
    leftmenu = k.length == 1;
    url.path = k[0];
    if (k.length == 2)
        url.project = Number(k[1]);
}

if (url.searchParams.has("p"))
{
    var e = url.searchParams.get("p");
    let k = e.split(".");
    url.path = k[0];
    leftmenu = k.length == 1;
    if (k.length == 2)
        url.project = Number(k[1]);
    path = url.path.toLowerCase();
    path = `res/${path}.json`;
}
else if (url.searchParams.has("sidney"))
{
    setpathparoject("sidney");
    path = `https://sidney.reportbase5836.workers.dev`;
}
else
{
    var lst =
    [
        "unsplash",
        "unsplash_user",
        "unsplash_collection",
        "pexels",
        "pexels_collection",
        "pixabay",
    ];

    for (var n = 0; n < lst.length; ++n)
    {
        var j = lst[n];
        var e = url.searchParams.get(j)
        if (!e)
            continue;
        var k = e.split(".");
        if (k.length > 1)
            k = k[0];
        setpathparoject(j);
        path = `https://${j}.reportbase5836.workers.dev/?search=${k}&page=${url.page}`;
        break;
    }
}

var ContextObj = (function ()
{
    function init()
    {
        this.ANCHOR = 0;
        this.CURRENT = 0;

        for (var n = 0; n < contextlst.length; ++n)
        {
            var context = contextlst[n];
            context.index = n;
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.enabled = 0;
            context.canvas.width = 1;
            context.canvas.height = 1;
            context.autodirect = -1;
            context.font = "400 1rem Archivo Black";
            context.fillText("  ", 0, 0);
            context.slideshow = 0;
            context.lastime = 0;
            context.buttonheight = 30;
            context.slidereduce = 0;
            context.slidestop = 0;
            setevents(context, eventlst[n]);
            context.sliceobj = new circular_array("", []);
            context.timeobj = new circular_array("", TIMEOBJ);
            context.timeobj.set(TIMEOBJ/2);
        }

        _3cnvctx.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
        _3cnvctx.scrollobj.set(0);
        _5cnvctx.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
        _5cnvctx.scrollobj.set(0);
        _7cnvctx.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
        _7cnvctx.scrollobj.set(0);
        _8cnvctx.imagescrollobj = new circular_array("IMAGESCROLL", Math.floor(window.innerHeight/2));
        _8cnvctx.imagescrollobj.set(_8cnvctx.imagescrollobj.length()/2);
        _8cnvctx.textscrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
        _8cnvctx.textscrollobj.set(0);
        _8cnvctx.scrollobj = new circular_array("SCROLL", [_8cnvctx.imagescrollobj,_8cnvctx.textscrollobj]);
    }

    init.prototype =
	{
        anchor: function () { return this.ANCHOR; },
        current: function () { return this.CURRENT; },
        label: function () { return ""; },
        length: function () { return this.data.length; },
        enabled: function () { return 0; },
        setanchor: function (index) { this.ANCHOR = Math.clamp(0, this.length() - 1, index); },
        setcurrent: function (index) { this.CURRENT = Math.clamp(0, this.length() - 1, index); },
        getcurrent: function () { return this.data[this.current()]; },
        name: function () { return this.CURRENT.toString(); },
        title: function () { return this.CURRENT.toString(); },

		resize: function (context)
       	{
			var top = 0;
			var left = 0;
			if (!context.enabled)
			{
				context.enabled = 0
				context.canvas.height = 0;
				return;
			}

            var k = context.index == 7 ? 640 : 420;
            var w = Math.min(k, window.innerWidth);
            var l = Math.floor((window.innerWidth-w)/2);
            context.show(l, 0, w, window.innerHeight);
        },

		reset: function ()
       	{
            contextobj.resetcontext4(_4cnvctx);
            setTimeout(function()
            {
                var lst = [_1cnvctx, _2cnvctx, _3cnvctx,  _5cnvctx,
                    _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx];
                for (var n = 0; n < lst.length; n++)
                {
                    var context = lst[n];
                    contextobj.resetcontext(context);
                }
            }, JULIETIME);
		},

        resetcontext4: function (context)
       	{
            if (photo.image &&
                photo.image.complete &&
                photo.image.naturalHeight)
            {
                contextobj.resize(context);
                resetcanvas(context);
            }
            else
            {
                var id = galleryobj.getcurrent().id;
                var template = galleryobj.template ? galleryobj.template : "medium";
                if (galleryobj.getcurrent().file)
                {
                    var file = galleryobj.getcurrent().file;
                    var path = URL.createObjectURL(file)
                    photo.image = new Image();
                    photo.image.src = path;
                }
                else
                {
                    var path = `https://reportbase.com/image/${id}/${template}`;
                    if (galleryobj.getcurrent().full)
                        path = galleryobj.getcurrent().full;
                    photo.image = new Image();
                    photo.image.crossOrigin = 1;
                    photo.image.src = path;
                }

                headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);

                photo.image.onerror =
                    photo.image.onabort = function(e)
                {
                    console.log(e);
                }

                photo.image.onload = function()
                {
                    this.aspect = this.width/this.height;
                    this.size = ((this.width * this.height)/1000000).toFixed(1) + "MP";
                    this.extent = this.width + "x" + this.height;
                    var e = galleryobj.getcurrent();
                    document.title = `${url.path}.${galleryobj.current().pad(4)} (${photo.image.width}x${photo.image.height})`;

                    var k;
                    if (this.aspect < 0.5)
                        k = "TALL"
                    else if (this.aspect < 1.0)
                        k = "PORTRAIT"
                    else if (this.aspect < 2.0)
                        k = "LANDSCAPE"
                    else if (this.aspect < 5.0)
                        k = "WIDE"
                    else
                        k = "ULTRAWIDE"

                    var j = extentlst.findIndex(function(a){return a.name == k;})
                    if (j != extentobj.current())
                    {
                        extentobj.set(j);
                        if (!extentobj.done)
                           extentobj.getcurrent().init();
                        extentobj.done = 1;
                    }

                    if (_4cnvctx.movingpage || url.slideshow)
                        context.timeobj.set(TIMEOBJ/2);
                    if (!globalobj.slideshow && url.slideshow)
                    {
                        menuhide();
                        startslideshow();
                    }

                    _4cnvctx.pinched = 0;
                    contextobj.resize(context);
                    resetcanvas(context);
                    contextobj.reset()
                    _4cnvctx.movepagetime = setTimeout(function() { masterload(); }, 500);

                    if (!galleryobj.repos)
                    {
                        var id = galleryobj.getcurrent().id;
                        var u = `https://reportbase.com/image/${id}`;
                        fetch(u, {method: 'REPORT'})
                          .then(response => response.json())
                          .then(function(response)
                              {
                                  function getext(filename)
                                  {
                                    var ext = /^.+\.([^.]+)$/.exec(filename);
                                    return ext == null ? "" : ext[1];
                                  }

                                  var ext = getext(response.result.filename);
                                  galleryobj.getcurrent().ispng = ext.toLowerCase() == "png";
                                  galleryobj.getcurrent().prompt = response.result.meta.prompt;
                                  galleryobj.getcurrent().gallery = response.result.meta.gallery;
                                  galleryobj.getcurrent().model = response.result.meta.model;
                                    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
                              })
                        .catch((error) =>
                        {
                            console.log("Error:", error);
                        });
                    }
                }
			}

            seteventspanel(new YollPanel());
			return 1;
    	},
		resetcontext: function (context)
       	{
			contextobj.resize(context);
            return 1;
    	},
	};

	return init;
})();

var contextobj = new ContextObj();

function masterload()
{
    function func(direction, index)
    {
        galleryobj.rotate(direction);
        lst[n] = new Image();
        if (galleryobj.getcurrent().loaded)
           return;
        var id = galleryobj.getcurrent().id;
        var path = `https://reportbase.com/image/${id}/${galleryobj.template}`;
        if (!id || galleryobj.repos)
            path = galleryobj.getcurrent().full;
        lst[n].src = path;
        lst[n].index = galleryobj.current();
        lst[n].onload = function()
        {
            galleryobj.data[this.index].loaded = 1;
        }
    }

    var lst = [];
    var k = galleryobj.current();
    var size = Math.min(5,galleryobj.length());
    galleryobj.getcurrent().loaded = 1;
    for (var n = 0; n < size; ++n) { func(1,n); }
    galleryobj.set(k);
    for (var n = size; n < size+2; ++n) { func(-1,n); }
    galleryobj.set(k);
}

function gridToRect(cols, rows, margin, width, height)
{
    var rects = [];
    var iheight = height + margin;
    var rwidth = width + margin;
    var ww = parseInt(rwidth / cols);
    var hh = parseInt(iheight / rows);
    var xadj = rwidth - (cols * ww);
    var yadj = iheight - (rows * hh);
    var y = 0;

    var n = 0;
    for (var row = 0; row < rows; ++row)
    {
        var h = hh - margin;
        if (yadj-- >= 1)
            h++;
        var x = 0;
        for (var col = 0; col < cols; ++col, ++n)
        {
            var w = ww - margin;
            if (col >= (cols - xadj))
                w++;
            rects[n] = new rectangle(x, y, w, h);
            rects[n].row = row;
            rects[n].col = col;
            x += w + margin;
        }

        y += h + margin;
    }

    return rects;
}

function gridToGridB(k, extent)
{
    var e = k.slice(0);
    var empty_slots = 0;
    var aextent = 0;
    for (var n = 0; n < e.length; ++n)
    {
        if (e[n] == -1)
            continue;
        if (e[n] < 1)
            e[n] = extent * Math.abs(e[n]);
        aextent += e[n];
        empty_slots += e[n] == 0 ? 1 : 0;
    }

    if (empty_slots == 0)
        return e;

    var balance = extent - aextent;
    if (balance <= 0)
        return e;

    var slot_extent = Math.floor(balance / empty_slots);
    var remainder = balance - (empty_slots * slot_extent);

    for (n = e.length - 1; n >= 0; --n)
    {
        if (e[n])
            continue;

        var d = slot_extent;
        if (remainder-- >= 1)
            d++;
        e[n] = d;
    }

    return e;
}

Array.prototype.sum = function ()
{
    return this.reduce(function (a, b) { return a + b; });
};

Array.prototype.hitest = function (x, y)
{
    var n = 0;
    for (; n < this.length; ++n)
    {
        var rect = this[n];
        if (!rect || !rect.hitest || !rect.hitest(x, y))
            continue;
        break;
    }

    return n==this.length?-1:n;
};

Math.getPans = function (size, extent, factor)
{
    var j = size < extent ? 1 : Math.lerp(0.01, size / extent, factor);
    if (size > 200)
        size = size / 2;
    size = Math.clamp(0, Math.max(size, 10), extent);
    var lst = [];
    for (var n = 0; n < extent; ++n)
    {
        var k = Math.lerp(0, size * j, n / extent);
        lst.push(Math.floor(k));
    }

    return lst;
};

var panhorz = function (obj, x)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - x;
        return -1;
    }
    else
    {
        return x + obj.offset;
    }
};

var panvert = function (obj, y)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - y;
        return -1;
    }
    else
    {
        return y + obj.offset;
    }
};

var Rectangle = function (r)
{
    this.draw = function (context, rect, user, time)
    {
        if (!r)
            r = user;
        r.x  = rect.x;
        r.y  = rect.y;
        r.width  = rect.width;
        r.height  = rect.height;
    }
}

var CirclePanel = function (color, scolor, width)
{
    this.draw = function (context, rect, user, time)
    {
        var radius = rect.height / 2;
	    if (radius <= 0)
            return;
	    context.save();
    	context.beginPath();
        context.arc(rect.x + rect.width / 2, rect.y + rect.height / 2, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fill();
        if (width)
        {
		    context.strokeStyle = scolor;
            context.lineWidth = width;
			context.stroke();
        }

		context.restore();
    };
};

var RotatedText = function()
{
    this.draw = function (context, rect, user, time)
    {
        //https://erikonarheim.com/posts/canvas-text-metrics/
        const pos = [10, 100];
        const bounds =
        {
          top: pos[1] - metrics.actualBoundingBoxAscent,
          right: pos[0] + metrics.actualBoundingBoxRight,
          bottom: pos[1] + metrics.actualBoundingBoxDescent,
          left: pos[0] - metrics.actualBoundingBoxLeft
        };

        const center =
        [
          (bounds.left + bounds.right) / 2,
          (bounds.top + bounds.bottom) / 2
        ];

        context.save();
        context.translate(center[0], center[1]);
        context.scale(1, -1);
        context.rotate(Math.PI / 4);
        context.fillText(text, pos[0] - center[0], pos[1] - center[1]);
        context.restore();
    }
};

var Text = function (color,  align="center", baseline="middle", reverse=0, noclip=0, shadow=0)
{
    this.draw = function (context, rect, user, time)
    {
		if (typeof (user) !== "string")
            return;

        if (rect.width < 0)
            return;
        var n = user.length;
        if (n <= 0)
            return;

        if (reverse)
            user = user.split("").reverse().join("");

        context.save();
        context.textAlign = align;
        context.textBaseline = baseline;
        context.fillStyle = color;
        context.shadowOffsetX = shadow?shadow:0;
        context.shadowOffsetY = shadow?shadow:0;
        context.shadowColor = "black"

        var metrics;
        var str;

        if (!noclip)
        {
            do
            {
                str = user.substr(0, n);
                metrics = context.measureText(str);
                n--;
            }
            while (n >= 0 && metrics.width > rect.width);
        }
        else
        {
            str = user;
        }

        var x = rect.x;
        if (align == "center")
            x = rect.x + rect.width / 2;
        else if (align == "right")
            x = rect.x + rect.width - 1;
        var y = rect.y + Math.floor(rect.height/2) + 1;

        if (reverse)
            str = str.split("").reverse().join("");
        context.fillText(str, x, y);
        context.restore();
    };
};

var Row = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.height);

        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;

            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

var Col = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

var RowA = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var j = gridToGridB(e, rect.height);
        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

var ColA = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

var Grid = function (cols, rows, margin, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols*rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user, time);
        }
    };
};

var GridA = function (cols, rows, margin, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols*rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user[n], time);
        }
    };
};

var Expand = function (panel, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return panel.draw(context, new rectangle(
			rect.x-extentw,
			rect.y-extenth,
			rect.width+extentw*2,
			rect.height+extenth*2),
				user, time);
    };
};

var Shadow  = function (panel)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = "black"
        panel.draw(context, rect, user, time);
        context.restore();
    };
};

var Shrink = function (panel, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return panel.draw(context, new rectangle(
			rect.x+extentw,
			rect.y+extenth,
			rect.width-extentw*2,
			rect.height-extenth*2),
				user, time);
    };
};

var Rounded = function (color, linewidth, strokecolor, radiustop, radiusbot)
{
    this.draw = function (context, rect, user, time)
    {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x, y + radiustop);
        context.lineTo(x, y + height - radiusbot);
        context.arcTo(x, y + height, x + radiusbot, y + height, radiusbot);
        context.lineTo(x + width - radiusbot, y + height);
        context.arcTo(x + width, y + height, x + width, y + height - radiusbot, radiusbot);
        context.lineTo(x + width, y + radiustop);
        context.arcTo(x + width, y, x + width - radiustop, y, radiustop);
        context.lineTo(x + radiustop, y);
        context.arcTo(x, y, x, y + radiustop, radiustop);
        context.fill();
		if (linewidth)
		{
			context.lineWidth = linewidth;
			context.strokeStyle = strokecolor;
			context.stroke();
		}
    };
};

var Layer = function (panels)
{
    this.draw = function (context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof (panels[n]) == "object")
                panels[n].draw(context, rect, user, time);
        }
    };
};

var LayerA = function (panels)
{
    this.draw = function (context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof (panels[n]) == "object")
                panels[n].draw(context, rect, user[n], time);
        }
    };
};

var ImagePanel = function (shrink)
{
    this.draw = function (context, rect, user, time)
    {
        var w = user.width*(shrink?shrink:1)
        var h = user.height*(shrink?shrink:1);
        var x = Math.floor(rect.x + (rect.width - w) / 2);
        var y = Math.floor(rect.y + (rect.height - h) / 2);

        context.save();
        if (user.degrees)
        {
            context.translate(x+w/2, y+h/2);
            context.rotate(user.degrees*Math.PI/180.0);
            context.translate(-x-w/2, -y-h/2);
        }

        context.drawImage(user, x, y, w, h);
        context.restore();
	};
};

var AnchorHPanel = function (panel, extent)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var anchor = user.anchor();
        var length = user.length();
        var nub = Math.nub(anchor, length, extent, rect.width);
        var r = new rectangle(rect.x + nub, rect.y, extent, rect.height);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

var CurrentHPanel = function (panel, extent)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var current = user.current();
        var length = user.length();
        var nub = Math.nub(current, length, extent, rect.width);
        var r = new rectangle(rect.x + nub, rect.y, extent, rect.height);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

var CurrentVPanel = function (panel, extent, rev)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var k = rev ? user.length() - user.current() : user.current();
        var nub = Math.nub(k, user.length(), extent, rect.height);
        var r = new rectangle(rect.x, rect.y + nub, rect.width, extent);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

//Math.nub(99,100,100,1000) = 900
//Math.nub(0,100,100,1000) = 0
Math.nub = function (n, size, nubextent, extent)
{
    var b = Math.berp(0,size-1,n);
    var e = b*nubextent;
    var f = b*extent;
    return f - e;
};

function rotate(pointX, pointY, originX, originY, angle)
{
	angle = angle * Math.PI / 180.0;
	var k = {
		x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
		y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
	};

	return k;
}

function ismenu()
{
    var k = _2cnv.height || _3cnv.height || _5cnv.height || _6cnv.height || _7cnv.height ||
        _8cnv.height || _9cnv.height;
    return k;
}

function menuhide()
{
    var k = ismenu();
    _2cnvctx.enabled = 0;
    _3cnvctx.enabled = 0;
    _5cnvctx.enabled = 0;
    _6cnvctx.enabled = 0;
    _7cnvctx.enabled = 0;
    _8cnvctx.enabled = 0;
    _9cnvctx.enabled = 0;
    _2cnvctx.hide();
    _3cnvctx.hide();
    _5cnvctx.hide();
    _6cnvctx.hide();
    _7cnvctx.hide();
    _8cnvctx.hide();
    _9cnvctx.hide();
    _4cnvctx.refresh();
    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    return k;
}

function reset()
{
    contextobj.reset()
    setTimeout(function() { contextobj.reset(); }, 400);
    setTimeout(function() { contextobj.reset(); }, 1000);
}

function resize()
{
    delete _4cnvctx.thumbcanvas;
    reset();
    var n = eventlst.findIndex(function(a){return a.name == "_4cnvctx";})
    setevents(_4cnvctx, eventlst[n])
    menuhide();
    _4cnvctx.pinched = 0;
    _4cnvctx.tapping = 0;
    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    _4cnvctx.refresh();
}

function escape()
{
    clearInterval(globalobj.slideshow);
    globalobj.slideshow = 0;
    headobj.set(3);
    _4cnvctx.panhide  = 0
    _4cnvctx.pinched = 0;
    delete _4cnvctx.thumbcanvas;
    _4cnvctx.tapping = 0;
    menuhide();
    var n = eventlst.findIndex(function(a){return a.name == "_4cnvctx";})
    setevents(_4cnvctx, eventlst[n])
    hideprompt()
    contextobj.reset();
}

window.addEventListener("focus", (evt) => { });
window.addEventListener("blur", (evt) => { });
window.addEventListener("resize", (evt) => { resize(); });
window.addEventListener("screenorientation", (evt) => { resize(); });

var YollPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
    };

	this.tap = function (context, rect, x, y, shift, ctrl)
    {
        if (context.tap_)
    		context.tap_(context, rect, x, y, shift, ctrl);
	};

    this.wheeldown = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheeldown_)
      		context.wheeldown_(context, x, y, ctrl, shift, alt);
   	};

    this.wheelup = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheelup_)
      		context.wheelup_(context, x, y, ctrl, shift, alt);
   	};

    this.drop = function (context, evt)
    {
		if (context.drop)
      		context.drop(context, evt);
   	};

    this.mouseout = function (context, evt)
    {
		if (context.mouse && context.mouse.out)
      		context.mouse.out(context, evt);
   	};

    this.mouseenter = function (context, evt)
    {
		if (context.mouse && context.mouse.enter)
      		context.mouse.enter(evt);
   	};

    this.mousemove = function (context, rect, x, y)
    {
		if (context.mouse && context.mouse.move)
      		context.mouse.move(context, rect, x, y);
   	};

	this.pan = function (context, rect, x, y, type)
	{
		context.pan_(context, rect, x, y, type);
	};

	this.panend = function (context, rect, x, y)
    {
      	context.panend_(context, rect, x, y);
   	};

	this.panleftright = function (context, rect, x, y, type)
    {
       	context.panleftright_(context, rect, x, y, type);
    };

	this.panupdown = function (context, rect, x, y, type)
    {
   		context.panupdown_(context, rect, x, y, type);
    };

	this.panstart = function (context, rect, x, y, type)
    {
       	context.panstart_(context, rect, x, y);
	};

    this.swipeleftright = function (context, rect, x, y, type)
    {
   		if (context.swipeleftright_)
        	context.swipeleftright_(context, rect, x, y, type);
	};

    this.swipeupdown = function (context, rect, x, y, type)
    {
   		if (context.swipeupdown_)
        	context.swipeupdown_(context, rect, x, y, type);
	};

    this.pinch = function (context, scale)
    {
   		if (context.pinch_)
        	context.pinch_(context, scale);
	};

    this.pinchend = function(context)
	{
   		if (context.pinchend_)
        	context.pinchend_(context);
	}

    this.pinchstart = function(context, rect, x, y)
	{
   		if (context.pinchstart_)
        	context.pinchstart_(context, rect, x, y);
	}

	this.pressup = function(context)
	{
   		if (context.pressup_)
        	context.pressup_(context);
	}

	this.press = function(context, rect, x, y, shift, ctrl)
	{
		if (context.press_)
        	context.press_(context, rect, x, y, shift, ctrl);
	}
};

var headlst =
[
	new function ()
	{
        this.pan = function (context, rect, x, y, type)
        {
            var k = panhorz(context.scrollobj, rect.width-x);
            if (k == -1)
                return;
            if (k == context.scrollobj.anchor())
                return;
            context.scrollobj.set(k);
            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        }

        this.panend = function (context, rect, x, y)
        {
            delete context.scrollobj.offset;
        }

        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

    	this.press = function (context, rect, x, y)
		{
            if (context.page.hitest(x,y))
            {
                startslideshow();
            }
            else if (context.option.hitest(x,y))
            {
                startslideshow();
            }
            else
            {
                if (ismenu())
                {
                    menuhide();
                }
                else
                {
                    headobj.set(headobj.current()?0:1);
                    headham.panel = headobj.getcurrent();
                    headcnvctx.clear();
                    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
                }
            }
        }

     	this.tap = function (context, rect, x, y)
		{
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            if (context.page.hitest(x,y))
            {
                _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
                menushow(_8cnvctx)
            }
            else if (context.option.hitest(x,y))
            {
                menushow(_9cnvctx);
            }
            else if (ismenu())
            {
                menuhide();
            }
            else if (context.prompt.hitest(x,y))
            {
                showsearch()
            }

            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
		};

		this.draw = function (context, rect, user, time)
		{
            context.clear()
            context.save()
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = "black"
            context.page = new rectangle()
            context.option = new rectangle()
            context.thumbnail = new rectangle()
            context.prompt = new rectangle()
            var a = new Col([BEXTENT,0,BEXTENT],
                    [
                        new Layer(
                        [
                            new PagePanel(0.1),
                            new Rectangle(context.page),
                        ]),
                        new Row([10,0,10],
                        [
                            0,
                            new Layer(
                            [
                                new Rectangle(context.prompt),
                                new MultiText(context.scrollobj.berp())
                            ]),
                            0
                        ]),
                        new Layer(
                        [
                            new OptionPanel(0.1),
                            new Rectangle(context.option),
                        ])
                    ]);

            var k = galleryobj.getcurrent();
            var st = [];
            if (galleryobj.repos && url.path)
            {
                st.push(url.path.proper());
            }
            else
            {
                st = [];
                st.push(galleryobj.title);
                if (galleryobj.title1)
                    st.push(galleryobj.title1);
            }

            context.font = "0.9rem Archivo Black";
            var prompt = k.prompt?k.prompt.split("\n"):st;
            a.draw(context, rect, prompt, time);
            context.restore()
		};
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panlst[2].pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panlst[2].panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

     	this.tap = function (context, rect, x, y)
		{
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            if (ismenu())
            {
                menuhide();
            }
            else if (context.sharepanel && context.sharepanel.hitest(x,y))
            {
                menushow(_6cnvctx)
            }
            else if (context.thumbpanel && context.thumbpanel.hitest(x,y))
            {
                thumbobj.rotate(1);
            }
            else if (context.infopanel && context.infopanel.hitest(x,y))
            {
                info();
            }
            else if (context.searchpanel && context.searchpanel.hitest(x,y))
            {
                showsearch()
            }
            else if (context.fullpanel && context.fullpanel.hitest(x,y))
            {
                if (screenfull.isEnabled)
                {
                    if (screenfull.isFullscreen)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            }
            else
            {
                headobj.set(headobj.current()?0:1);
                headham.panel = headobj.getcurrent();
                headcnvctx.clear();
            }

            setTimeout(function ()
            {
                headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
                _4cnvctx.refresh();
            }, JULIETIME);
		};

		this.draw = function (context, rect, user, time)
        {
            context.save();
            context.clear();
            context.font = "1rem Archivo Black";
            context.fullpanel = new rectangle()
            context.thumbpanel = new rectangle()
            context.infopanel = new rectangle()
            context.searchpanel = new rectangle()
            context.sharepanel = new rectangle()
            var w = ALIEXTENT;
           var a = new Row([BEXTENT,0],
           [
               new Col( [ 0, w, w, w, w, w, 0 ],
               [
                   0,
                   new Layer(
                   [
                       new SharePanel("white","black"),
                       new Rectangle(context.sharepanel),
                   ]),
                   new Layer(
                   [
                       new FullPanel("white","black"),
                       new Rectangle(context.fullpanel),
                   ]),
                   new Layer(
                   [
                       new SearchPanel("white","black"),
                       new Rectangle(context.searchpanel),
                   ]),
                   new Layer(
                   [
                       new ThumbPanel("white","black"),
                       new Rectangle(context.thumbpanel),
                   ]),
                   new Layer(
                   [
                       new InfoPanel("white","black"),
                       new Rectangle(context.infopanel),
                   ]),
                   0
                ]),
               0,
            ]);

            a.draw(context, rect, 0, 0);
            context.restore();
        }
    },
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panlst[2].pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panlst[2].panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

     	this.tap = function (context, rect, x, y)
		{
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            if (ismenu())
            {
                menuhide();
            }
            else if (context.minuspanel.hitest(x,y))
            {
                pinchobj.getcurrent().getcurrent().add(-5);
                contextobj.reset();
            }
            else if (context.pluspanel.hitest(x,y))
            {
                pinchobj.getcurrent().getcurrent().add(5);
                contextobj.reset();
            }
            else if (context.picture.hitest(x,y))
            {
                pinchobj.rotate(1);
            }

            headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.refresh();
		};

		this.draw = function (context, rect, user, time)
		{
            context.clear()
            context.save()
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = "black"
            context.pluspanel = new rectangle()
            context.minuspanel = new rectangle()
            context.picture = new rectangle()
            context.font = "1rem Archivo Black";
            var e = Math.min(520,rect.width-190);
            var a = new Col([BEXTENT,0,e,0,BEXTENT],
                    [
                        new Layer(
                        [
                            new MinusPanel(),
                            new Rectangle(context.minuspanel),
                        ]),
                        0,
                        new Layer(
                        [
                            new Rectangle(context.picture),
                            new RowA([0,27,27,0],
                            [
                                0,
                                new Text("white", "center", "middle",0,0,1),
                                new Text("white", "center", "middle",0,0,1),
                                0,
                            ]),
                        ]),
                        0,
                        new Layer(
                        [
                            new PlusPanel(),
                            new Rectangle(context.pluspanel),
                        ])
                    ]);

            var st = pinchobj.getcurrent().title;
            var k = (pinchobj.getcurrent().getcurrent().berp()*100).toFixed(0)+"%";
            a.draw(context, rect, [0,st,k,0], time);
            context.restore()
		};
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panlst[2].pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panlst[2].panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

    	this.tap = function (context, rect, x, y)
		{
            clearInterval(globalobj.slideshow);
            globalobj.slideshow = 0;
            if (ismenu())
            {
                menuhide();
            }
            else if (context.moveprev && context.moveprev.hitest(x,y))
            {
                _4cnvctx.movepage(-1);
            }
            else if (context.movenext && context.movenext.hitest(x,y))
            {
                _4cnvctx.movepage(1);
            }
            else if (context.prompt.hitest(x,y))
            {
                if (galleryobj.getcurrent().photographer_url)
                    window.open(galleryobj.getcurrent().photographer_url, "_blank");
                else
                    showsearch();
            }
		};

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowColor = "black";
            context.font = "0.94rem Archivo Black";
            context.moveprev = new rectangle()
            context.movenext = new rectangle()
            context.prompt = new rectangle()

            var main = new RowA([0,21,21,21,0],
                [
                    0,
                    new Text("white", "center", "middle", 0, 0, 1),
                    new Text("white", "center", "middle", 0, 0, 1),
                    new Text("white", "center", "middle", 0, 0, 1),
                    0,
                ]);
            if (galleryobj.repos)
                main = new RowA([0,21,21,21],
                [
                    0,
                    new Text("white", "center", "middle", 0, 0, 1),
                    new Text("white", "center", "middle", 0, 0, 1),
                    new Text("white", "center", "middle", 0, 0, 1),
                ]);

            var a = new Col([BEXTENT,0,BEXTENT],
                    [
                        new Shrink(new Layer(
                        [
                            new Rectangle(context.moveprev),
                            new Shrink(new CirclePanel(_4cnvctx.movingpage == -1?MENUTAP:SCROLLNAB,SEARCHFRAME,4),5,5),
                            new Shrink(new ArrowPanel(ARROWFILL,270),20,20),
                        ]),10,10),
                        new Layer(
                        [
                            new Col([0,360,0],
                            [
                                0,
                                new Rectangle(context.prompt),
                                0,
                            ]),
                            main,
                        ]),
                        new Shrink(new Layer(
                        [
                            new Rectangle(context.movenext),
                            new Shrink(new CirclePanel(_4cnvctx.movingpage == 1?MENUTAP:SCROLLNAB,SEARCHFRAME,4),5,5),
                            new Shrink(new ArrowPanel(ARROWFILL,90),20,20),
                        ]),10,10)
                    ]);

            var bt = `${galleryobj.current()+1} of ${galleryobj.length()}`;
            var user = [ 0, 0, bt, 0, 0 ];
            if (galleryobj.repos)
                user =
                [
                    0,
                    `${galleryobj.getcurrent().photographer.proper()}`,
                    `${galleryobj.getcurrent().datasource.proper()}`,
                    bt
                ];
            a.draw(context, rect, user, time);
            context.restore()
		};
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panlst[2].pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panlst[2].panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

    	this.tap = function (context, rect, x, y)
		{
            menushow(_3cnvctx);
		};

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();
            context.font = "1rem Archivo Black";

            var a = new Layer(
            [
                    new Fill("black"),
                    new Col([0,60,0],
                    [
                        0,
                        new SearchPanel("white","black"),
                        0
                    ])
               ]);

            a.draw(context, rect, user, time);
            context.restore()
		};
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panlst[2].pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panlst[2].panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panlst[2].panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipelst[2].swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipelst[2].swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {presslst[2].press(_4cnvctx, rect, x, y)}

    	this.tap = function (context, rect, x, y)
		{
		};

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();
            context.restore()
		};
	},
];

var headobj = new circular_array("HEAD", headlst);
var infobj = new circular_array("", 6);
var positxpobj = new circular_array("POSITIONX", 100);
var positypobj = new circular_array("POSITIONY", 100);
var positxlobj = new circular_array("POSITIONX", 100);
var positylobj = new circular_array("POSITIONY", 100);
var positxobj = new circular_array("POSITIONX", [positxpobj,positxlobj]);
var posityobj = new circular_array("POSITIONY", [positypobj,positylobj]);

function menushow(context)
{
    clearInterval(globalobj.slideshow);
    globalobj.slideshow = 0;
    _4cnvctx.slideshow = 0;
    var enabled = context.enabled;
    _2cnvctx.hide();
    _3cnvctx.hide();
    _5cnvctx.hide();
    _6cnvctx.hide();
    _7cnvctx.hide();
    _8cnvctx.hide();
    _9cnvctx.hide();
    context.refresh();
    if (enabled)
        return;

    context.enabled = 1;
    if (context.complete)
    {
        contextobj.resize(context);
    }
    else
    {
        contextobj.resetcontext(context);
        context.complete = 1;
    }

    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
    context.refresh();
    _4cnvctx.refresh();
    setTimeout(function() { context.refresh(); }, 100);
    setTimeout(function() { context.refresh(); }, 500);
    setTimeout(function() { context.refresh(); }, 1000);
    setTimeout(function() { context.refresh(); }, 1500);
    setTimeout(function() { context.refresh(); }, 2000);
    setTimeout(function() { context.refresh(); }, 2500);
}

var ClosePanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*size;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
        var a = new Layer(
        [
            new Row( [0, rect.height*0.35, 0],
            [
                0,
                new Col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

var PagePanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*0.06;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
        var s = _8cnvctx.enabled;
        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,4),15,15),
            s ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
            new Row( [0, rect.height*0.25, 0],
            [
                0,
                new Col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

var OptionPanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*0.06;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
        var s = _9cnvctx.enabled;
        var a = new Layer(
        [
            new Shrink(new CirclePanel(SCROLLNAB,SEARCHFRAME,4),15,15),
            s ? new Shrink(new CirclePanel(TRANSPARENT,"rgb(255,155,0)",4),18,18) : 0,
            new Col( [0,rect.height*0.25,0],
            [
                0,
                new Row( [0,j,k,j,k,j,0], [0,e,0,e,0,e,0]),
                0,
            ]),
        ]);

        a.draw(context, rect, user, time);
        context.restore()
    }
};

window.addEventListener("keyup", function (evt)
{
	if (evt.key == "Escape")
	{
        escape();
        evt.preventDefault();
        return true;
	}
	else
	{
		var context = _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx : _9cnvctx.enabled ? _9cnvctx :
				_4cnv.height ? _4cnvctx : _1cnvctx;
		if (context.keyup_)
			return context.keyup_(evt);
	}
});

window.addEventListener("keydown", function (evt)
{
    var context =
        _3cnvctx.enabled ? _3cnvctx :
        _5cnvctx.enabled ? _5cnvctx :
        _6cnvctx.enabled ? _6cnvctx :
        _7cnvctx.enabled ? _7cnvctx :
        _8cnvctx.enabled ? _8cnvctx :
        _9cnvctx.enabled ? _9cnvctx :
        _4cnvctx;
    if (context.keydown_)
        return context.keydown_(evt);
}, false);

window.onerror = function(message, source, lineno, colno, error)
{
    //window.alert( error+","+lineno+","+console.trace());
};

document.addEventListener("touchstart", function(evt) { }, {passive: false});
document.addEventListener('touchmove', function (evt) { }, { passive: false });
window.addEventListener("touchend", function (evt) { });
window.addEventListener("beforeunload", (evt) => { });
window.addEventListener("pagehide", (evt) => { });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() { setfavicon(); });

function setfavicon()
{
    var element = document.querySelector("link[rel='icon']");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      element.setAttribute("href","res/light.svg");
    else
      element.setAttribute("href","res/dark.svg");
}

window.addEventListener("visibilitychange", (evt) =>
{
});

window.addEventListener("load", async () =>
{
});

function wraptext(ctx, text, maxWidth)
{
    if (!text)
        return [];
    let words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineArray = [];

    for(var n = 0; n < words.length; n++)
    {
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0)
        {
            lineArray.push(line);
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else
        {
            line += `${words[n]} `;
        }

        if (n === words.length - 1)
            lineArray.push(line);
    }

    return lineArray;
}

var galleryobj = new circular_array("", 0);

fetch(path)
.then(function (response)
{
  return response.json()
})
.then(function (obj)
{
    galleryobj = Object.assign(galleryobj,obj);
    galleryobj.set(url.project);
    setfavicon();

    pretchobj.split(60, "40-90", pretchobj.length());
    letchobj.split(60, "40-90", letchobj.length());
    speedyobj.split(1.25, "1-20", speedyobj.length());

    if (!galleryobj.length())
    {
        headobj.set(4);
        showsearch();
    }
    else if (url.slideshow)
    {
        headobj.set(5);
    }
    else
    {
        headobj.set(3);
    }

    galleryobj.slidetop = galleryobj.slidetop ? galleryobj.slidetop : 1;
    galleryobj.slidereduce = galleryobj.slidereduce ? galleryobj.slidereduce : 1000;

    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headham.panel = headobj.getcurrent();
    headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);

    //_2cnv
    _2cnvctx.sliceobj.data =
    [
        {title:"Login", path: "LOGIN", func: function() { authClient.redirectToLoginPage(); }},
        {title:"Logout", path: "LOGOUT", func: function() { authClient.logout(true) }},
        {title:"Account", path: "ACCOUNT", func: function() { authClient.redirectToAccountPage() }},

        {title:"Delete", path: "DELETE", func: function()
            {
                var modalTitle = document.getElementById("delete-label");
                modalTitle.innerHTML = `Delete Image: ${galleryobj.current()+1} of ${galleryobj.length()}`;
                const overlay = document.querySelector('.delete-overlay');
                overlay.style.display = 'flex';
            }},

        {title:"Upload", path: "UPLOAD", func: function()
            {
                setTimeout(function()
                {
                    document.getElementById('upload-label').innerHTML = "Upload Image";
                    const overlay = document.querySelector('.upload-overlay');
                    overlay.style.display = 'flex';
                }, 40);
            }},
    ];

    //_3cnv
    _3cnvctx.sliceobj.data =
    [
        {line:"Unsplash\nImage Search", path: "UNSPLASH", func: function()
            {
                menuhide();
                showsearch("unsplash");
            }},
        {line:"Pexels\nImage Search", path: "PEXELS", func: function()
            {
                menuhide();
                showsearch("pexels");
            }},
        {line:"Pixabay\nImage Search", path: "PEXELS", func: function()
            {
                menuhide();
                showsearch("pixabay");
            }},
        {line:"Pexels Collection\nImage Gallery", path: "PEXELSCOLLECT", func: function()
            {
                menuhide();
                showsearch("pixabay");//todo
            }},
        {line:"Pexels Curated\nImage Gallery", path: "PEXELSCURATED", func: function()
            {
                menuhide();
                showsearch("pixabay");//todo
            }},
        {line:"Unsplsh Collection\nImage Gallery", path: "UNSPLASHCOLLECT", func: function()
            {
                menuhide();
                showsearch("pixabay");//todo
            }},
        {line:"Unsplsh User\nImage Gallery", path: "UNSPLASHUSER", func: function()
            {
                menuhide();
                showsearch("pixabay");//todo
            }},
        {line:"Dalle\nText to Image", path: "DALLE", func: function()
            {
                menuhide();
                showprompt("pixabay");//todo
            }},
        {line:"Sidney\nImage Gallery", path: "SIDNEY", func: function()
            {
                menuhide();
                showprompt("pixabay");//todo
            }},
    ];

    _6cnvctx.sliceobj.data =
    [
        {title:"Download Image", path: "DOWNLOAD", func: function()
            {
                download();
                menuhide();
            }},
        {title:"Screenshot", path: "SCREENSHOT", func: function()
            {
                var k = document.createElement('canvas');
                var link = document.createElement("a");
                link.href = _4cnvctx.canvas.toDataURL();
                link.download = galleryobj.getcurrent()[0] + ".jpg";
                link.click();
            }},
        {title:"Copy Link", path: "COPYLINK", func: function()
            {
                copytext(addressobj.full());
                menuhide();
            }},
        {title:"Copy Prompt", path: "COPYPROMPT", func: function()
            {
                copytext(galleryobj.getcurrent().prompt);
                menuhide();
            }},
        {title:"Copy Image ID", path: "COPYID", func: function()
            {
                copytext(galleryobj.getcurrent().id);
                menuhide();
            }},
    ];

    //7
    _7cnvctx.sliceobj.data =
    [
        {
            line: "Image Viewer\nhttps://reportbase.com\nimages@reportbase.com\nTom Brinkman",
            func: function() {menuhide(); }
        },
        {
            line: "High Resolution\n360° Panoramas\nImage Stetch\nImage Zooming",
            func: function() {menuhide(); }
        },
        {
            line: "Digital Art\nGraphic Novels\nDrone Photgraphy\nLandscapes",
            func: function() {menuhide(); }
        },
        {
            line: "Side Scroller\nWrap Around\nFull Screen\nWide Image",
            func: function() {menuhide(); }
        },
    ];

    if (leftmenu && galleryobj.length() && !url.slideshow)
    {
        _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
        menushow(_8cnvctx)
        _4cnvctx.refresh();
    }

    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var k = galleryobj.data[n];
        k.func = new function ()
        {
            this.exec = function(index)
            {
                galleryobj.set(index);
                let a = document.createElement('a');
                a.target= '_blank';
                a.href= addressobj.full();
                a.click();
            }
        }
    }

    _8cnvctx.sliceobj.data = galleryobj.data;
    _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);

    //9
    var slices = _9cnvctx.sliceobj;
    slices.data = [];

    slices.data.push({title:"User", path: "USER", func: function() { menushow(_2cnvctx); }});
    slices.data.push({title:"Search", path: "SEARCH", func: function() { showsearch(); }});
    slices.data.push({title:"Prompt", path: "PROMPT", func: function() { showprompt() }});
    slices.data.push({title:"Slideshow", path: "SLIDESHOW", func: function() { menuhide(); startslideshow(); }});
    slices.data.push({title:"Metadata", path: "METADATA", func: info})
    slices.data.push({title:"Open", path: "OPEN", func: function()
        {
            menuhide();
            promptFile().then(function(files) { dropfiles(files); })
        }});


    slices.data.push({title:"Reload", path: "RELOAD", func: function()
        {
           location.reload();
            menuhide();
        }})

    slices.data.push({title:"Thumbnail", path: "THUMBNAIL", func: function()
        {
               thumbobj.rotate(1);
                headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
                _4cnvctx.refresh();
        }})

    slices.data.push({title:"Share", path: "SHARE", func: function() { menushow(_6cnvctx); }})
    slices.data.push({title:"Help", path: "HELP", func: function(){menushow(_7cnvctx); }})

    slices.data.push({title:"Fullscreen", path: "FULLPANEL", func: function ()
    {
        if (screenfull.isEnabled)
            screenfull.toggle();
    }})

    contextlst.forEach(function(context)
        {
            var len = context.sliceobj.length()
            context.delayinterval = DELAYCENTER / len;
            context.virtualheight = len*context.buttonheight;
        });

    contextobj.reset();
})
.catch((error) =>
{
    console.log("Error:", error);
});

function download()
{
    if (galleryobj.getcurrent().image_url)
    {
        window.open(galleryobj.getcurrent().image_url);
    }
    else if (galleryobj.getcurrent().original)
    {
        window.open(galleryobj.getcurrent().original);
    }
    else if (galleryobj.getcurrent().full)
    {
        window.open(galleryobj.getcurrent().full);
    }
    else
    {
        var id = galleryobj.getcurrent().id;
        var path = `https://reportbase.com/image/${id}/blob`;
        window.open(path);
    }
}

async function copytext(text)
{
    try
    {
        await navigator.clipboard.writeText(text);
    }
    catch (_)
    {
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        const result = document.execCommand('copy')
        document.body.removeChild(el)
    }
}

document.addEventListener("click", (evt) =>
{
    if (evt.screenY < BEXTENT && (evt.screenX < BEXTENT || evt.screenX > window.innerWidth-BEXTENT))
        return;
    if (evt.target.className.search("overlay") >= 0)
        hideprompt()
});

function deleteimage()
{
    var id = galleryobj.getcurrent().id;
    fetch(`https://reportbase.com/image/${id}`, { method: 'DELETE' })
    .then(res =>
        {
            location.reload();
            return res.json()
        })
    .then(data => console.log(data))
    .catch((error) =>
    {
        console.log("Error:", error);
    });
}

function submitsearch()
{
    localStorage.setItem("repos", globalobj.saverepos);
    hideprompt();
    var search = document.getElementById('search').value;
    search = search.clean().toLowerCase();
    var s = `${url.origin}?${globalobj.saverepos}=${search}&page=${url.page}`;
    window.open(s, "_self");
}

function submitprompt()
{
    var prompt = document.getElementById('prompt').value;
   fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: prompt,
         headers: { "Content-Type": "text/plain" }
   })
}

function ismodal()
{
    var res = 0;
    const divlst = document.querySelectorAll("div");
    divlst.forEach(function(div)
    {
        var k = div.className.indexOf("-overlay");
        if (k >= 0 && div.style.display == 'flex')
            res = 1;
    });

    return res;
}

function hideprompt()
{
    const divlst = document.querySelectorAll("div");
    divlst.forEach(function(div)
    {
        var k = div.className.indexOf("-overlay");
        if (k >= 1)
            div.style.display = 'none';
    });

    setTimeout(function()
    {
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        _4cnvctx.refresh();
        _8cnvctx.refresh();
    }, 40);
}

function info()
{
  hideprompt();
  function getslices()
  {
      var slices = galleryobj.getcurrent().slices;
      if (!slices)
      {
            slices = [];
            var index = `${galleryobj.current()+1} of ${galleryobj.length()}`
            slices.push({line: `Index\n${index}`, func: function() { menuhide(); }})
            var extent = `${photo.image.extent}`
            slices.push({line: `Extent\n${extent}`, func: function() { menuhide(); }})
            var aspect = `${(photo.image.aspect).toFixed(2)}`
            slices.push({line: `Aspect\n${aspect}`, func: function() { menuhide(); }})
            var keys = Object.keys(galleryobj.getcurrent());
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = galleryobj.getcurrent()[key]
                if (value && value.length && typeof value === 'string' &&
                    value.substr(0,4) != "blob" &&
                    value.substr(0,4) != "http")
                {
                    key = key.toLowerCase()
                    key  = key.charAt(0).toUpperCase() + key.slice(1)
                    slices.push({line:`${key}\n${value}`, func: function() { menuhide(); }})
                }
            }
        }

        return slices;
    }

    _5cnvctx.buttonheight = 90;
    _5cnvctx.sliceobj.data  = getslices();
    _5cnvctx.delayinterval = DELAYCENTER / _5cnvctx.sliceobj.data.length;
    _5cnvctx.virtualheight = _5cnvctx.sliceobj.data.length*_5cnvctx.buttonheight;
    menushow(_5cnvctx);
}

function artistpage()
{
    var s = galleryobj.getcurrent().photographer_url;
    if (!s)
        return;
    hideprompt();
    window.open(s);
}

function showsource()
{
    hideprompt();
    menushow(_3cnvctx);
}

function showsearch(repos)
{
    setTimeout(function()
    {
        var lrepos = localStorage.getItem("repos");
        if (!lrepos)
            lrepos = "pexels";
        globalobj.saverepos = repos?repos:lrepos;
        var btn = document.getElementById('source');
        btn.textContent = globalobj.saverepos.proper();
        document.getElementById('search').value = url.path;
        const overlay = document.querySelector('.search-overlay');
        overlay.style.display = 'flex';
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        _4cnvctx.refresh();
        _8cnvctx.refresh();
    }, 60);
}

function startslideshow()
{
    _4cnvctx.movepage(1)
    clearInterval(globalobj.slideshow);
    globalobj.slideshow = setInterval(function()
    {
        headobj.set(5);
        headham.panel = headobj.getcurrent();
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        _4cnvctx.movepage(1)
    }, url.slideshow?url.slideshow:SLIDEDEFAULT);
}

function showprompt()
{
    setTimeout(function()
    {
        var prompt = galleryobj.getcurrent().prompt
        if (prompt)
            document.getElementById('prompt').value = prompt;
        const overlay = document.querySelector('.prompt-overlay');
        overlay.style.display = 'flex';
    }, 40);
}

if (url.protocol == "https:")
{
    authClient = PropelAuth.createClient({authUrl: "https://auth.reportbase.com", enableBackgroundTokenRefresh: true})
    authClient.getAuthenticationInfoOrNull(false)
    .then(function(client)
    {
        if (client)
            globalobj.user = client.user;
    })
}

function cnvtoblob()
{
    let image = _4cnv.toDataURL("image/png");
      fetch(`https://bucket.reportbase5836.workers.dev/gallery/screen1`,
    {
      method: 'POST',
      body: image
    })
      .then(response => response.text())
      .then(result => alert(result, null, 2))
}
