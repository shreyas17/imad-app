var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config ={
	user:'shreyaschitloor1996',
    database:'shreyaschitloor1996',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
app.use(express.static("."));


var app = express();
app.use(morgan('combined'));


 var articles = {
	 'article-one' : {
		title	 :  'Article One | shreyas' ,
		date	 : 'Feb 17, 2018' , 
		heading	:  'Article One',
		content	 : `<p>
		                    This is the content for Article one This is the ontent for Article one This is the ontent for Article one This is the ontent for Article one
		                    This is the content for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article one
		                    
		                </p>
		            <p>
		                    This is the content for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article oneThis is the ontent for Article one
		            </p>`, 
		},

	 'article-two' : {
			title	 :  'Article Two | shreyas' ,
			date	 : 'Feb 18, 2018' , 
			heading	:  'Article Two',
			content	 : `<p>
			                    This is the content for Second Article
			            </p>`, 
		},

	 'article-three': {
			title	 :  'Article Three | shreyas' ,
			date	 : 'Feb 18, 2018' , 
			heading	:  'Article Three',
			content	 : `<p>
			                    This is the content for Third Article
			            </p>`, 
		},

};

var pool = new Pool(config);

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	
	var htmlTemplate = `
	<html>
	<head>
	    <link href=ui/style.css rel="stylesheet"/>
	        <title>
	         ${title}
	        </title>
	    </head>
	    <body>
	        <div>
	      <a href="/">Home</a>
	    </div>
	    <hr/>
	    <h3>
	        ${heading}
	    </h3>
	    <div>
	        ${date}
	    </div>
	    <div>
	    <p>
	         ${content}
	    </p>
	    </div>
	    </body>
	</html>
	`;
	return htmlTemplate;
}

var counter=0;
app.get('/counter', function (req, res) {
	counter+=1;
  res.send(counter.toString());
});

 var names= [];
 app.get('/submit-name', function (req, res) { //url: submit-name?query regarding name
   var name = req.query.name; //also provided by xpress framework
   names.push(name);
   //JSON 
   res.send(JSON.stringify(names));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
