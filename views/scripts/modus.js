$(document).ready(function(){
    //GET/READ
    $('#mod3').on('click', function(){
        $.ajax({
            url:'/mod3',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })
        
    })
    $('#mod4').on('click', function(){
        $.ajax({
            url:'/mod4',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })
        
    })
    $('#mod7').on('click', function(){
        $.ajax({
            url:'/mod7',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })   
    })
    $('#mod10').on('click', function(){
        $.ajax({
            url:'/mod10',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })
    })
    $('#mod11').on('click', function(){
        $.ajax({
            url:'/mod11',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })
        
    })
    $('#mod13').on('click', function(){
        $.ajax({
            url:'/mod13',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                    response.m1[i].fecha=f.toLocaleDateString()
                        if(response.m1[i].extendido==undefined){var j = ''
                        response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                            response.m1[i].extendido=f.toLocaleString()}
                        if(response.m1[i].corte==undefined){var j = ''
                            response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                                response.m1[i].corte=f.toLocaleString()}
                        if(response.m1[i].tiqueteo==undefined){var j = ''
                                response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                    response.m1[i].tiqueteo=f.toLocaleString()}
                        }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        }) 
    })
    $('#est').on('click', function(){
        $.ajax({
            url:'/est',
            contentType: 'application/json',
            success:function(response){
                for(i in response.m1){var f = new Date(response.m1[i].fecha)
                response.m1[i].fecha=f.toLocaleDateString()
                    if(response.m1[i].extendido==undefined){var j = ''
                    response.m1[i].extendido=j}else{var f = new Date(response.m1[i].extendido)
                        response.m1[i].extendido=f.toLocaleString()}
                    if(response.m1[i].corte==undefined){var j = ''
                        response.m1[i].corte=j}else{var f = new Date(response.m1[i].corte)
                            response.m1[i].corte=f.toLocaleString()}
                    if(response.m1[i].tiqueteo==undefined){var j = ''
                            response.m1[i].tiqueteo=j}else{var f = new Date(response.m1[i].tiqueteo)
                                response.m1[i].tiqueteo=f.toLocaleString()}
                    }
                var tbodyEl = $('tbody')
                tbodyEl.html('')  
                response.m1.forEach(function(product) {
                    tbodyEl.append('\
                    <tr>\
                        <td class="id">'+product.op+'</td>\
                        <td class="id">'+product.trazo+'</td>\
                        <td class="id">'+product.cliente+'</td>\
                        <td class="id">'+product.ref+'</td>\
                        <td class="id">'+product.uds+'</td>\
                        <td class="id">'+product.modu+'</td>\
                        <td class="id">'+product.fecha+'</td>\
                        <td class="id">'+product.extendido+'</td>\
                        <td class="id">'+product.corte+'</td>\
                        <td class="id">'+product.tiqueteo+'</td>\
                    </tr>\
                    ')
                })
                $('#tit').empty()
                $('#tit').append(response.tit)
                $('#uds').empty()
                $('#uds').append('Uds programadas: '+response.pro+'   --- Uds en corte: '+response.cor+'  --- Uds totales: '+response.tot   )

            }
        })
        
    })

})