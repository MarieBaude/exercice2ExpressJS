const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'pug');

let bdd = [
    {name: 'Antoine', age: 23, mail: 'antoine@gmail.com'},
    {name: 'Danny', age: 30, mail: 'danny@gmail.com'},
    {name: 'RJ', age: 35, mail: 'rj@gmail.com'},
    {name: 'Wiliam', age: 22, mail: 'wiliam@gmail.com'},
    {name: 'Hachemi', age: 45, mail: 'hachemi@gmail.com'},
]

// model
class Person {
    constructor (name, age, mail) {
        this.name = name;
        this.age = age;
        this.mail = mail
    }
}

// controler, router
app.get('/', (req, res) => {
    let arrayUser = [];
    bdd.map(item => {
        let newPerson = new Person (item.name, item.age, item.mail)
        arrayUser.push(newPerson)
    })
    res.render('index', {title: 'Home', message: 'Hello in home!', user: arrayUser})
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', message: 'Hello in about!'})
})

app.get('/blog', (req, res) => {
    res.render('blog', {title: 'Blog', message: 'Hello in blog!'})
})

app.get('/portfolio', (req, res) => {
    res.render('portfolio', {title: 'Portfolio', message: 'Hello in portfolio!'})
})

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact', message: 'Hello in contact!', created: false})
})

app.post('/contact', (req, res) => {
    console.log(req.body)
    bdd.push(req.body)
    res.render('contact', {title: 'Contact', message: 'Hello in contact!', created: true})
})

// rend la vue profile avec parametre dans url du nom
app.get('/profile/:name', (req, res) => {
    let user = bdd.filter(item => item.name === req.params.name)[0] // filtre bdd, récup l'item (ligne de la bdd) avec le même nom 
    res.render('profile', {title: 'Profil', message: 'Hello in profile!', user: user})
})

// n'affiche pas ce qu'il y a en dessous de listen
app.listen(8080, () => {
    console.log('listening')
})