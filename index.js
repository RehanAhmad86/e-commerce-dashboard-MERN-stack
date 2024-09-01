const express = require('express')
const app = express()
require('./DB/Config')
const User = require('./DB/User')
const Product = require('./DB/Product')
const cors = require('cors')
const Jwt = require('jsonwebtoken')
let jwtKey = 'e-commerce'

app.use(express.json())
app.use(cors())

app.post('/signup', async (request, response) => {
    let user = new User(request.body)
    let newUser = await user.save()
    newUser = newUser.toObject()
    delete newUser.password
    Jwt.sign({ newUser }, jwtKey , (error, token) => {
        if (error) {
            response.send("Error occured! Try again later.")
        }
        else {
            response.send({ newUser, auth: token })
        }
    })
})

app.post('/login', async (request, response) => {
    if (request.body.email && request.body.password) {
        const user = await User.findOne(request.body).select('-password')
        if (user) {
            Jwt.sign({ user }, jwtKey, (error, token) => {
                if (error) {
                    response.send("Something went wrong!")
                } else {
                    response.send({ user, auth: token })
                }
            })
        }
        else {
            response.send("User not found!")
        }
    }
    else {
        response.send("Not found!")
    }
})

app.post('/add-product', verifyoken, async (request, response) => {
    const newProduct = new Product(request.body)
    if (newProduct.category.length < 5 ) {
        response.status(400).send({
            // status: 400,
            message: "Write more than 5 words"
        })
    }
    else if (typeof newProduct.name !== 'string'){
        response.status(400).send({
            message: "Please enter name in string not number!"
        })
    }
    else {
        await newProduct.save()
        response.send(newProduct)
    }
})

app.get('/product', verifyoken, async (request, response) => {
    const products = await Product.find()
    if (products.length > 0) {
        response.send(products)
    } else {
        response.send("No products available!")
    }
})

app.delete('/delete/:id', verifyoken, async (request, response) => {
    const deleteProduct = await Product.deleteOne({ _id: request.params.id })
    response.send("Item deleted! ")
})

app.get('/product/:id', verifyoken, async (request, response) => {
    const item = await Product.findOne({ _id: request.params.id })
    if (item) {
        response.send(item)
    } else {
        response.send("No result found!")
    }
})

app.put('/update/:id', verifyoken, async (request, response) => {
    const updateProduct = await Product.updateOne({ _id: request.params.id },
        { $set: request.body })
    if (updateProduct) {
        response.send(updateProduct)
    }
    else {
        response.send("Error Occured!")
    }
})

app.get('/search/:key', verifyoken, async (request, response) => {
    let key = request.params.key
    const searchProduct = await Product.find({
        "$or": [
            { name: { $regex: key, $options: 'i' } },
            { price: { $regex: key } },
            { category: { $regex: key, $options: 'i' } },
            { company: { $regex: key, $options: 'i' } }
        ]
    })
    response.send(searchProduct)
})



function verifyoken(request, response, next) {
    let token = request.headers['authorization'];

    if (token) {
        token = token.trim().split(' ')[1];
        Jwt.verify(token, jwtKey, (error, valid) => {
            if (error) {
                console.error('JWT Verification Error:', error);
                response.status(401).send({ Error: "Invalid token provided!", error });
            } else {
                next();
            }
        });
    } else {
        response.status(403).send("Token is required in the Authorization header!");
    }
}


app.listen(5000)
