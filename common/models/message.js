var Twitter = require('twitter');

module.exports = function(Message) {
  //var app = require('../../server/server');
  // Message.observe('loaded', function(ctx, next) {
  //   var Twit = app.models.RandomTwit;
  //   //console.log(Twit);
  //   Twit.find(function (err,data) {
  //     if (err){
  //       console.log(err)
  //     }else{
  //       //console.log(data);
  //       statuses = data;
  //       next();
  //     }
  //   })
  //
  // });

  //Use the environment variables in production
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  //Available methods :
  // client.get(path, params, callback);
  // client.post(path, params, callback);
  // client.stream(path, params, callback);

  Message.afterRemote('create', function (ctx, message, next){
    // console.log('> testing afterRemote function');
    // console.log('time : '+message.time);
    // console.log('device id : '+message.device);
    // console.log('data : '+message.data);
    // console.log('temp : '+message.temp);
    // console.log('lum : '+message.lum);
    // console.log('hum : '+message.hum);
    // console.log('voltage : '+message.voltage);
    var date = new Date(message.time);
    var hours = date.getHours() + (date.getTimezoneOffset() / 60) -1;
    console.log("hours :"+hours);
    var statuses = [];
    if(message.temp<15){
      statuses.push("I'm feeling a bit cold... "+message.temp+" °C. https://t.co/qblek65GFk");
    }
    if(message.temp<10){
      statuses.push("It's freezing in here..."+message.temp+" °C. https://t.co/qblek65GFk");
    }
    if(message.hum<10){
      statuses.push("Could anyone bring me water ? I'm below "+message.hum+" % of water. https://t.co/qblek65GFk");
      statuses.push("Hey guys!! I'm starting to be a bit thirsty... I'm below "+message.hum+" % of water. https://t.co/qblek65GFk");
    }
    if(message.temp>28){
      statuses.push("Wow it's hot in here... "+message.temp+" °C. https://t.co/qblek65GFk");
      statuses.push("It's warm in the office "+message.temp+" °C. https://t.co/qblek65GFk");
    }
    if(hours==9){
      statuses.push("Good morning everyone. It's "+message.temp+" °C in the office! https://t.co/qblek65GFk");
    }
    if(hours==13&&message.hum<15){
      statuses.push("Enjoy your meal, oh and can anyone bring me some water when you come back please ? I'm below "+message.hum+" % of water... https://t.co/qblek65GFk");
      statuses.push("I know you don't like to be disturb you Humans when you are eating but can anyone give me water ? "+message.hum+" left. https://t.co/qblek65GFk");
    }
    if(hours==12&&message.temp>27){
      statuses.push("Time for a salad with this temperature "+message.temp+" °C... https://t.co/qblek65GFk");
    }
    if(hours==23&&message.lum>70){
      statuses.push("I think someone forgot to turn off the light... It's still very bright in here "+message.lum+" %. https://t.co/qblek65GFk");
    }
    var length = statuses.length;
    console.log(length);

    if(length==0){
      console.log("No corresponding status...")
    }else{
      var random = Math.floor(Math.random() * length);
      console.log(random);

      var status = statuses[random];
      console.log("Status: "+status+" - Length : "+status.length);

      client.post('statuses/update', {status: status},  function(error, tweet, response){
          if(error) console.log(error);
          // console.log(tweet);  // Tweet body.
          // console.log(response);  // Raw response object.
        });
    }


    next();
  });



};
