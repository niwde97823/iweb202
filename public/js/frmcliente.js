var cli=new Array();
var fila=-1; //la fila seleccionada
var reg; //La fila a guardar
function guardar()
{	data=validar();
	id=parseInt($('#cliente_id').html())
	url="/clientes/save";
	op=1;
	if(id>0)
	{	url="/clientes/update";
		op=2;
	}
	if(data!="")
	{	$.ajax(
		{	type:'post',
			url:url,
			data:data,
			success:function(html)
			{	
				if(html>0)
				{	
					$('#cliente_id').html(html);
					$('#msg').html("El registro se guardó exitosamente...");
					if(op==2)
					{	cli[fila].id=reg[0];
						cli[fila].dni=reg[1];
						cli[fila].apellidos=reg[2];
						cli[fila].nombres=reg[3];
						cli[fila].fechanac=reg[4];
						cli[fila].clave=reg[5];
						//cli.splice(fila,1,reg);
						console.table(cli);
						crearTabla();
					}
					else
					{	
						ncli={id:html,dni:reg[1],apellidos:reg[2],nombres:reg[3],fechanac:reg[4	],clave:reg[5]};
						cli.push(ncli);
						crearTabla();
					}
				}
				else
					$('#msg').html("El registro no pudo guardarse...");
			}
		});
	}
}
function validar()
{	id=$('#cliente_id').html();
	dni=$('#dni').val();
	ape=$('#ape').val();
	nom=$('#nom').val();
	fec=$('#fec').val();
	cla=$('#cla').val();
	cla1=$('#cla1').val();
	v=0;cad="";
	if(dni=="")
	{	v=1;
		$('#dni').attr("class","form-control error");
	}
	else
		$('#dni').attr("class","form-control");
	if(ape=="")
	{	v=1;
		$('#ape').attr("class","form-control error");
	}
	else
		$('#ape').attr("class","form-control");
	if(nom=="")
	{	v=1;
		$('#nom').attr("class","form-control error");
	}
	else
		$('#nom').attr("class","form-control");
	if(fec=="")
	{	v=1;
		$('#fec').attr("class","form-control error");
	}
	else
		$('#fec').attr("class","form-control");
	if(cla=="")
	{	v=1;
		$('#cla').attr("class","form-control error");
	}
	else
		$('#cla').attr("class","form-control");
	if(cla1=="")
	{	v=1;
		$('#cla1').attr("class","form-control error");
	}
	else
	{	if(cla!=cla1)
		{	v=1;
			$('#msg').html("La clave no coincide...")
		}
		else
			$('#cla1').attr("class","form-control");
	}
	datos="";
	if(v==0)
	{	//Los datos se ingresaron correctamente
		datos="id="+id+"&dni="+dni+"&apellidos="+ape+"&nombres="+nom+"&fechanac="+fec+"&clave="+cla+"&accion=guardar";
	}
	reg=new Array(id,dni,ape,nom,fec,cla);
	//alert(reg);
	return datos;
}
function buscarxdni()
{	dni=$('#dni').val();
	$.ajax({
		type:'post',
		url:'/clientes/buscarxdni',
		data:"dni="+dni,
		success:function(html)
		{	cli=html;
			showDatos(0);		
		}
	});
}

function showDatos(row)
{	$('#cliente_id').html(cli[row].id);
	$('#dni').val(cli[row].dni);
	$('#ape').val(cli[row].apellidos);
	$('#nom').val(cli[row].nombres);
	//alert(cli[row].fechanac);
	fec=new Date(cli[row].fechanac);
	mes=fec.getMonth()+1;
	nfec=fec.getFullYear()+"-"+mes+"-"+fec.getDate();
	//$('#fec').val(cli[row].fechanac);
	$('#fec').val(nfec);
	fila=row;
}

function eliminar()
{	id=$('#cliente_id').html();
	if(confirm("Eliminar el registro..."))
	{	$.ajax({
			type:'post',
			url:'/clientes/remove',
			data:'id='+id,
			success:function(html)
			{	//alert(html);
				$('#msg').html("Registro eliminado exitosamente...");
				cli.splice(fila,1);
				crearTabla();
				fila=-1;
			}
		});
	}
}

function buscar()
{	campo=$('#campo').val();
	operador=$('#operador').val();
	valor=$('#valor').val();	
	//datos="campo="+campo+"&operador="+operador+"&valor="+valor+"&inicio="+inicio+"&total="+total+"&accion=buscar";
	datos="campo="+campo+"&operador="+operador+"&valor="+valor;
	$.ajax({
		type:'post',
		url:'/clientes/buscar',
		data:datos,
		success:function(html)
		{	
			cli=html;
			console.table(cli);
			crearTabla();		
		}
	});
}
function buscarP(inicio,total)
{	campo=$('#campo').val();
	operador=$('#operador').val();
	valor=$('#valor').val();
	datos="campo="+campo+"&operador="+operador+"&valor="+valor+"&inicio="+inicio+"&total="+total+"&accion=buscar";
	$.ajax({
		type:'post',
		url:'../controllers/ccliente.php',
		//dataType:'json',
		data:datos,
		success:function(html)
		{	
			cli=html;
			crearTabla();		
		}
	});
}

function crearTabla()
{	nc=cli.length;
	table="<table class='table'><tr><th>No</th><th>DNI</th><th>Apellidos</th><th>Nombres</th><th>Acci&oacute;n</th></tr>";
	c=1;
	for(i=0;i<nc;i++)
	{
		table+="<tr><td>"+c+"</td><td>"+cli[i].dni+"</td><td>"+cli[i].apellidos+"</td><td>"+cli[i].nombres+"</td><td><button class='btn btn-primary' onclick='showDatos("+i+")'>E</button> <button class='btn btn-danger' onclick='showDatos("+i+");eliminar();'>X</button></td></tr>";
		c++;
	}
	table+="</table>";
	$('#results').html(table);
}
function getTotalRegs()
{
	campo=$('#campo').val();
	operador=$('#operador').val();
	valor=$('#valor').val();
	datos="campo="+campo+"&operador="+operador+"&valor="+valor+"&accion=totalRegs";
	$.ajax({
		type:'post',
		url:'/clientes/getTotalRegs',
		data:datos,
		success:function(html)
		{	console.table(html.n);
			tr=html.n; //Total de registros
			paginar(tr);
			$('#tregs').html(html);
		}
	});
}
function paginar(total)
{	tamanho=$('#tamanho').val(); //Tamanho de paginar
	npag=Math.ceil(total/tamanho);
	//alert(total+" "+tamanho+" "+npag);
	html="";
	ini=0;
	for(i=1;i<=npag;i++)
	{
		html+="<a href='#' onclick='buscar("+ini+","+tamanho+")'>"+i+"</a>&nbsp;&nbsp;&nbsp;";
		ini+=tamanho;
	}
	$('#footer').html(html);
	//buscar(0,tamanho);
}




