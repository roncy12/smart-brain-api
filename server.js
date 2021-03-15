const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pass',
    database : 'smartbrain'
  }
});

db.select('*').from('users').then(data =>{
	console.log(data);
});

const app = express();
  


const database = {

	users: [
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'passwordAPI',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'Sally@gmail.com',
		password: 'passwordAPIS',
		entries: 0,
		joined: new Date() 
	}

  ]
}

app.use(bodyParser.json());
app.use(cors())


app.get('/', (req, res)=>{
	res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) =>  {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db )})

app.put('/images', (req, res) => {image.handleImage(req, res, db )})

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res, db )})



app.listen(3001, ()=>{
	console.log('app is running on port 3001');
})


/*

/--> res = this is working
/signin --> POST == success/fail
/register --> POST = user

/profile/:userId --> GET = user
/image --> PUT --> user


*/

	// //Load hash from your password DB.
	// bcrypt.compare("password", '$2a$10$gdGQtfIo8g1QQkpNchJDoO6oYaGcDl6DHGKJ25B8vgOFj2.EvMma.', function(err, res) {
	//     console.log('first guess', res);
	// });
	// bcrypt.compare("veggies", '$2a$10$gdGQtfIo8g1QQkpNchJDoO6oYaGcDl6DHGKJ25B8vgOFj2.EvMma.', function(err, res) {
	//     console.log('second guess', res);
	// });
	// bcrypt.hash(password, null, null, function(err, hash) {
 //    // Store hash in your password DB.
 //   	 console.log(hash);
	// });