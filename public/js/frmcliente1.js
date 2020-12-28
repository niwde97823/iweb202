var cli=new Array();
var fila=-1; //la fila seleccionada
var reg; //La fila a guardar
function guardar()
{	data=validar();
	id=parseInt($('#cliente_id').html())
	url="/clientes/save";
	if(id>0)
		url="/clientes/update";
	if(data!="")
	{	$.ajax(
		{	type:'post',
			url:url,
			data:data,
			success:function(html)
			{	alert(html)
				/*if(html>0)
				{	$('#cliente_id').html(html);
					if(fila>-1)
					{	cli.splice(fila,1,reg);
						crearTabla();
					}
					else
					{	reg[0]=html;
						cli.push(reg);
						crearTabla();
					}
				}
				else
					$('#msg').html(html);*/
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
	return datos;
}
function buscar()
{	campo=$('#campo').val();
	oper=$('#operador').val();
	valor=$('#valor').val();
	datos="campo="+campo+"&oper="+oper+"&valor="+valor;
	$.ajax({
		type:'post',
		url:'/clientes/buscar',
		data:datos,
		success:function(html)
		{	alert(html);
			cli=html;
			//showDatos(0);	
		}
	});
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
	$('#fec').val(cli[row].fechanac);
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
			{	alert(html);
				//$('#msg').html(html);
				/*cli.splice(fila,1);
				crearTabla();
				fila=-1;*/
			}
		});
	}
}
function getmarcas()
{	$.ajax({
		type:'post',
		url:'/clientes/getmarcas',
		data:'accion=getmarcas',
		success:function(html)
		{	showmarcas(html);
		}
	});	
}
function showmarcas(m)
{	nm=m.length;
	html="<select id='marca_nombre' name='marca_nombre'>";
	for(i=0;i<nm;i++)
		html+="<option value='"+m[i].nombre+"'>"+m[i].nombre+"</option>";
	html+="</select>";
	$('#combomarcas').html(html);
}
//anibalf11@gmail.com



