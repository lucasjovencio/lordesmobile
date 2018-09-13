var gemas = [5,0,0,0,70,0,130,300,650,1000,1500,4400,10000,40000];
var tempo_aceleradores = [0,0,0]; // quantidade , gemas , tempo
var tempo_ace_usado = [0,0,0]; // quantidade , gemas , tempo
var pontu_nece = 0;
$(document).ready(function () {
    applyDatMaskJs();
    $( ".infernal_informacoes_extras" ).addClass( "display-of" );
})
function verifica_tr(){
    let table = $('table.table-vel');
    tempo_aceleradores[0]=0;tempo_aceleradores[1]=0;tempo_aceleradores[2]=0;
    let i = 0;
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
            let aux1 = parseInt(tempo_aceleradores[0]);
            let aux2 = parseInt(tempo_aceleradores[1]);
            let aux3 = parseInt(tempo_aceleradores[2]);
            tempo_aceleradores[0]= aux1+valor2;
            tempo_aceleradores[1]= aux2+gema;
            tempo_aceleradores[2]= aux3+tempo;
            $(this).show();
        }
    });
    if(tempo_aceleradores[0]>0){
        $("#total-td-vel").html(tempo_aceleradores[0]);
        $("#total-td-gem-vel").html(tempo_aceleradores[1]);
        $("#total-td-temp-vel").html(converte_tempo(tempo_aceleradores[2]));
        
        $("#tr-total-val").show();
    }else{
        $("#tr-total-val").hide();
    }

}
function applyDatMaskJs(){
    $.applyDataMask();
}
var id_fonte=0;
var qtd_fonte = 0;
function removerFonte(id){
    $("#fonte-add-"+id).remove();
    qtd_fonte -=1;
    calcula_tempo_infernal();
}
function loadPeso(tipo,id_fonte){
    switch(tipo){
        case 1:
            break;
        case 2:
            return ('<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Peso da Fonte</label>'+
                '<input onkeyup="atualizaTempo(2,'+id_fonte+');return false;" id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="number" placeholder="0" min="0" max="20000">'+
            '</div>');
            break;
        case 3:
            return ('<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Peso da Fonte</label>'+
                '<input onkeyup="atualizaTempo(2,'+id_fonte+');return false;" id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="number" placeholder="0" min="0" max="20000">'+
            '</div>');
            break;
        case 4:
        return ('<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Peso da Fonte</label>'+
                '<select onchange="atualizaTempo(2,'+id_fonte+');return false;" id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'">'+
                    '<option selected value="2">T1</option>'+
                    '<option value="8">T2</option>'+
                    '<option value="24">T3</option>'+
                    '<option value="36">T4</option>'+
                '</select>'+
            '</div>');
            break;
        default:
            break;
    }
    //'<div class="pure-u-1-2 pure-u-md-1-2">'+
    //'<label for="min">Peso da Fonte</label>'+
    //    '<input onkeyup="atualizaTempo(2,'+id_fonte+');return false;" id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="number" placeholder="0" min="0" max="20000">'+
    //'</div>'
}
function definiFormPree(tipo,id_fonte){
    tipo = parseInt(tipo);
    let text;
    switch(tipo){
        case 1:
            break;
        case 2:
            text = '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tipo de Fonte</label>'+
                '<select  id="tipo-fonte-'+id_fonte+'" onchange="definiFormPree(this.value,'+id_fonte+')" class="pure-u-23-24 '+1+'">'+
                    '<option '+ (tipo==0 ? "selected" : ' ') +' value="0">Selecione...</option>'+
                    '<!--<option '+(tipo==1 ? "selected" : ' ')+' value="1">Fundir Pactos</option>-->'+
                    '<option '+(tipo==2 ? "selected" : ' ')+' value="2">Construção</option>'+
                    '<option '+(tipo==3 ? "selected" : ' ')+' value="3">Pesquisa</option>'+
                    '<option '+(tipo==4 ? "selected" : ' ')+' value="4">Tropa</option>'+
                '</select>'+
            '</div>'+
            '<input id="fonte-valicacao-'+id_fonte+'" type="hidden" value="0">'+
            loadPeso(tipo,id_fonte) +

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Poder Recebido</label>'+
                '<input data-mask="000,000" onkeyup="atualizaTempo(3,'+id_fonte+');" data-mask-reverse="true" id="poder-recebido-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" step="any" placeholder="000,000">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Real</label>'+
                '<input onkeyup="atualizaTempo(4,'+id_fonte+');" data-mask="00 D 00:00" data-mask-reverse="true" id="tempo-real-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" placeholder="30 D 23:55">'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button class="pure-u-23-24 pure-button '+1+'" onclick="removerFonte('+id_fonte+');return false;">'+
                    '<i class="fas fa-minus-square"></i>'+
                    'Remover fonte de pontuação'+
                '</button>'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button id="button-check-'+id_fonte+'" class="pure-u-23-24 pure-button '+2+'" onclick="return false;">'+
                    '<i class="fas fa-clock"></i>'+
                '</button>'+
            '</div>';
            break;
        case 3:
            text = '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tipo de Fonte</label>'+
                '<select  id="tipo-fonte-'+id_fonte+'" onchange="definiFormPree(this.value,'+id_fonte+')" class="pure-u-23-24 '+1+'">'+
                    '<option '+ (tipo==0 ? "selected" : ' ') +' value="0">Selecione...</option>'+
                    '<!--<option '+(tipo==1 ? "selected" : ' ')+' value="1">Fundir Pactos</option>-->'+
                    '<option '+(tipo==2 ? "selected" : ' ')+' value="2">Construção</option>'+
                    '<option '+(tipo==3 ? "selected" : ' ')+' value="3">Pesquisa</option>'+
                    '<option '+(tipo==4 ? "selected" : ' ')+' value="4">Tropa</option>'+
                '</select>'+
            '</div>'+
            '<input id="fonte-valicacao-'+id_fonte+'" type="hidden" value="0">'+
            loadPeso(tipo,id_fonte)+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Poder Recebido</label>'+
                '<input data-mask="000,000" onkeyup="atualizaTempo(3,'+id_fonte+');" data-mask-reverse="true" id="poder-recebido-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" step="any" placeholder="000,000">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Real</label>'+
                '<input onkeyup="atualizaTempo(4,'+id_fonte+');" data-mask="00 D 00:00" data-mask-reverse="true" id="tempo-real-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" placeholder="30 D 23:55">'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button class="pure-u-23-24 pure-button '+1+'" onclick="removerFonte('+id_fonte+');return false;">'+
                    '<i class="fas fa-minus-square"></i>'+
                    'Remover fonte de pontuação'+
                '</button>'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button id="button-check-'+id_fonte+'" class="pure-u-23-24 pure-button '+2+'" onclick="return false;">'+
                    '<i class="fas fa-clock"></i>'+
                '</button>'+
            '</div>';
            break;
        case 4:
            text = '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tipo de Fonte</label>'+
                '<select  id="tipo-fonte-'+id_fonte+'" onchange="definiFormPree(this.value,'+id_fonte+')" class="pure-u-23-24 '+1+'">'+
                    '<option '+ (tipo==0 ? "selected" : ' ') +' value="0">Selecione...</option>'+
                    '<!--<option '+(tipo==1 ? "selected" : ' ')+' value="1">Fundir Pactos</option>-->'+
                    '<option '+(tipo==2 ? "selected" : ' ')+' value="2">Construção</option>'+
                    '<option '+(tipo==3 ? "selected" : ' ')+' value="3">Pesquisa</option>'+
                    '<option '+(tipo==4 ? "selected" : ' ')+' value="4">Tropa</option>'+
                '</select>'+
            '</div>'+
            '<input id="fonte-valicacao-'+id_fonte+'" type="hidden" value="0">'+
            loadPeso(tipo,id_fonte)+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Poder Recebido</label>'+
                '<input data-mask="000,000" onkeyup="atualizaTempo(3,'+id_fonte+');" data-mask-reverse="true" id="poder-recebido-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" step="any" placeholder="000,000">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Real</label>'+
                '<input onkeyup="atualizaTempo(4,'+id_fonte+');" data-mask="00 D 00:00" data-mask-reverse="true" id="tempo-real-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" placeholder="30 D 23:55">'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button class="pure-u-23-24 pure-button '+1+'" onclick="removerFonte('+id_fonte+');return false;">'+
                    '<i class="fas fa-minus-square"></i>'+
                    'Remover fonte de pontuação'+
                '</button>'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button id="button-check-'+id_fonte+'" class="pure-u-23-24 pure-button '+2+'" onclick="return false;">'+
                    '<i class="fas fa-clock"></i>'+
                '</button>'+
            '</div>';
            break;
        default:
        break;
    }

    

    $("#form-pree-"+id_fonte).html(text);
    definiPeso(tipo,id_fonte);

}
function definiPeso(tipo,id){
    
    switch(tipo){
        case 1:
            break;
        case 2:
            $("#peso-fonte-"+id).prop('disabled', true);
            $('#peso-fonte-'+id).val(1);
            break;
        case 3:
            $("#peso-fonte-"+id).prop('disabled', true);
            $('#peso-fonte-'+id).val(1);
            break;
        case 4:
            break;
        default:
        break;
    }
    atualizaTempo(0,id);
}
function adicionarFonte(){
    let exeF = "";
    let exeF1 = "";
    let exeF2 = "";
    let exeF3 = "";
    let exeF4 = "";
    let exeF5 = "";
    if(id_fonte==0){
        exeF = "tour-step tour-step-four";
        exeF1 = "tour-step tour-step-five";
        exeF2 = "tour-step tour-step-six";
        exeF3 = "tour-step tour-step-seven";
        exeF4 = "tour-step tour-step-eight";
        exeF5 = "tour-step tour-step-nine";
    }
    let html = '<div id="fonte-add-'+id_fonte+'"'+ 
        '<div class="pure-g" id="form-pree">'+
            '<div id="form-pree-'+id_fonte+'">'+
                '<div class="pure-u">'+
                    '<label for="min">Tipo de Fonte</label>'+
                    '<select  id="tipo-fonte-'+id_fonte+'" onchange="definiFormPree(this.value,'+id_fonte+')" class="pure-u-23-24 '+exeF+'">'+
                        '<option value="0">Selecione...</option>'+
                        '<!--<option value="1">Fundir Pactos</option>-->'+
                        '<option value="2">Construção</option>'+
                        '<option value="3">Pesquisa</option>'+
                        '<option value="4">Tropa</option>'+
                    '</select>'+
                '</div>'+
            '</div>'+
            
        '<hr class="hr-fonte-pontuacao">'+
        '</div>'+
    '</div>';
    $("#html-fonte").append(html);
    
    applyDatMaskJs();
    id_fonte +=1;
    qtd_fonte +=1;
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
            valorInicial = parseFloat(valorInicial).toFixed(2);
            $("#atac-m-"+i).html('#');
            $("#dan-m-"+i).html(valorInicial);
            vidaInitial=parseFloat(vidaInitial).toFixed(2);
            $("#vida-m-"+i).html(vidaInitial);
            vidaInitial=vidaInitial-valorInicial;
            vidaInitial = vidaInitial <=0 ? 0 : parseFloat(vidaInitial).toFixed(2);
            $("#vida-mm-"+i).html(vidaInitial);
            valorInicial=valorInicial+valorInicial;
            
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
                porcento = porcento.toFixed(5);
                let porcentM = parseFloat(valorInicial) + parseFloat(porcento);
                porcentM = porcentM.toFixed(2);

                $("#atac-m-"+i).html(tabelaDano[(i-1)]);
                $("#dan-m-"+i).html(porcentM);
                vidaInitial=parseFloat(vidaInitial);
                $("#vida-m-"+i).html(vidaInitial);
                vidaInitial=parseFloat(vidaInitial-porcentM);
                vidaInitial = vidaInitial <=0 ? 0 : parseFloat(vidaInitial).toFixed(2);
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
function atualizaTempo(tipo,id){
    let tipoFonte = parseInt($('#tipo-fonte-'+id).val());
    let pesoFonte = parseInt($('#peso-fonte-'+id).val());

    let poderRece = parseFloat($('#poder-recebido-'+id).val().replace(',', '.'));
    let tempoReal = $('#tempo-real-'+id).val();
    verifica_tr();
    if(tipoFonte !=0 && pesoFonte !=null && pesoFonte >0 && poderRece && tempoReal.length > 6 && pontu_nece > 1){
        calcula_tempo_infernal();
    }
}
function calcula_tempo_infernal(){
    tempo_ace_usado[2]=tempo_aceleradores[2];
    let pontu_aux = pontu_nece;
    let pontuvali=0;
    let prosseguir = 1;
    for(let i=0; i<id_fonte;i++){
        let tempo = $("#tempo-real-"+i).val();
        if(tempo==null || tempo==''){
            prosseguir =0;
            continue;
        }
        else{
            prosseguir = 1;
            tempo = tempo.split(' ');
            let dia = (parseInt(tempo[0]))*1440;
            tempo = tempo[2];
            tempo = tempo.split(':');
            let hora = (parseInt(tempo[0]))*60;
            let minuto = parseInt(tempo[1]);
            tempo = dia+hora+minuto;

            if(tempo_ace_usado[2]>tempo){
                tempo_ace_usado[2] = tempo_ace_usado[2]-tempo;
                pontuvali += parseFloat($('#poder-recebido-'+i).val().replace(',', '.'));
                $("#fonte-valicacao-"+i).val(1);
                $("#button-check-"+i).addClass("button-success");
                $("#button-check-"+i).removeClass("button-warning");
                $("#button-check-"+i).removeClass("button-error");
            }else{
                $("#fonte-valicacao-"+i).val(0);
                let porcento = (tempo_ace_usado[2]/tempo)*100;
                tempo_ace_usado[2] = tempo_ace_usado[2]-tempo;
                if(porcento>70){
                    $("#button-check-"+i).addClass("button-warning");
                    $("#button-check-"+i).removeClass("button-success");
                    $("#button-check-"+i).removeClass("button-error");
                }else{
                    $("#button-check-"+i).addClass("button-error");
                    $("#button-check-"+i).removeClass("button-warning");
                    $("#button-check-"+i).removeClass("button-success");
                }
            }


        }
    }
    //console.log("Pontu Maxima: "+pontu_nece);
    //console.log("Pontu Calculada: "+pontuvali);
    
    //console.log("Tempo Maximo: "+tempo_aceleradores[2]);
    //console.log("Tempo Usado: "+tempo_ace_usado[2]);

    pontu_aux -=pontuvali;
    if(prosseguir){
        $("#pontu-atingida").val(pontuvali);
        $("#tempo-restante").val(converte_tempo(tempo_ace_usado[2]));
        $("#pontu-atingida").css({"background-color": "#fff", "color": "#be334f"});
        $("#tempo-restante").css({"background-color": "#fff", "color": "#be334f"});
        $( ".infernal_informacoes_extras" ).removeClass( "display-of" ).addClass( "display-on" );

        if(pontu_aux<=0){
            $("#pontu-necessaria").addClass("button-success");
            $("#pontu-necessaria").removeClass("button-warning");
            $("#pontu-necessaria").removeClass("button-error");
        }else{
            let porcento = (pontuvali/pontu_aux)*100;
            console.log("Pontu Porcento: "+porcento);
            if(porcento>70){
                $("#pontu-necessaria").addClass("button-warning");
                $("#pontu-necessaria").removeClass("button-success");
                $("#pontu-necessaria").removeClass("button-error");
            }else{
                $("#pontu-necessaria").addClass("button-error");
                $("#pontu-necessaria").removeClass("button-warning");
                $("#pontu-necessaria").removeClass("button-success");
            }
        }
    }
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

        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }

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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
        let infernal = $('#form-infernal').val();
        if(infernal && qtd_fonte && pontu_nece > 1){
            calcula_tempo_infernal();
        }
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
    $("#pontu-necessaria").on("input", function(){
        pontu_nece = pontu_nece   == '' ? 1 : parseFloat($(this).val().replace(',', '.'));
        console.log(parseFloat($(this).val().replace(',', '.')));
    });
});
