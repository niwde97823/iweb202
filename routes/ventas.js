exports.frmventa = function(req, res){
  res.render('frmventa',{page_title:""});
};

exports.buscar = function(req, res){

  req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM producto',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
			res.json(rows);
			
        });
		
    });
  
};
/*Guardar una nueva compra*/
exports.guardar = function(req,res)
{
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function (err, connection) 
	{
		var query = connection.query("INSERT INTO compra VALUES(0,'',CURRENT_DATE(),?,?)",[input.total,input.cliente_id],function(err, rows)
        {
          if (err)
            console.log("Error inserting : %s ",err );
			//res.redirect('/customers');
		  compra_id=rows.insertId;
		  dc=input.data;//Los detalles de la compra
		  d=dc.split("/");
		  nd=d.length-1;
		  for(i=0;i<nd;i++)
		  {	  dd=d[i].split("*");	
			  var data1 = {
				id			: 0,
				cantidad	: dd[1],
				compra_id	: compra_id,
				producto_id	: dd[0]
			  };
			  var query1 = connection.query("INSERT INTO detallecompra set ? ",data1, function(err, rows)
			  {
				  if(err)
					  console.log("Error guardando detalle...");
			  });
			  
			  var query2=connection.query("UPDATE producto SET stock=stock - ? ",[dd[1]], function(err, rows)
			  {
				  if(err)
					  console.log("Error actualizando stocks...");
			  });
			  console.log(query1.sql);
		  }
	    });//Fin del query
		console.log(query.sql); //Del primer query
  });
};


/* GET users listing. */


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
    req.getConnection(function (err, connection) {
        var id=input.id;
        var data = {
			dni			: input.dni,
			apellidos   : input.apellidos,
            nombres 	: input.nombres,
            fechanac   	: input.fechanac,
            clave   	: input.clave
        };
        connection.query("UPDATE cliente set ? WHERE id = ? ",[data,id], function(err, rows)
        {
          if (err)
              console.log("Error Updating : %s ",err ); 
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