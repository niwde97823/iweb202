function guardar()
{	pid=$('#producto_id').html();
	cod=$('#cod').val();
	des=$('#des').val();
	pre=$('#pre').val();
	stk=$('#stk').val();
	datos="pid="+pid+"&cod="+cod+"&des="+des+"&pre="+pre+"&stk="+stk;
	$.ajax({
		type:'post',
		url:'/productos/save',
		data:datos,
		success:function(html)
		{
			alert(html);
		}
	});
}