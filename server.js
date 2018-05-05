var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
'article-one' : {
    title: 'Article one|gaurav rane',
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
    title: 'Article two|gaurav rane',
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
    title: 'Article three|gaurav rane',
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

function createTemplate (data) {
var title = data.title;
var date = data.date;
var heading = data.heading;
var content = data.content;


var htmltemplate=`
<html>
 <head>
    <title>
      ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
 <link href="/ui/style.css" rel="stylesheet" />

 </head>    
 <body>
     <div class="container">
    <div>
        <a href="/">home</a>
    </div>
<hr/>
<h3>
  ${heading}
</h3>
<div>
  ${date}
</div>
<div>
  ${content}
</div>
</div>
 </body>
</html>
`;
return htmltemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
   var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
