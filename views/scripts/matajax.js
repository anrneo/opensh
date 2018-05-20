$(document).ready(function(){
    //GET/READ
    /*$('#getMatriz').on('click', function(){
        $.ajax({
            url:'/products',
            contentType: 'application/json',
            success:function(response){
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.products.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product._id+'</td>\
                        <td><input type="text" class="name" value="'+product.dia+'"></td>\
                        <td><input type="text" class="date" value="'+product.ex_dia+'"></td>\
                        <td>\
                            <button class="update-button">UPDATE/PUT</button>\
                            <button class="delete-button">DELETE</button>\
                        </td>\
                    </tr>\
                    ')
                });
                
            }
        })
        
    })*/

    $('#dat_mat').on('submit', function(event){
        event.preventDefault()
        var fecha_i = $('#fecha_i')
        var fecha_f = $('#fecha_f')
        $.ajax({
            url:'/dat_matriz',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({fechai: fecha_i.val(),fechaf: fecha_f.val()}),
            success:function(response){
                for(i in response.matriz){var f = new Date(response.matriz[i].dia)
                    response.matriz[i].dia=f.toLocaleDateString()
                }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.matriz.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.dia+'</td>\
                        <td class="id">'+product.suma_uds+'</td>\
                        <td class="id">'+product.extras+'</td>\
                        <td class="id">'+product.cos_ext+'</td>\
                        <td class="id">'+product.cos_mod+'</td>\
                        <td class="id">'+product.fact+'</td>\
                        <td class="id">'+product.costot+'</td>\
                        <td id="'+product._id+'" style="text-align: right">'+product.util+'</td>\
                    </tr>\
                    ')
                })
                $('#t1').empty()
                $('#t1').append(response.extras+' Hrs')
                $('#t2').empty()
                $('#t2').append('$ '+response.cos_ext)
                $('#t3').empty()
                $('#t3').append('$ '+response.cos_mod)
                $('#t4').empty()
                $('#t4').append('$ '+response.fact)
                $('#t5').empty()
                $('#t5').append('$ '+response.costot)
                $('#t6').empty()
                $("#t6").append('$ '+response.util)
                $('#t7').empty()
                $("#t7").append(response.suma_ud+' Uds')
                for(i in response.matriz){
                    var id ='#'+response.matriz[i]._id
                    if(response.matriz[i].util<0){$(id).addClass('th2')}
                     else if(response.matriz[i].util>0){$(id).addClass('th3')}
                     else{$(id).addClass('')}
                }
                var w =response.util.toString().slice(0,1)
                if(w=='-'){
                    $('#t6').addClass('th2')
                 }else{$('#t6').addClass('th3')}
            }
        })
    })
    $('#dat_borrar').on('submit', function(event){
        event.preventDefault()
        var op = $('#op')
        $.ajax({
            url:'/dat_borrar',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({op: op.val()}),
            success:function(response){
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.data.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product._id+'</td>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">\
                            <form action="/f_prog/'+product._id+'" method="POST">\
                                <input type="date" name="f_prog" placeholder="aaaa/mm/dd" id="datborrar">\
                                <input type="submit" value="Actualizar" id="btn" class="btn btn-info">\
                            </form>\
                        </td>\                        <td class="id">\
                            <form action="/f_ext/'+product._id+'" method="POST">\
                                <input type="date" name="f_ext" placeholder="aaaa/mm/dd" id="datborrar">\
                                <input type="submit" value="Actualizar" id="btn" class="btn btn-info">\
                            </form>\
                        </td>\
                        <td class="id"><a href="/del/'+product._id+'">Eliminar</a></td>\
                    </tr>\
                    ')
                })
            }
        })
    })
    //CREATE/POST
    $('#create-form').on('submit', function(event){
        event.preventDefault()
        var createInput = $('#create-input')
        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({name: createInput.val()}),
            success: function(response){
                console.log(response);
                createInput.val('')
                $('#get-button').click()
                
              }

        })
    })

    //UPDATE/PUT
    $('table').on('click', '.update-button', function(){
        var rowEl = $(this).closest('tr')
        var id = rowEl.find('.id').text()
        var newName = rowEl.find('.name').val()

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({newName: newName}),
            success: function(response){
                console.log(response);
                $('#get-button').click()
                
            }
        })
    })

    //DELETE
    $('table').on('click', '.delete-button', function(){
        var rowEl = $(this).closest('tr')
        var id = rowEl.find('.id').text()
        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
                $('#get-button').click()
                
            }
        })
    })
})