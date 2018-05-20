$(document).ready(function(){
    $('#dat_bio').on('submit', function(event){
        event.preventDefault()
        var etapa= $('#etapa_bio')
        var valor= $('#valor_bio')
        var operario=$('#operario')
        $.ajax({
            url:'/dat_bio',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({etapa: etapa.val(),valor: valor.val(),operario: operario.val()}),
            success:function(response){
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
            response.dat.forEach((datos) => {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+datos.operario+'</td>\
                        <td class="id">'+datos.valor1+' %</td>\
                        <td class="id">'+datos.valor2+' %</td>\
                        <td class="id">'+datos.valor3+' %</td>\
                        <td class="id">'+datos.valor4+' %</td>\
                    </tr>\
                    ')
                
                })
        }
    })
    })
    $('#borrar_bio').on('click', function(){
        $.ajax({
            url:'/borrar_bio',
            method: 'GET',
            contentType: 'application/json',
            success: function(response){
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
            response.dat.forEach((datos) => {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+datos.operario+'</td>\
                        <td class="id">'+datos.valor1+' %</td>\
                        <td class="id">'+datos.valor2+' %</td>\
                        <td class="id">'+datos.valor3+' %</td>\
                        <td class="id">'+datos.valor4+' %</td>\
                    </tr>\
                    ')
                
                })  
            }
        })
    })
})