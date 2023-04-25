const http = require('http'),
    express = require("express"),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    knex = require('knex'),
    cors = require('cors'),
    path = require('path');
    // convert = require('xml-js'),
    // axios = require('axios');

const User = require('./app/models/Users');
const Project = require('./app/models/Projects');
const env = require('./env');
console.log('node.js application starting...');
const createTables = require('./tableCreation');

const app = express();



app.use(cors());

app.use(bodyParser.json({ type: 'application/json' })); // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views')); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public/assets'))); // configure express to use public folder


// let base_api ='' ;
var server = http.createServer(app);

const dotenv = require("dotenv");

dotenv.config();
// Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'vueapp/dist')))
const users = [];
// Handle the /api/v1/login route
app.get('/api/v1/login', (req, res) => {
    // res.sendFile('vueapp/public/index.html', { root: __dirname });
});
app.get('/api/v1/users', async (req,res) =>{
    //res.sendFile(path.join(__dirname, "index.html"));
    console.log('home page');

    const user = await User.query().select();
    res.json(user);

});
app.get('/api/v1/users/:id',async (req, res, next) =>{
    try{
        const {id} = req.params;
        const user = await User.query().findById(id);
        res.json(user);
    }catch (err){
        console.log(err);
        res.status(500).send();
    }

});
app.post('/api/v1/users', async(req,res) =>{
    //res.sendFile(path.join(__dirname, "index.html"));
    console.log('inserting data into users table');
    const user = await User.query().insert({
        name: 'lmn',
        email: 'lmn@gmail.com',
        password: '123456'
    });
    res.json(user);
    // try{
    //
    //     const hashpassword = await bcrypt.hash(req.body.password, 10);
    //     const user = { name:req.body.name, password : hashpassword };
    //     users.push(user);
    //     res.status(201).send();
    // }catch (err){
    //     res.status(500).send();
    // }

});


app.listen(3000, async () => {
    console.log('Server is running on port 3000');
    await createTables();
});

module.exports = app;