var Twitter = require('twitter');

module.exports = function(Message) {
  var app = require('../../server/server');

  Message.observe('loaded', function(ctx, next) {
    var Twit = app.models.RandomTwit;    // works!
    //console.log(Twit);
    Twit.find(function (err,data) {
      if (err){
        console.log(err)
      }else{
        console.log(data);
        next();
      }
    })

  });

  var client = new Twitter({
    consumer_key: 'HPYbuuolFJHKEWkaejpiDKBNf',
    consumer_secret: 'fMTjv3HbEqumSPhOzCIOPgEwNfZ2ggVtJkPmPQWBoipoeA7ZJ4',
    access_token_key: '728509639176884226-IKkFFqXqwKs395WLwmb5Pu0B7mG8krD',
    access_token_secret: 'e0ZvUCqvt0as2z5j6vadwJmp6KOwAPanl6MnurEn6w8vc'
  });

  // Use the environment variables in production
  // var client = new Twitter({
  //   consumer_key: process.env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  //   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  //   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  // });

  //Available methods :
  // client.get(path, params, callback);
  // client.post(path, params, callback);
  // client.stream(path, params, callback);

  Message.afterRemote('create', function (ctx, message, next){
    console.log('> testing afterRemote function');
    console.log('time : '+message.time);
    console.log('device id : '+message.device);
    console.log('data : '+message.data);

    var statuses = [
      {"status": "Wow it's so hot in the office"+message.temp+"°C, can someone turn on the air conditioning system?"}
    ]

    // client.post('statuses/update', {status: 'https://t.co/qblek65GFk'},  function(error, tweet, response){
    //     if(error) console.log(error);
    //     console.log(tweet);  // Tweet body.
    //     console.log(response);  // Raw response object.
    //   });
    next();
  });



};
