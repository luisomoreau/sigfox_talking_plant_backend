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
    console.log('> testing afterRemote function');
    console.log('time : '+message.time);
    console.log('device id : '+message.device);
    console.log('data : '+message.data);
    console.log('temp : '+message.temp);
    console.log('lum : '+message.lum);
    console.log('hum : '+message.hum);
    console.log('voltage : '+message.voltage);
    var statuses = [];
    if(message.temp<15){
      statuses.push("I'm feeling a bit cold... "+message.temp+" °C. https://t.co/qblek65GFk");
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
    var length = statuses.length;
    console.log(length);
    
    if(length==0){
      console.log("No corresponding status...")
    }else{
      var random = Math.floor(Math.random() * length);
      console.log(random);

      var status = statuses[random];
      console.log(status);
      client.post('statuses/update', {status: status},  function(error, tweet, response){
          if(error) console.log(error);
          console.log(tweet);  // Tweet body.
          console.log(response);  // Raw response object.
        });
    }

  
    next();
  });



};
