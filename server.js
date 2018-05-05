var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleone={
    title:'article one',
    date:'18th sept',
    heading:'article-one',
    content:`
    '<p>
                khshyyvsi
    </p>
    <p>
                sd
    </p>
    '`
};
function createTemplete(data){
    var title=data.title;
    var date=data.date;
    var content=data.content;
    var heading=data.heading;
    var htmltemplete=`
        <html>
        <head>
            <title>
                $(title)
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
            <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                $(heading)
            </h3>
            <div>
                $(date)
            </div>
            <div>
                <p>
                $(content)
                </p>
            </div>
            </div>
        </body>
    </html>
    `;
    return htmltemplete;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/articleone',function(req,res){
   res.send(createTemplete(articleone));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
