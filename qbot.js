var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'KjfaQXzpbsjnVkCadwbyBAH3A',
  consumer_secret: 'ooD0Knjz0YVRzmBgY08uWq7hcDaJVdoHBA8j7CMtQPa0toBxhW',
  access_token_key: '4196569752-S2GVkZMpyjstXd6uzSipvoDKuSId618zz6FfcE9',
  access_token_secret: 'MgxFnN9CmvexdzbGICW93O4T9lPDHR2Lxgb4r87JCE3eU'
});
var words = ['bando', 'migos', 'migo', 'quavo', 'migos adlibs', 'migos ad libs']
var shouts = ['momma', 'woah', 'cash', 'bando','migo' ]

quavoBotMain()

setInterval(quavoBotMain, 36000005)

function quavoBotMain(){
  client.stream('statuses/filter', {track: '#quavobot,migos ad libs,migos adlibs,quavo ad libs, quavo adlibs,quavos ad libs, quavos adlibs'}, function(stream) {
    console.log("connected");
    stream.on('data', function(tweet) {
      console.log(tweet.text)
      if(!tweet.retweeted_status){
      if(tweet.text.search('#quavobot') != -1){
        tweetit('repeat');
      }else {
        tweetit('talk');
      }
    }
     function tweetit(orders){
       if(orders == 'talk'){
         var libber = shouts[getRandomInt(0, shouts.length)].toUpperCase();
       }else{
          var tweetArr = tweet.text.split(" ")
         var libber = tweetArr[tweetArr.length -2].toUpperCase();
       }

       var id = tweet.id_str;
       var screename = tweet.user.screen_name;
       if(libber[0] == "#"){
         libber = "I DON'T DO HASHTAGS DUMMY"
       }
       var adlib =   '@' + screename + " " + libber + "!!!!!!" ;
       console.log(adlib);
       console.log(screename);
       var tweetro =
       {
         status: adlib,
         in_reply_to_status_id: id,
       };
       client.post('statuses/update/', tweetro,  function(error, tweet, response){
         if(error) console.log(error);
         console.log('tweeted back ' + adlib);
           // Raw response object.
       });

     };
    });

    stream.on('error', function(error) {
      console.log(error);
    });
    setTimeout(destroy, 36000000)
    function destroy(){
      stream.destroy()
      console.log('destroyed');
    }
  });
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
