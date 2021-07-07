const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes')
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//setting templating engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//routes
app.use(router);

app.listen(PORT, () => {
	console.log(`Server started on PORT ${PORT}`);
});

app.get('/',(req,res)=>{
    res.render('./index.ejs');
})
