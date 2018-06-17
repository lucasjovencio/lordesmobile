var gemas = [5,0,0,0,70,0,130,300,650,1000,1500,4400,10000,40000];
function verifica_tr(){
    let table = $('table.table-vel');
    let i = 0;
    let dados = [0,0,0]; // quantidade , gemas , tempo
    table.find('tbody > tr').each(function() {

        let valor = $(this).find('td').eq(2).text();
        let gema=0;
        let tempo=0;
        let valor2 = parseInt(valor);
        if (valor2<=0 || valor=='') {
          $(this).hide();
        }else{
            gema = $(this).find('td').eq(4).text();
            tempo = $(this).find('td').eq(6).find('span').text();
            gema = parseInt(gema);
            tempo = parseInt(tempo);
            let aux1 = parseInt(dados[0]);
            let aux2 = parseInt(dados[1]);
            let aux3 = parseInt(dados[2]);
            dados[0]= aux1+valor2;
            dados[1]= aux2+gema;
            dados[2]= aux3+tempo;
            $(this).show();
        }
    });
    if(dados[0]>0){
        $("#total-td-vel").html(dados[0]);
        $("#total-td-gem-vel").html(dados[1]);
        $("#total-td-temp-vel").html(converte_tempo(dados[2]));
        
        $("#tr-total-val").show();
    }else{
        $("#tr-total-val").hide();
    }

}
var id_fonte=0;
function removerFonte(id){
    $("#fonte-add-"+id).remove();
}
function adicionarFonte(){

    let html = '<div id="fonte-add-'+id_fonte+'"'+
        '<div class="pure-g">';
        if (id_fonte==0){
            html +='<hr class="hr-fonte-pontuacao">';
        }
    html += '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tipo de Fonte</label>'+
                '<select id="tipo-fonte-'+id_fonte+'" class="pure-u-23-24">'+
                    '<!--<option value="1">Fundir Pactos</option>-->'+
                    '<option value="2">Construção</option>'+
                    '<option value="3">Pesquisa</option>'+
                    '<!--<option value="4">Tropa</option>-->'+
                '</select>'+
            '</div>'+
            
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Peso da Fonte</label>'+
                '<input id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24" type="number" placeholder="0" min="0" max="20000">'+
            '</div>'+
            
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Poder Recebido</label>'+
                '<input id="poder-recebido-'+id_fonte+'" class="pure-u-23-24" type="number" step="any" min="0" placeholder="0">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Real</label>'+
                '<input id="tempo-real-'+id_fonte+'" class="pure-u-23-24" type="text" step="any" min="0" placeholder="0">'+
            '</div>'+
            '<div class="pure-u-1-1 pure-u-md-1-1">'+
                '<label for="min">&emsp;</label>'+
                '<button class="pure-button" onclick="removerFonte('+id_fonte+');return false;">'+
                    '<i class="fas fa-minus-square"></i>'+
                    'Remover fonte de pontuação'+
                '</button>'+
            '</div>'+
        '<hr class="hr-fonte-pontuacao">'+
        '</div>'+
    '</div>';
    $("#html-fonte").append(html);
        
    id_fonte +=1;
}
function check_td_danger(reset=1){
    let table = $('table.table-vel');
    let i = 0;
    let dados = [0,0,0,0]; // 

    if(reset){
        table.find('tbody > tr').each(function() {
            $(this).find('td').eq(2).html('');
            $(this).find('td').eq(4).html('');
            $(this).find('td').eq(6).html('');
            $(this).find('td').eq(8).html('');
        });
    }else{
        table.find('tbody > tr').each(function(){
            let valor = $(this).find('td').eq(2).text();
            if (valor=='') {
                $(this).hide();
            }else{
                $(this).show();
            }
        });
    }

}

function calculo_dano_monstro(valorInicial,qtnAtaque,vidaInitial,ataqConseq){
    let tabelaDano = [0,14,24.5,35.5,47,59];
    check_td_danger();
    if(ataqConseq){
        for(let i=1;i<=qtnAtaque;i++){
            $("#atac-m-"+i).html('#');
            $("#dan-m-"+i).html(valorInicial);
            vidaInitial=parseFloat(vidaInitial).toFixed(2);
            $("#vida-m-"+i).html(vidaInitial);
            vidaInitial=vidaInitial-valorInicial;
            vidaInitial = vidaInitial <=0 ? 0 : vidaInitial;
            $("#vida-mm-"+i).html(vidaInitial);
            valorInicial+=valorInicial;
            
        }
    }else{
        for(let i=1;i<=qtnAtaque;i++){
            if(i==1){
                $("#atac-m-"+i).html(tabelaDano[(i-1)]);
                $("#dan-m-"+i).html(valorInicial);
                $("#vida-m-"+i).html(vidaInitial);
                vidaInitial=vidaInitial-valorInicial;
                vidaInitial=parseFloat(vidaInitial);
                vidaInitial = vidaInitial.toFixed(2);
                $("#vida-mm-"+i).html(vidaInitial);
            }else{
                let valT = tabelaDano[(i-1)];
                let porcento = parseFloat(valT)/parseFloat(valorInicial);
                porcento = porcento.toFixed(1);
                let porcentM = parseFloat(valorInicial) + parseFloat(porcento);
                porcentM = porcentM.toFixed(2);

                $("#atac-m-"+i).html(tabelaDano[(i-1)]);
                $("#dan-m-"+i).html(porcentM);
                vidaInitial=parseFloat(vidaInitial);
                vidaInitial = vidaInitial.toFixed(2);
                $("#vida-m-"+i).html(vidaInitial);
                vidaInitial=parseFloat(vidaInitial-porcentM);
                vidaInitial = vidaInitial.toFixed(2);
                $("#vida-mm-"+i).html(vidaInitial);
                valorInicial=valorInicial+porcentM;
            }
        }
    }
    check_td_danger(0);
}
function converte_tempo(valor){
    let minutos = valor*1;
    let horas   =0;
    let dias    =0;
    let string='';
    if(minutos>=60){
        horas = parseInt(minutos/60);
        minutos = minutos%60; 
        // horas
        if(horas>=24){
            dias = parseInt(horas/24);
            horas = horas%24;
            minutos = minutos%60;
            console.log(horas);
            if(dias>1 && horas>1 && minutos>1){
                string = dias+" Dias "+horas+" Hrs "+minutos+" mins";
            }
            else if(dias>1 && horas==1 && minutos>1){
                string = dias+" Dias "+horas+" Hr "+minutos+" mins";
            }
            else if(dias>1 && horas==1 && minutos==1){
                string = dias+" Dias "+horas+" Hr "+minutos+" min";
            }
            else if(dias>1 && horas>1 && minutos==0){
                string = dias+" Dias "+horas+" Hrs";
            }

            else if(dias==1 && horas>1 && minutos>1){
                string = dias+" Dia "+horas+" Hrs "+minutos+" mins";
            }
            else if(dias==1 && horas==1 && minutos==1){
                string = dias+" Dia "+horas+" Hr "+minutos+" min";
            }
            else if(dias==1 && horas==1 && minutos>1){
                string = dias+" Dia "+horas+" Hr "+minutos+" min";
            }
            else if(dias==1 && horas==0 && minutos>1){
                string = dias+" Dia "+minutos+" min";
            }
            else if(dias==1 && horas>1 && minutos==0){
                string = dias+" Dia "+horas+" Hrs";
            }
            else{
                if(dias==1){
                    string = dias+" Dia";
                }else{
                    string = dias+" Dias";
                }
            }
        }else{
            if(horas>1 && minutos>1){
                string = horas+" Hrs "+minutos+" mins";
            }
            else if(horas>1 && minutos==1){
                string = horas+" Hrs "+minutos+" min";
            }
            else if(horas==1 && minutos>1){
                string = horas+" Hr "+minutos+" mins";
            }
            else if(horas==1 && minutos==1){
                string = horas+" Hr "+minutos+" min";
            }else{
                string = horas+" Hr";
            }
        }
    }else{
        if(minutos==1){
            string = minutos+" Minuto";
        }else{
            string = minutos+" Minutos";
        }
    }
    return string;
}
$(document).ready(function(){
    $("#num-1").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*1);
        string+="<span class='oculta-span'>"+valor*1+"</span>";
        $("#td-vel-1").html(textoDigitado);
        $("#td-gem-1").html(valor*5);
        $("#td-tempo-1").html(string);
        verifica_tr();
    });
    $("#num-3").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*3);
        string+="<span class='oculta-span'>"+valor*3+"</span>";
        $("#td-vel-3").html(textoDigitado);
        $("#td-gem-3").html('0');
        $("#td-tempo-3").html(string);
        verifica_tr();
    });
    $("#num-5").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*5);
        string+="<span class='oculta-span'>"+valor*5+"</span>";
        $("#td-vel-5").html(textoDigitado);
        $("#td-gem-5").html('0');
        $("#td-tempo-5").html(string);
        verifica_tr();
    });
    $("#num-10").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*10);
        string+="<span class='oculta-span'>"+valor*10+"</span>";
        $("#td-vel-10").html(textoDigitado);
        $("#td-gem-10").html('0');
        $("#td-tempo-10").html(string);
        verifica_tr();
    });
    $("#num-15").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*15);
        string+="<span class='oculta-span'>"+valor*15+"</span>";
        $("#td-vel-15").html(textoDigitado);
        $("#td-gem-15").html(valor*70);
        $("#td-tempo-15").html(string);
        verifica_tr();
    });

    $("#num-30").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*30);
        string+="<span class='oculta-span'>"+valor*30+"</span>";
        $("#td-vel-30").html(textoDigitado);
        $("#td-gem-30").html('0');
        $("#td-tempo-30").html(string);
        verifica_tr();
    });

    $("#num-60").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*60);
        string+="<span class='oculta-span'>"+valor*60+"</span>";
        $("#td-vel-60").html(textoDigitado);
        $("#td-gem-60").html(valor*130);
        $("#td-tempo-60").html(string);
        verifica_tr();
    });

    $("#num-300").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*180);
        string+="<span class='oculta-span'>"+valor*180+"</span>";
        $("#td-vel-300").html(textoDigitado);
        $("#td-gem-300").html(valor*800);
        $("#td-tempo-300").html(string);
        verifica_tr();
    });

    $("#num-800").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*480);
        string+="<span class='oculta-span'>"+valor*480+"</span>";
        $("#td-vel-800").html(textoDigitado);
        $("#td-gem-800").html(valor*650);
        $("#td-tempo-800").html(string);
        verifica_tr();
    });
    $("#num-1500").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*900);
        string+="<span class='oculta-span'>"+valor*900+"</span>";
        $("#td-vel-1500").html(textoDigitado);
        $("#td-gem-1500").html(valor*1000);
        $("#td-tempo-1500").html(string);
        verifica_tr();
    });
    $("#num-240").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*1440);
        string+="<span class='oculta-span'>"+valor*1400+"</span>";
        $("#td-vel-240").html(textoDigitado);
        $("#td-gem-240").html(valor*1500);
        $("#td-tempo-240").html(string);
        verifica_tr();
    });
    $("#num-3000").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*4320);
        string+="<span class='oculta-span'>"+valor*4320+"</span>";
        $("#td-vel-3000").html(textoDigitado);
        $("#td-gem-3000").html(valor*4400);
        $("#td-tempo-3000").html(string);
        verifica_tr();
    });
    $("#num-700").on("input", function(){
        var textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*10080);
        string+="<span class='oculta-span'>"+valor*10080+"</span>";
        $("#td-vel-700").html(textoDigitado);
        $("#td-gem-700").html(valor*10000);
        $("#td-tempo-700").html(string);
        verifica_tr();
    });
    $("#num-30000").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*43200);
        string+="<span class='oculta-span'>"+valor*43200+"</span>";
        $("#td-vel-30000").html(textoDigitado);
        $("#td-gem-30000").html(valor*40000);
        $("#td-tempo-30000").html(string);
        verifica_tr();
    });
    
    $("#danger").on("input", function(){
        let valorInicial        = $(this).val();
        let qtnAtaque           = $('#qtn').val();
        let vidaInitial         = $('#qtn-vida').val();
        let ataqConseq          = $('#atac-con').val();
        
        valorInicial = valorInicial   == '' ? 0 : parseFloat(valorInicial);
        qtnAtaque = qtnAtaque   == '' ? 1 : parseInt(qtnAtaque);
        vidaInitial = vidaInitial == '' ? 100 : parseInt(vidaInitial);
        ataqConseq = parseInt(ataqConseq);
        calculo_dano_monstro(valorInicial,qtnAtaque,vidaInitial,ataqConseq);
        console.log(valorInicial);
        console.log(qtnAtaque);
        console.log(vidaInitial);
        console.log(ataqConseq);
    });

    $("#qtn").on("input", function(){
        let valorInicial        = $('#danger').val();
        let qtnAtaque           = $(this).val();
        let vidaInitial         = $('#qtn-vida').val();
        let ataqConseq          = $('#atac-con').val();
        
        valorInicial = valorInicial   == '' ? 0 : parseFloat(valorInicial);
        qtnAtaque = qtnAtaque   == '' ? 1 : parseInt(qtnAtaque);
        vidaInitial = vidaInitial == '' ? 100 : parseInt(vidaInitial);
        ataqConseq = parseInt(ataqConseq);
        calculo_dano_monstro(valorInicial,qtnAtaque,vidaInitial,ataqConseq);
        console.log(valorInicial);
        console.log(qtnAtaque);
        console.log(vidaInitial);
        console.log(ataqConseq);
    });

    $("#qtn-vida").on("input", function(){
        let valorInicial        = $('#danger').val();
        let qtnAtaque           = $('#qtn').val();
        let vidaInitial         = $(this).val();
        let ataqConseq          = $('#atac-con').val();
        
        valorInicial = valorInicial   == '' ? 0 : parseFloat(valorInicial);
        qtnAtaque = qtnAtaque   == '' ? 1 : parseInt(qtnAtaque);
        vidaInitial = vidaInitial == '' ? 100 : parseInt(vidaInitial);
        ataqConseq = parseInt(ataqConseq);
        calculo_dano_monstro(valorInicial,qtnAtaque,vidaInitial,ataqConseq);
        console.log(valorInicial);
        console.log(qtnAtaque);
        console.log(vidaInitial);
        console.log(ataqConseq);
    });

    $("#atac-con").on("input", function(){
        let valorInicial        = $('#danger').val();
        let qtnAtaque           = $('#qtn').val();
        let vidaInitial         = $('#qtn-vida').val();
        let ataqConseq          = $(this).val();
        
        valorInicial = valorInicial   == '' ? 0 : parseFloat(valorInicial);
        qtnAtaque = qtnAtaque   == '' ? 1 : parseInt(qtnAtaque);
        vidaInitial = vidaInitial == '' ? 100 : parseInt(vidaInitial);
        ataqConseq = parseInt(ataqConseq);
        calculo_dano_monstro(valorInicial,qtnAtaque,vidaInitial,ataqConseq);
        console.log(valorInicial);
        console.log(qtnAtaque);
        console.log(vidaInitial);
        console.log(ataqConseq);
    });
});
