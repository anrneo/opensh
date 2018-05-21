var express = require('express')
var bodyParser = require('body-parser')
var Corte = require('./models/user')
var Imagen = require('./models/imagenes')
var Matriz = require('./models/matriz')
var Bio = require('./models/biom')
var methodOverride = require('method-override')
var http = require('http')
var fs = require('fs')
var upload_image = require('express-form-data')
var router = express.Router()
var app = express()
var server = http.Server(app)

app.use(upload_image.parse({keepExtensions:true}))
app.use('/public', express.static('public'))
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.set('view engine', 'pug')


var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
    ip   = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

app.get('/', function(req, res){
	Corte.find({preparacion:undefined}).sort({extendido:1}).then(function(datos){
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
			res.render('app/home',{datos,pro,cor,tot})
			
			})
		})
	})
})

app.get('/bio', function(req, res){
	res.render('app/bio')
})

app.get('/borrar_bio', function(req, res){
	Bio.find().then((ok)=>{
		for(i in ok){
			Bio.update({operario:ok[i].operario},{$set:{valor1:0, valor2:0, valor3:0, valor4:0}}).then(()=>{})
		}
		Bio.find().then((dat)=>{
			res.send({dat})
		})
	})
})

app.post('/dat_bio', (req,res)=>{
	var valor=req.body.valor/(50000/4)*100
		/*if(req.body.etapa==1){
			var bio = new Bio({
				operario:req.body.operario,
				})
				bio.save().then((ok)=>{
					console.log(ok);
					
				})
			}*/
			if(req.body.etapa==1){
				Bio.update({operario:req.body.operario},
					{$set:{valor1: valor.toFixed(2), valor2:0, valor3:0, valor4:0}}).then((ok)=>{
						Bio.find().then((dat)=>{
							res.send({dat})
						})								
					})
				}
			if(req.body.etapa==2){
				Bio.update({operario:req.body.operario},
					{$set:{valor2: valor.toFixed(2), valor3:0, valor4:0}}).then((ok)=>{
						Bio.find().then((dat)=>{
							res.send({dat})
						})								
					})
				}
				if(req.body.etapa==3){
					Bio.update({operario:req.body.operario},
						{$set:{valor3: valor.toFixed(2), valor4:0}}).then((ok)=>{
							Bio.find().then((dat)=>{
								res.send({dat})
							})								
						})
						}
					if(req.body.etapa==4){
						Bio.update({operario:req.body.operario},
							{$set:{valor4: valor.toFixed(2)}}).then((ok)=>{
								Bio.find().then((dat)=>{
									res.send({dat})
								})								
							})
						}

})

app.get('/matriz', function(req, res){
	res.render('matriz')
})

app.post('/dat_matriz', function(req, res){
	var	f = new Date(req.body.fechai)
		fe = f.getTime()
		x = new Date(fe+1000*3600*6)
	var	f = new Date(req.body.fechaf)
		fe = f.getTime()
		y = new Date(fe+1000*3600*6)
	//var x =new Date(req.body.fechai)
	//var y =new Date(req.body.fechaf)
	Matriz.find({}).then(function(dat){
		Corte.aggregate([{$match:{preparacion:{$exists:true}}},
		{$group:{_id:"$id_pre", suma:{$sum:'$factu'}, sum_uds:{$sum:'$uds'}}}]).then(function(to){
			for(i in dat){
			var z =dat[i].dia
			var me = Number(z.getUTCFullYear().toString()+z.getUTCMonth().toString()+z.getUTCDate().toString())
			for(j in to){
				var w = Number(to[j]._id)
				if(me==w){Matriz.findOneAndUpdate({_id:dat[i]._id}, 
				{ $set: {fact: to[j].suma, suma_uds: to[j].sum_uds ,util:to[j].suma-dat[i].costot} }).then(function(ok){})
				}
			}}
			Matriz.find({dia:{$gte:x,$lte:y}}).sort({dia:1}).then(function(matriz){
			var extras=0, cos_ext=0, cos_mod=0, fact=0, costot=0, util=0, suma_ud=0
			for(i in matriz){
				extras += matriz[i].extras
				cos_ext += matriz[i].cos_ext
				cos_mod += matriz[i].cos_mod
				if(matriz[i].fact !== undefined){fact += matriz[i].fact}
				costot += matriz[i].costot
				if(matriz[i].util !== undefined){util += matriz[i].util} 
				if(matriz[i].suma_uds !== undefined){suma_ud += matriz[i].suma_uds} 
			}
			function numberFormat(numero){
				// Variable que contendra el resultado final
				var resultado = "";
		 
				// Si el numero empieza por el valor "-" (numero negativo)
				if(numero[0]=="-")
				{
					// Cogemos el numero eliminando los posibles puntos que tenga, y sin
					// el signo negativo
					nuevoNumero=numero.replace(/\./g,'').substring(1);
				}else{
					// Cogemos el numero eliminando los posibles puntos que tenga
					nuevoNumero=numero.replace(/\./g,'');
				}
		 
				// Si tiene decimales, se los quitamos al numero
				if(numero.indexOf(",")>=0)
					nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf(","));
		 
				// Ponemos un punto cada 3 caracteres
				for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
					resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado;
		 
				// Si tiene decimales, se lo añadimos al numero una vez forateado con 
				// los separadores de miles
				if(numero.indexOf(",")>=0)
					resultado+=numero.substring(numero.indexOf(","));
		 
				if(numero[0]=="-")
				{
					// Devolvemos el valor añadiendo al inicio el signo negativo
					return "-"+resultado;
				}else{
					return resultado;
				}
			}
			var suma_ud =numberFormat(suma_ud.toString())
				cos_ext =numberFormat(cos_ext.toString())
				cos_mod =numberFormat(cos_mod.toString())
				fact =numberFormat(fact.toString())
				costot =numberFormat(costot.toString())
				util =numberFormat(util.toString())


	res.send({matriz,suma_ud,extras,cos_ext,cos_mod,fact,costot,util})
			})})})
})   

app.get('/new', function(req, res){
	res.render('new')
})

app.get('/mini', function(req, res){
	Imagen.find({}).sort({referencia:1})
    .then(function(ref){
	  res.render('app/mini',{ref})
      })
})

app.post('/imagenes', function(req,res){
	var extension=req.files.archivo.name.split('.').pop()
        var data = {
         referencia: req.body.referencia,
        extension: extension,
        cliente: req.body.cliente}
				
        var imagen = new Imagen(data);
        imagen.save().then(function(us){
          fs.rename(req.files.archivo.path, 'imagenes/'+imagen._id+'.'+extension,(err)=>{})
			Imagen.find().sort({referencia:1})
			.then(function(ref){
		  	res.render('app/mini',{ref})
		  })
		})
})

app.get('/horas', function(req, res){
	
      res.render('horas')
})

app.post('/extras', function(req,res){
	var	f = new Date(req.body.dia)
		fe = f.getTime()
		fec = new Date(fe+1000*3600*6)
		dbus=new Date(fe+1000*3600*6)
		
Matriz.find({dia:dbus}).then((ok)=>{

		for(i in ok){
			
			Matriz.remove({dia:dbus}).then(()=>{})
			}
		
	var x = Number(req.body.ex_dia)
		y =Number(req.body.ex_noche)
		z = Number(req.body.ex_dom)
		w = Number(req.body.rec_noc)
		p = Number(req.body.personas)
		hrs_ex = x+y+z+w
		cos_ex = x*5649+y*7910+z*7910+w*9491
		cos_mo = p*48190+cos_ex
	var matriz=new Matriz({
		dia: fec,
		ex_dia: req.body.ex_dia,
		ex_noche: req.body.ex_noche,
		ex_dom: req.body.ex_dom,
		rec_noc: req.body.rec_noc,
		personas: req.body.personas,
		extras:hrs_ex,
		cos_ext:cos_ex,
		cos_mod:cos_mo,
		costot:Math.floor(cos_mo*1.73)
		})
	matriz.save().then(function(us){
	res.render('horas')
	})
	})
})

app.get('/ref/:id', function(req, res){
	Imagen.findById(req.params.id).then(function(img){
		res.render('app/imgmini',{img})
	})
})

app.get('/signup', function(req, res){
		res.render('signup')
})

app.get('/codesapp', function(req, res){
		res.render('codesapp')
})

app.get('/modus', function(req, res){
	res.render('app/modus')
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
		res.render('app/buscar',{busq})
	})
})

app.get('/all', function(req, res){
	Corte.find({}).sort({fecha:-1})
	.exec((err,busq)=>{
		Matriz.find().then((mat)=>{

		res.render('app/all',{busq,mat})
	})
})
})



app.get('/borrar', function(req,res){
	res.render('app/borrar')
})

app.post('/dat_borrar', function(req, res){
	Corte.find({op:req.body.op}).sort({fecha:-1})
	.exec((err,data)=>{
		if(err) console.log(err);
		res.send({data})
	})
})

app.post('/f_prog/:id', function(req, res){
	var f = new Date(req.body.f_prog)
	Corte.update({_id: req.params.id}, 
	{ $set: { 'fecha': f.toDateString() } }).exec(),
	res.render('app/borrar')
})

app.post('/f_ext/:id', function(req, res){
	var f = new Date(req.body.f_ext)
	Corte.update({_id: req.params.id}, 
	{ $set: { 'extendido': f.toLocaleString() } }).exec(),
		res.render('app/borrar')
})

app.get('/del/:id', (req, res)=>{
	Corte.findOneAndRemove({_id: req.params.id},function(err){
		  if(!err){
			res.render('app/borrar')
		  }else{
			console.log(err)
		  }
		})
})

app.post('/users', function(req, res){
	var cli = req.body.cliente
		ud = Number(req.body.uds)
	var cos_clie = {'clientes':['KIDS','ZUMBA','ASICS','DIDETEXCO','ZUMA BLUE','ARTURO C',
								'POLO','LEONISA','BATA','TERRITORIO','CRYSTAL','COLDWATER','OTROS'],
					'costo':['400','415','550','450','550','540','540','500','540','550','450','550','400']}
	for(x in cos_clie.clientes){
		if(cos_clie.clientes[x]==cli){var cos = Number(cos_clie.costo[x])}
	}
	var f = new Date(req.body.fecha)
	var fe = f.getTime()
	var fec = new Date(fe+1000*3600*6)
	var fac = cos*ud
				var corte=new Corte({op: req.body.op,
						trazo: req.body.trazo,
						ref: req.body.ref,
						cliente: cli,
						uds: req.body.uds,
						modu: req.body.modu,
						est: req.body.est,
						fecha: fec,
						factu: fac
						})
	corte.save().then(function(us){
	res.render('signup')
	})
})

app.post('/extendido', function(req, res){
	var f = new Date()
	Corte.findOneAndUpdate({ op:req.body.extendido, trazo:req.body.t_ex}, 
	{ $set: { extendido: f } }).exec(function(err,ok){
		if(ok==null){
			res.render('app/info',{nom:'Extendedor'})}
		else{
			res.render('new')}
	})
})

app.post('/corte', function(req, res){
	var f = new Date()
	Corte.findOneAndUpdate({ op:req.body.corte,trazo:req.body.t_co}, 
		{ $set: { corte: f }}).exec(function(err,ok){
			if(ok==null){
				res.render('app/info',{nom:'Cortador'})}
			else{
				res.render('new')}
	})
})

app.post('/tiqueteo', function(req, res){
	var f = new Date()
	Corte.findOneAndUpdate({ op:req.body.tiqueteo, trazo:req.body.t_ti },
		 { $set: { tiqueteo: f}}).exec(function(err,ok){
			if(ok==null){
				res.render('app/info',{nom:'Tiqueteador'})}
			else{
				res.render('new')}
		})
})

app.post('/preparacion', function(req, res){
	var f = new Date()
	var fe = f.getTime()
	var fec = new Date(fe-1000*3600*5)
	var me = fec.getUTCFullYear().toString()+fec.getUTCMonth().toString()+fec.getUTCDate().toString()
	Corte.findOne({op:req.body.preparacion, trazo:req.body.t_pr}).exec((err,ok)=>{
		if(ok==null){
			res.render('app/info',{nom:'Preparador'})
		}else if(ok.preparacion!==undefined){
			res.render('new',{data:'not'})	
		}else(Corte.findByIdAndUpdate({_id:ok._id},{$set: {preparacion:f, id_pre:me}}).then((us)=>{
			res.render('new')
		}))
	})
})

app.post('/estampado', function(req, res){
	var f = new Date()
	Corte.findOneAndUpdate({ op:req.body.estampado, trazo:req.body.t_es }, 
		{ $set: { estampado: f }}).exec(function(err,ok){
			if(ok==null){
				res.render('app/info',{nom:'Loteador'})}
			else{
				res.render('new')}
		})
})

app.listen(port, ip);
console.log('Server running on:' , ip, port);	


