var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user:'shreyaschitloor1996',
    database:'shreyaschitloor1996',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(express.static("."));

var articles = {
'article-one' : {
    title: 'Article one|shreyas',
    heading: 'article one',
    date: 'feb 17,2018',
    content:`
    <p>
        k
    </p>
    <p>
        kk
    </p>
    <p>
        kkk
    </p>`
    },
'article-two' : {
    title: 'Article two|shreyas',
    heading: 'article two',
    date: 'feb 17,2018',
    content:`
    <p>
        k
    </p>
    <p>
        kk
    </p>
    <p>
        kkk
    </p>`
    
},
'article-three' : {
    title: 'Article three|shreyas',
    heading: 'article three',
    date: 'feb 17,2018',
    content:`
    <p>
        k
    </p>
    <p>
        kk
    </p>
    <p>
        kkk
    </p>`
    
}
};

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
app.get('/counter',function(req,res){
   counter=counter+1;
   res.send(counter.toString());
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
var names=[];
app.get('/submit-name/:name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res){
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
