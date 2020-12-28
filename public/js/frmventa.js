var pro;
var car=new Array();
var tot=0;
$('#btn-modal').hide();

function cerrarModal()
{
	//$('#btn-close').trigger("click");
	$('#myModal').modal('toggle');
	
}
function abrirModal()
{	//alert("");
	$('#btn-modal').trigger("click");
}


//////////////////////////////////////////////////
function buscar() //Buscador de productos
{	valor=$('#valor').val();
	$.ajax({
		type:'post',
		url:'/ventas/buscar',
		data:"campo=descripcion&operador=LIKE&valor="+valor+"&accion=buscar",
		success:function(html)
		{	pro=html;
			printDatos();
		}
	});
}
function printDatos()
{	tabla="";
	nc=pro.length;
	for(i=0;i<nc;i++)
	{	
		tabla+="<div class='col-xs-2'><table align='center'><tr><td align='center'><img src='/../imgs/"+pro[i].id+".jpg'></td></tr><tr><td align='center'><b>"+pro[i].descripcion+"</b></td></tr><tr><td align='center'>Precio: S/. "+pro[i].precio+"</td></tr><tr><td align='center'><input type='text' size='2' name='can' onblur='validarstk(this,"+i+")'><button class='btn btn-primary'>+</button></td></tr></table></div>";
	}
	$('#results').html(tabla);
}
function validarstk(obj,fila)
{	//console.log(obj+" "+obj.value)
	v=parseInt(obj.value)
	if(v>parseInt(pro[fila].stock))
		alert("Cantidad excede stock disponible de "+pro[fila][5]+" unidades");
	else
	{	nc=car.length;
		if(nc>0)
		{	s=0;
			for(k=0;k<nc;k++)
			{
				if(pro[fila].id==car[k][0])
						s+=parseInt(car[k][3]);
			}
			//console.log("total ="+s)
			ncan=s+v;
			if(ncan>parseInt(pro[fila].stock))
				alert(v+" u (+) hacen un acumulado de "+ncan+ " lo cual excede stock disponible de "+pro[fila].stock+" u");
			else
				addCarrito(v,fila);	
		}
		else
			addCarrito(v,fila);
	}
	obj.value="";
}
function addCarrito(v,fila)
{	//console.table(pro);
	console.log("cantidad="+v)
	sbt=parseFloat(pro[fila].precio)*v;
	crow=new Array(pro[fila].id,pro[fila].descripcion,pro[fila].precio,v,sbt);
	car.push(crow);
	printCarrito();
	abrirModal();
}
function printCarrito()
{
	nc=car.length;
	html="<table align='center'><tr><th>N°</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Sub-Total</th></tr>";
	c=1;
	tot=0;
	for(i=0;i<nc;i++)
	{
		html+="<tr><th>"+c+"</th><td>"+car[i][1]+"</td><td>"+car[i][2]+"</td><td>"+car[i][3]+"</td><td>"+car[i][4]+"</td><td><button class='btn btn-danger' onclick='borrarFila("+i+")'>X</button></td></tr>";
		tot+=car[i][4];
		c++;
	}
	html+="</table>";
	$('#carrito').html(html);
	
}
function borrarFila(fila)
{
	car.splice(fila,1);
	printCarrito();
}
function comprar(cliente_id)
{	
	datos=getDatosCarrito();
	if(datos!="")
	{	//alert(datos);
	$.ajax({
		type:'post',
		url:'/ventas/guardar',
		data:"data="+datos+"&total="+tot+"&cliente_id="+cliente_id,
		success:function(html)
		{	alert(html);
		}
	});
	}
	
}
function getDatosCarrito()
{	nc=car.length;
	data="";
	if(nc>0)
		for(i=0;i<nc;i++)
			data+=car[i][0]+"*"+car[i][3]+"*"+car[i][4]+"/";
	else
		alert("Debe existir al menos un producto para comprar...")
	return data;
}
function validarCliente()
{	console.log("Empieza la validación... ");
	dni=$('#dni').val();
	clave=$('#clave').val();
	$.ajax({
		type:'post',
		url:'/clientes/validarcliente',
		data:"dni="+dni+"&clave="+clave,
		success:function(html)
		{	//alert(html);
			if(html.length>0)
			{	comprar(html[0].id);
			}
		}
	});
}
//////////////////////////////////////////////////

function limpiar()
{
	$("#dni").val("");
	$("#clave").val("");
}