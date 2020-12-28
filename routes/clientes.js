exports.buscar = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  campo=input.campo;
  oper=input.oper;
  valor=input.valor;
  var cond=campo+" "+oper+" '%"+valor+"%'";
  var sql="SELECT * FROM cliente WHERE "+cond;
  req.getConnection(function(err,connection){
      
        var query = connection.query(sql,[],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
			res.json(rows);
         });
		console.log(query.sql);
    });
  
};

exports.frmcliente = function(req, res){
  res.render('frmcliente',{page_title:""});
};
exports.frmcliente1 = function(req, res){
  res.render('frmcliente1',{page_title:""});
};
/*Guardar un nuevo cliente*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) {
        var data = {
            id			: input.id,
			dni			: input.dni,
			apellidos   : input.apellidos,
            nombres 	: input.nombres,
            fechanac   	: input.fechanac,
            clave   	: input.clave
        };
        var query = connection.query("INSERT INTO cliente set ? ",data, function(err, rows)
        {
          if(err)
             console.log("Error inserting : %s ",err );
		  res.json(rows.insertId);
        });
        console.log(query.sql); //get raw query
		
    });
};
/*Validar cliente*/
exports.validarcliente = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
		dni=input.dni;
		clave=input.clave;
        var query = connection.query('SELECT * FROM cliente WHERE dni=? AND clave=?',[dni,clave],function(err,rows)
        {   if(err)
                console.log("Error Selecting : %s ",err);
			res.json(rows);
        });
		console.log(query.sql);
    });
};
/* GET users listing. */
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM customer',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Customers- UNAM",data:rows});
         });
         
         //console.log(query.sql);
    });
  
};

exports.buscarxdni = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
       var data = {dni: input.dni};
        var query = connection.query('SELECT * FROM cliente WHERE ?',data,function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
			res.json(rows);
         });
		console.log(query.sql);
    });
  
};

exports.buscar = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
       //var data = {dni: input.dni};
	   var camp=input.campo;
	   var oper=input.operador;
	   var valor=input.valor;
	   if(oper=='LIKE')
		   valor="'%"+valor+"%'";
	   var sql="SELECT * FROM cliente WHERE "+camp+" "+oper+" "+valor;
        //var query = connection.query('SELECT * FROM cliente WHERE ?',data,function(err,rows)
		var query = connection.query(sql,[],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
			res.json(rows);
         });
		console.log(query.sql);
    });
  
};

exports.getTotalRegs = function(req, res){
  var input = JSON.parse(JSON.stringify(req.body));
  req.getConnection(function(err,connection){
	var camp=input.campo;
	var oper=input.operador;
	var valor=input.valor;
	var sql="CALL getTotalRegistros('"+camp+"','"+oper+"','"+valor+"')";
	var query = connection.query(sql,[],function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
		res.json(rows[0][0]);
    });
	//console.log(query.sql);
  });
};


exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection)
	{	
		var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
           
         });
         
         //console.log(query.sql);
    }); 
};


exports.update = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) 
	{
        var id=input.id;
        var data = {
			dni			: input.dni,
			apellidos   : input.apellidos,
            nombres 	: input.nombres,
            fechanac   	: input.fechanac,
            clave   	: input.clave
        };
        var query=connection.query("UPDATE cliente set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err ); 
		  res.json(id);
        });
		console.log(query.sql);
    });
};


exports.remove = function(req,res)
{	var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) 
	{
        var id=input.id;
        connection.query("DELETE FROM cliente WHERE id = ? ",[id], function(err, rows)
        {
          if (err)
              console.log("Error Deleting... : %s ",err ); 
        });
		res.json(id);
    });
};
/*++++++++++++++++++++++++++++++++++++++++++++++++++++*/
exports.getmarcas=function(req,res)
{	console.log("Llegamos al server...");
	req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM marca ',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
			res.json(rows);
			
        });
		console.log(query.sql);
    });
};