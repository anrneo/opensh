var express = require('express')
var bodyParser = require('body-parser')
var Corte = require('./models/user')
var methodOverride = require('method-override')
var http = require('http')
var app = express()
var server = http.Server(app)

app.use('/public', express.static('public'))
app.use(bodyParser.json()) //para peticiones application json
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('view engine', 'pug')

app.get('/', function(req, res){
	Corte.find({preparacion: undefined}).sort({extendido:-1}).then(function(datos){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro=0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				res.render('app1/home1',{datos,pro,cor,tot})
		  
			})
		})
	})
})
app.get('/modus', function(req, res){
	res.render('app1/modu1')
})

app.get('/mod3', function(req, res){
	Corte.find({modu:3,preparacion:undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:3}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro=0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:3}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 3'
	   			res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/mod4', function(req, res){
	Corte.find({'modu':4,preparacion:undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:4}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:4}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 4'
				res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/mod7', function(req, res){
	Corte.find({'modu':7,'preparacion':undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:7}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:7}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 7'
				res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/mod10', function(req, res){
	Corte.find({'modu':10,'preparacion':undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:10}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:10}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 10'
				res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/mod11', function(req, res){
	Corte.find({'modu':11,'preparacion':undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:11}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:11}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 11'
				 res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/mod13', function(req, res){
	Corte.find({'modu':13,'preparacion':undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{preparacion:undefined, extendido:undefined, modu:13}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{preparacion:undefined, modu:13}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'MODULO 13'
				res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.get('/est', function(req, res){
	Corte.find({est:1,estampado:undefined}).sort({extendido:-1}).then(function(m1){
		Corte.aggregate([{$match:{est:1, extendido:undefined, estampado:undefined}},
		{$group:{_id:0, suma:{$sum:'$uds'}}}])
		.then(function(pr){
			if (pr==0){var pro =0}
			else{var pro=pr[0].suma}
			Corte.aggregate([{$match:{est:1,estampado:undefined}},
			{$group:{_id:0, suma:{$sum:'$uds' } }}])
			.then(function(to){
				if(to==0){var tot=0}
				else{var tot=to[0].suma}
				var cor=tot-pro
				var tit = 'ESTAMPADOS EN CORTE'
				res.send({m1,pro,cor,tot,tit})
			})
		})
	})
})

app.post('/buscar', function(req, res){
	Corte.find({'op':req.body.buscar}).sort({fecha:-1})
	.exec((err,busq)=>{
		if(err) console.log(err);
		res.render('app1/buscar1',{busq:busq})
	})
})

app.get('/codesapp', function(req, res){
	res.render('codesapp1')
})

server.listen(9019)
console.log('conectado en servidor 9019')
