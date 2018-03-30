var AWS = require("aws-sdk");
var ses = new AWS.SES({
   region: 'us-east-1'
});
var DOC = require("dynamodb-doc");
AWS.config.update({region: "us-east-1"});
var docClient = new DOC.DynamoDB();

exports.handler = function(event, context) {
  var email = event.Records[0].Sns.Message;
  var subject = event.Records[0].Sns.Subject;
  var time = Math.floor(Date.now() / 1000);
  time += 1200;
  
  var pfunc = function(err, data) { 
    if (err) {
        console.log(err, err.stack);
    } else {
        if(Object.keys(data)==0){
          docClient.putItem(params, function(err, data){
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(data);
            }
          });
          var email = ses.sendEmail(eParams, function(err, data){
            if(err) console.log(err);
            else {
              console.log("===EMAIL SENT===");
              console.log(data);
              console.log("EMAIL CODE END");
              console.log('EMAIL: ', email);
              //context.succeed(event);
            }
          });
          console.log("put successfull");
        }else{
          console.log(data);
        }
    }
  }
  
  console.log(email)
  console.log(subject)
  
  var params = {};
  params.TableName = "csye6225";
  params.Item = {id : email,
                 subject : subject,
                 ttl    : time}
  
  var params2 = {};
  params2.TableName = "csye6225";
  params2.Key = {id : email};
  
  var eParams = {
    Destination: {
        ToAddresses: [email]
    },
    Message: {
        Body: {
          Html: {
           Charset: "UTF-8", 
           Data: "This message body contains HTML formatting. It can, for example, contain links like this one: <a class=\"ulink\" href=\"http://docs.aws.amazon.com/ses/latest/DeveloperGuide\" target=\"_blank\">Amazon SES Developer Guide</a>."
          }, 
          Text: {
              Data: "Hey! What is up?"
          }
        },
        Subject: {
            Data: subject
        }
    },
    Source: "lukeeechen@gmail.com"
  };

  docClient.getItem(params2, pfunc); 

  
};