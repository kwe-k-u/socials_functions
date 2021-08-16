const functions = require("firebase-functions");
// const http = require("https");
const fetch = require("node-fetch");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.twitter_callback = functions.https.onRequest( async (request, response) => {
	let url = request.url.split("=");
	functions.logger.info("twitter callback url " + JSON.stringify(request.url));
	functions.logger.info("callback verifier " + url[2]);
	
	functions.logger.info("callback token " + url[1].substr(0, url[1].indexOf("&")));
	// functions.logger.info("twitter callback url.oauth_token" + request.url.oauth_token);
	let endpoint = "https://api.twitter.com/oauth/access_token?oauth_token=" + url[1].substr(0, url[1].indexOf("&")) + "&oauth_verifier=" + url[2];

	let data = await fetch(endpoint,{
		method: "POST",
		authorization : {
			oauth_callback=JSON.stringify(request.url).replace("/", "%2F").replace(":", "%3A"),
              oauth_consumer_key="cChZNFj6T5R0TigYB9yd1w",
              oauth_nonce="ea9ec8429b68d6b77cd5600adbbb0456",
              oauth_signature="F1Li3tvehgcraF8DMJ7OyxO4w9Y%3D",
              oauth_signature_method="HMAC-SHA1",
              oauth_timestamp="1318467427",
              oauth_version="1.0"
		}

	});

	// functions.logger.info("stringify " +JSON.stringify( data.json()))
	functions.logger.info("json " + data.json());
	functions.logger.info("data " +data);
	functions.logger.info("oauth access token " +data.oauth_access_token );
	functions.logger.info("oauth access token secret " +data.oauth_access_token_secret );
	functions.logger.info("data " +data);
	functions.logger.info("oauth token " +data.oauth_token );
	functions.logger.info("oauth token secret " +data.oauth_token_secret );

	response.send(data);
})


// exports.testing = functinos.https.onRequest(async (request,response) => {
// 	const options = {
// 		hostname: 'encrypted.google.com',
// 		port: 443,
// 		path: '/',
// 		method: 'GET'
// 	  };

// 	  const req = http.request(options, (res) => {
// 		console.log('statusCode:', res.statusCode);
// 		console.log('headers:', res.headers);

// 		res.on('data', (d) => {
// 		  process.stdout.write(d);
// 		});
// 	  });



// });