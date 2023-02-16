//node get.js HOME
var id = process.argv[2];

return fetch("https://bucket.reportbase5836.workers.dev/gallery/" + id)
  .then(response => response.json())
  .then(function(json)
      {
        var quotes =
        [
            "Those who dance are considered mad by those who can't hear the music.",
            "May God have mercy on my enemies, cause I will not.",
            "The difference between genius and stupidity is that genius has its limits.",
            "The Harder You Work, The Luckier You Get",
            "Teamwork Makes the Dream Work",
            "OK Monday, Lets Do This",
            "Do Not Decrease the Goal, Increase the Effort",
            "We Didn't Lose the Game, We Just Ran Out of Time",
            "The Seeds of Doubt Grow Bitter Fruit",
            "Success Consists of Getting Up Just One More Time Than You Fail",
            "Enjoy Life Today, Yesterday Is Gone Tomorrow",
            "If Not Us Who? If Not Now When?",
            "If Opportunity Does Not Knock, Build a Door",
            "It Was Not Raining When Noah Built the Ark",
            "What We Are is God's Gift, What We Become is Our Gift to God",
            "The Best Way to Predict the Future is To Invent It",
            "Failure is the Condiment Which Gives Success Its Flavor",
            "I can Resist Everything Except Temptation",
            "What's Another Word For Thesaurus",
            "It Is During the Darkest Moments That We Must Focus To See the Light",
            "Winners Never Quit, Quitters Never Win",
            "If Two Wrongs Don't Make a Right, Try Three",
            "Try Being Informed Instead of Being Opinionated",
            "I Refuse to Join Any Club That Would Have Me As a Member",
            "Life is A Series of Commas, Not Periods",
            "My Fake Plants Died Because I Did Not Pretend to Water Them",
            "Life is What Happens When You Are Busy Making Other Plans",
            "We are a Conclave of Geniuses, Knows as the Intelligencia",
            "Believe You Can and You are Half Way There",
            "If you Think You Can Or Think You Can't, Either Way Your Right",
            "The Road to Success and The Road To Failure Are Exactly the Same",
            "The Secret of Getting Ahead Is Getting Started",
            "What Does Not Kill You Makes You Stronger",
            "The Harder the Conflict the More Glorious the Triumph",
            "Don't Spend Time Beating On a Wall Hoping To Tranform It Into A Door",
            "I May Not Be There Yet but I'm Closer Than I Was Yesterday",
            "Do What You Love, Love What You Do",
            "The Pessimist Sees Difficulty In Every Opportunity The Optimist Sees Opportunity In Every Difficulty",
            "If Your Going Through Hell Keep Going",
            "Open Your Mind Before Your Mouth",
            "If You Can Dream It You Can Do It",
            "Creativity Is Intelligence Having Fun",
            "Fake It Until You Make It",
            "The Secret of Getting Ahead is Getting Started",
            "The Best Way to Keep One's Word is Not to Give It",
            "Learn to Say 'No' to the Good so You can Say 'Yes' to the Best",
            "The Best Way to Hold a Man is in Your Arms",
            "The Best Question is Not What is Best, but Who Shall Decide What is Best",
            "Only a Mediocre Person is Always at His Best",
            "We've Been Gone Five Years and the Best they Could Come up With was Boy Bands?",
            "No Man has a Good Enough Memory to be a Successful Liar",
            "Get Your Facts First, then you can Distort Them as You Please",
            "All Generalizations are False, Including This One",
            "Between Two Evils, I Always Pick the One I Never Tried Before",
            "I No Doubt Deserved my Enemies, but I don't Believe I Deserved My Friends",
            "Food Is an Important Part of a Balanced Diet",
            "Housework Can't Kill You, but Why Take a Chance?",
            "There Are Lots of People who Mistake their Imagination for Their Memory",
            "The Reports of My Death Have Been Greatly Exaggerated",
            "Before I Refuse to Take Your Questions, I Have an Opening Statement",
            "A Government That Robs Peter to Pay Paul Can Always Depend on the Support of Paul",
            "I Have had a Perfectly Wonderful Evening, but this Wasn't It",
            "As For Our Majority... One is Enough",
            "I Failed to Make the Chess Team Because of My Height",
            "You Can Always Tell When a Man's Well Informed - His Views are Pretty Much Like Your Own",
            "It's Simple, If It Jiggles, It's Fat",
            "Yield to Temptation - It May Not Pass Your Way Again",
            "If I Want to Knock a Story Off the Front Page, I Just Change My Hairstyle",
            "All Right Everyone, Line Up Alphabetically According to Your Height",
            "Why Do You Have to be a Nonconformist Like Everybody Else?",
            "I was the Kid Next Door's Imaginary Friend",
            "I Don't Think Anyone Should Write Their Autobiography Until After They're Dead",
            "I Read Part of it All the Way Through",
            "There Cannot be a Crisis Next Week. My Schedule is Already Full.",
            "Everybody Talks About the Weather, but Nobody Does Anything About It.",
            "Originality is the Fine Art of Remembering What You Hear but Forgetting Where You Heard It.",
            "Work until your idols become your rivals.",
            "To Be or Not to be. That's Not Really a Question.",
            "Dont limit your challenges, challenge your limits.",
            "Laziness is Nothing More than the Habit of Resting Before You Get Tired",
            "Food is an Important Part of a Balanced Diet",
            "Most People Never Run Far Enough on Their First Wind to Find Out They've Got a Second.",
            "What comes easy wont last, what lasts wont come easy.",
            "Half the Lies They Tell About Me Aren't True.",
            "If you dont build your dreams, someone else will hire you to build theirs.",
            "Hard work beats talent when talent doesnt work hard.",
            "Don't Play Too Much Golf. Two Rounds a Day are Plenty.",
            "Be stubborn about your goals but flexible about your methods.",
            "The Best Thing to Hold Onto in Life is Each Other.",
            "Dont be pushed by your problems, be led by your dreams.",
            "If the Facts Don't Fit the Theory, Change the Facts.",
            "Theory Helps us to Bear Our Ignorance of Facts.",
            "If your dreams dont scare you, they are not big enough.",
            "Reason, Observation, and Experience; the Holy Trinity of Science.",
            "Your Theory is Crazy, But It's Not Crazy Enough To Be True.",
            "The man on top of the mountain didnt fall there.",
            "Do what you have to do until you can do what you want to do.",
            "Research is What I'm Doing When I Don't Know What I'm Doing.",
            "Science Has Made us Gods Even Before We Are Worthy of Being Men.",
            "The Virtues of Science Are Skepticism and Independence Of Thought.",
            "Nobody Cares How Much You Know, Until They Know How Much You Care.",
            "The Time is Always Right To Do What Is Right.",
            "Judge a Man by His Questions Rather Than His Answers.",
            "I Think; Therefore I Am",
            "If You Do What You've Always Done, You'll Get What You've Always Gotten.",
            "You Cannot Step Into the Same River Twice.",
            "Insanity is Doing the same Thing Over and Over Again and Expecting Different Results.",
            "Nothing is So Good As It Seems Beforehand.",
            "United We Stand, Divided We Fall.",
            "Lend Yourself to Others, but Give Yourself to Yourself.",
            "The Very Essence of Instinct Is That It's Followed Independently of Reason.",
            "Fortune Favors the Bold.",
            "In the Kingdom of the Blind, the One-Eyed Man is King.",
            "You will never know your limits until you push yourself to them.",
            "If we keep doing what we are doing, were going to keep getting what were getting.",
            "You didnt come this far only to come this far.",
            "A hill is just another opportunity to leave your competition behind.",
            "A Man Doesn't Know What he Knows Until He Knows What He Doesn't Know.",
            "I Shut My Eyes In Order To See.",
            "He Who Defends Everything Defends Nothing.",
            "When All Else is Lost, the Future Still Remains.",
            "What Worries You, Masters You.",
            "Real Knowledge Is to Know the Extent of One's Ignorance.",
            "If it doesnt challenge you, it wont change you.",
            "Work while they sleep. Learn while they party. Save while they spend. Live like they dream.",
            "They Say a Little Knowledge is a Dangerous Thing, but It's Not One Half As Bad As a Lot of Ignorance.",
            "Falling down is an accident, staying down is a choice.",
            "The Greater Our Knowledge Increases The More Our Ignorance Unfolds.",
            "Faith Is a Knowledge Within The Heart, Beyond The Reach Of Proof.",
            "If you cannot be a poet, be the poem.",
            "Life is a Travelling to the Edge of Knowledge, Then taking a Leap.",
            "Be yourself; everyone else is already taken.",
            "It is the Providence of Knowledge to Seak, and it is the Privilege of Wisdom to Listen.",
            "Do what you can, with what you have, where you are.",
            "In Your Thirst For Knowledge, Be Sure Not to Drown In All the Information.",
            "Wanting to be someone else is a waste of who you are.",
            "Dont look for society to give you permission to be yourself.",
            "I Saw the Angel in the Marble and Carved Until I Set Him Free.",
            "To Have a Great Idea, Have Lots of Them.",
            "You Can't Depend on Your Eyes When Your Imagination is out of Focus.",
            "The Man Who Has No Imagination Has no Wings.",
            "There Are No Rules of Architecture For a Castle in the Clouds.",
            "Imagination is Man's one True Power Over Nature.",
            "The Only Sure Weapon Against Bad Ideas Is Better Ideas.",
            "My Imagination Is a Monastery and I am Its Monk.",
            "I will not let anyone walk through my mind with their dirty feet.",
            "Don't be Afraid to See What You See"
        ]

        var data = [];
        var m = 0;
        json.data = json.datam ? json.datam : json.data;
        for (var n = 0; n < json.data.length; ++n)
        {
            var k = json.data[n];
            var j = {};
            var width = k.width;
            var height = k.height;
            var aspect = (k.width/k.height).toFixed(2);
            j.id = k.src?k.src:k.id;
            j.index = (data.length+1)+" of "+json.data.length;
            if (width)
                j.width = width;
            if (height)
                j.height = height;
            if (width && height)
            {
                j.extent = `${width}x${height} ${aspect}`;
                j.size = ((width * height)/1000000).toFixed(1) + "MP";
            }

            if (k.describe)
                j.describe = k.describe;
            j.original = `https://reportbase.com/image/${j.id}/quality=85,fit=crop,width=${width},height=${height}`;
            j.full = `https://reportbase.com/image/${j.id}/quality=85,fit=crop,width=${width},height=${height}`;
            j.thumb = `https://reportbase.com/image/${j.id}/quality=85,fit=crop,width=600,height=600`;
            j.quote = quotes[m++];
            if (m == quotes.length)
                m = 0;

            data.push(j);
        }

        var g = {}
        g.title = `Repba Gallery`;
        g.data = data;

           console.log(JSON.stringify(g));
      }
  )


