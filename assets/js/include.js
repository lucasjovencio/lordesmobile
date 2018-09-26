var gemas = [5,0,0,0,70,0,130,300,650,1000,1500,4400,10000,40000];
var tempo_aceleradores = [0,0,0]; // quantidade , gemas , tempo
var tempo_ace_usado = [0,0,0]; // quantidade , gemas , tempo
var pontu_nece = 0;
var obj_tropas;

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

    for(item in obj_tropas) {
        if(obj_tropas.hasOwnProperty(item)) {
            itemKey = Object.keys(obj_tropas[item]["ac"])[0];
            if(itemKey==id){
                delete obj_tropas[item];
                break;
            }
        }
    }
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
                        '<option selected value="2|1|T1">T1</option>'+
                        '<option value="8|2|T2">T2</option>'+
                        '<option value="24|5|T3">T3</option>'+
                        '<option value="36|15|T4">T4</option>'+
                    '</select>'+
                '</div>'
            );
            break;
        default:
            break;
    }
    //'<div class="pure-u-1-2 pure-u-md-1-2">'+
    //'<label for="min">Peso da Fonte</label>'+
    //    '<input onkeyup="atualizaTempo(2,'+id_fonte+');return false;" id="peso-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="number" placeholder="0" min="0" max="20000">'+
    //'</div>'
}
function tempoMultiplicado(multiplicador,id_fonte){
    mult = parseInt(multiplicador);
    if(mult>=1){
        $('#tempo-multiplicado-'+id_fonte).val(converte_tempo((mult*converte_tempo_string($("#tempo-real-"+id_fonte).val()))));
        calcula_tempo_tropa();
    }
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
                '<label for="min">Quantidade de Tropas</label>'+
                '<input onkeyup="atualizaTempo(4,'+id_fonte+');" data-mask="000,000" data-mask-reverse="true" id="quantidade-tropa-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" placeholder="1,000">'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Real</label>'+
                '<input onkeyup="atualizaTempo(4,'+id_fonte+');" data-mask="00 D 00:00" data-mask-reverse="true" id="tempo-real-'+id_fonte+'" class="pure-u-23-24 '+1+'" type="text" placeholder="30 D 23:55">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Multiplicador de Quantidade</label>'+
                '<input onkeyup="tempoMultiplicado(this.value,'+id_fonte+');return false;" id="multiplicador-fonte-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="number" placeholder="0" min="1" max="1000">'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">Tempo Multiplicado</label>'+
                '<input style="color: #900;" disabled id="tempo-multiplicado-'+id_fonte+'"  class="pure-u-23-24 '+1+'" type="text" data-mask="00 D 00:00" data-mask-reverse="true" placeholder="00 D 00:00" >'+
            '</div>'+

            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button class="pure-u-23-24 pure-button '+1+'" onclick="removerFonte('+id_fonte+');return false;">'+
                    '<i class="fas fa-minus-square"></i>'+
                    ' Remover fonte de pontuação'+
                '</button>'+
            '</div>'+
            '<div class="pure-u-1-2 pure-u-md-1-2">'+
                '<label for="min">&emsp;</label>'+
                '<button id="button-check-'+id_fonte+'" class="pure-u-23-24 pure-button '+2+'" onclick="return false;">'+
                    '<i class="fas fa-clock"></i>'+
                '</button>'+
            '</div>'+
            '<div class="pure-u-1-1 pure-u-md-1-1">'+
                '<label for="min">&emsp;</label>'+
                '<button onclick="openModal('+id_fonte+',4);return false;" data-id-type="'+id_fonte+'" style="margin-left: 10px;" id="button-information-'+id_fonte+'" class="pure-u-23-24 pure-button '+2+'" onclick="return false;">'+
                    '<i class="fas fa-info-circle"></i> Informações Extras.'+
                '</button>'+
            '</div>'+
            '<span style="display:none;" id="hidden-pontu-infernal-'+id_fonte+'"/></span>'+
            '<span style="display:none;" id="hidden-pontu-poder-'+id_fonte+'"></span>';
            break; 
        default:
        break;
    }

    

    $("#form-pree-"+id_fonte).html(text);
    applyDatMaskJs();
    definiPeso(tipo,id_fonte);

}
function nomeAcelerador(numb){
    let nome;
    numb = parseInt(numb);
    switch(numb){
        case 1:
            nome = "1 min";
            break;
        case 3:
            nome = "3 mins";
            break;
        case 5:
            nome = "5 mins";
            break;
        case 10:
            nome = "10 mins";
            break;
        case 15:
            nome = "15 mins";
            break;
        case 30:
            nome = "30 mins";
            break;
        case 60:
            nome = "60 mins";
            break;
        case 180:
            nome = "3 horas";
            break;
        case 480:
            nome = "8 horas";
            break;
        case 900:
            nome = "15 horas";
            break;
        case 1440:
            nome = "24 horas";
            break;
        case 4320:
            nome = "3 dias";
            break;
        case 10080:
            nome = "7 dias";
            break;
        case 43200:
            nome = "30 dias";
            break;
        default:
            nome = "0 dia";
            break;
    }
    return nome;
}
function openModal(id,tipo){
    let dataMasc;

    switch(tipo){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            let poder;
            let infernal;
            let T;
            let Q;
            for(item in obj_tropas) {
                if(obj_tropas.hasOwnProperty(item)) {
                    itemKey = Object.keys(obj_tropas[item]["ac"])[0];
                    if(itemKey==id){
                        dataMasc    = obj_tropas[item]["ac"];
                        poder       = obj_tropas[item]["pd"];
                        infernal    = obj_tropas[item]["if"];
                        T           = obj_tropas[item]["t"];
                        Q           = obj_tropas[item]["q"];
                        break;
                    }
                }
            }
        
            let texto = "<p>Poder total: <b>"+poder+"</b></p>"+
            "<p>Pontuação Infernal: <b>"+infernal+"</b></p>"+
            "<p>Tipo de Tropa: <b>"+T+"</b></p>"+
            "<p>Quantidade de tropa por rodada: <b>"+Q+"</b></p>"+
            "<p>Ordem de aceleradores a serem utilizados:</p>";
            // coinValue = coins;
            texto +="<ul>";
            dataMasc = dataMasc[0];
            let i=0;
            let moeda;
            let qtn;
            let rum;
            let arr= new Array();
            texto +="<ul>";
            Object.entries(dataMasc).forEach(([key, value]) => {
                i++;
                let re= new Array();;
                $.each(value, function(key2, val2) {
                    moeda = val2.coinValue;
                    qtn = val2.numCoins;
                    let arrrr = new Array(moeda,qtn);
                    re.push(arrrr);
                });
                arr.push(re);
            });

            for (let i = 0; i < arr.length; i++) {
                texto +="<li>";
                    texto += (i+1)+"º Rodada de tropa.<br>Aceleradores na ordem:";
                    texto +="<ul style='margin:0px;'>";
                for (let j = 0; j < arr[i].length; j++) {
                    texto +="<li>";
                    texto += nomeAcelerador(arr[i][j][0])+" * "+arr[i][j][1]+" Vezes";
                    texto +="</li>";
                }
                    texto +="</ul>";
                texto +="</li>";
                
            }

            texto +="</ul>";
            //console.log(texto);
            $("#modal-result").html(texto);
            
            break;
        default:
            break;
    }
    
    $("#myModalTropas").modal();
    return false;
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

        valorInicial = parseFloat(valorInicial).toFixed(2);
        if(! valorInicial){
            valorInicial = parseFloat(1).toFixed(2);
        }
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
                if(i<=6){
                    let valT = parseFloat(tabelaDano[(i-1)]).toFixed(2);
                    console.log("Tabela de Dano: "+valT);
                    console.log("Dano Inicial: "+valorInicial);
                    let porcento = parseFloat(valT/valorInicial).toFixed(2);
                    console.log("Porcentagem: "+porcento);
                    valorInicial = Number(valorInicial)+Number(porcento);
                    console.log("Dano + Porcentagem: "+valorInicial);
                    //porcentM = porcentM.toFixed(2);

                    $("#atac-m-"+i).html(tabelaDano[(i-1)]);
                    $("#dan-m-"+i).html(valorInicial.toFixed(2));

                    vidaInitial=parseFloat(vidaInitial);
                    $("#vida-m-"+i).html(vidaInitial);


                    vidaInitial=parseFloat(vidaInitial-valorInicial);

                    vidaInitial = vidaInitial <=0 ? 0 : parseFloat(vidaInitial).toFixed(2);

                    $("#vida-mm-"+i).html(vidaInitial);
                }else{
                    console.log("Dano: "+valorInicial);
                    $("#atac-m-"+i).html('#');
                    $("#dan-m-"+i).html(parseFloat(valorInicial).toFixed(2));
                    $("#vida-m-"+i).html(vidaInitial);
                    vidaInitial=parseFloat(vidaInitial-valorInicial);
                    vidaInitial = vidaInitial <=0 ? 0 : parseFloat(vidaInitial).toFixed(2);
                    $("#vida-mm-"+i).html(vidaInitial);
                }
                
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

            if( dias>=1 && dias < 10 ){
                if(horas>1 && horas < 10){
                    if(minutos>9){
                        string = "0"+dias+" D "+"0"+horas+":"+minutos;
                    }else{
                        string = "0"+dias+" D "+"0"+horas+":0"+minutos;
                    }
                }else if(horas>9){
                    if(minutos>9){
                        string = "0"+dias+" D "+horas+":"+minutos;
                    }else{
                        string = "0"+dias+" D "+horas+":0"+minutos;
                    }
                }else{
                    string = "0"+dias+" D 00:0"+minutos;
                }
            }else if(dias>9){
                if(horas>=1 && horas < 10){
                    if(minutos>9){
                        string = dias+" D "+"0"+horas+":"+minutos;
                    }else{
                        string = dias+" D "+"0"+horas+":0"+minutos;
                    }
                }else if(horas>9){
                    if(minutos>9){
                        string = dias+" D "+horas+":"+minutos;
                    }else{
                        string = dias+" D "+horas+":0"+minutos;
                    }
                }else{
                    string = dias+" D 00:0"+minutos;
                }
            }
        }else{

            if(horas>1 && horas < 10){
                if(minutos>9){
                    string = "0"+horas+":"+minutos;
                }else{
                    string = "0"+horas+":0"+minutos;
                }
            }else if(horas>9){
                if(minutos>9){
                    string = horas+":"+minutos;
                }else{
                    string = horas+":0"+minutos;
                }
            }
            else{
                string = "0"+horas+":00";
            }
        }
    }else{
        if(minutos < 10){
            string = "00:0"+minutos;
        }else{
            string = "00:"+minutos;
        }
    }
    return string;
}
function atualizaTempo(tipo,id){
    let tipoFonte = parseInt($('#tipo-fonte-'+id).val());
    let pesoFonte = parseInt($('#peso-fonte-'+id).val());


    let poderRece   = $('#poder-recebido-'+id).val();
    let quantiRece  = $('#quantidade-tropa-'+id).val();

    let ValiP = (poderRece ? parseFloat(poderRece.replace(',', '.')) : 0);
    let ValiQ = (quantiRece ? parseFloat(quantiRece.replace(',', '.')) : 0);
    let QR=0;
    if(poderRece || quantiRece){
        QR=1;
    }
    let tempoReal = $('#tempo-real-'+id).val();
    verifica_tr();
    if(tipoFonte !=0 && pesoFonte !=null && pesoFonte >0 && QR && tempoReal.length > 6 && pontu_nece > 1){
        if(ValiP){
            calcula_tempo_infernal();
        }else if (ValiQ) {
            let mult = parseInt($('#quantidade-tropa-'+id).val());
            if(mult){
                calcula_tempo_tropa();
            }            
        }
    }
}
function converte_tempo_string(temp){
    let tempo;
    let hora;
    let minuto;
    let dia;
    if(temp.length>5){
        tempo = temp.split(' ');
        dia = (parseInt(tempo[0]))*1440;
        tempo = tempo[2];
        tempo = tempo.split(':');
        hora = (parseInt(tempo[0]))*60;
        minuto = parseInt(tempo[1]);
        return (dia+hora+minuto);
    }
    tempo = temp.split(':');
    hora = (parseInt(tempo[0]))*60;
    minuto = parseInt(tempo[1]);
    return (hora+minuto);
}
function ReduzTempoUtilizadoDeAceleradores(ace_usados,lista_dispo){
    tempo_ace_usado[2]=tempo_aceleradores[2];
    let tempoCalc=0;
    let tam = ace_usados.length;
    let arrayAux;
    if(tam){
        for (let i = 0; i < tam; i++) {
            let entry = ace_usados[i];
            let key = entry.coinValue;
            let key_mult = entry.numCoins;

            for(item in lista_dispo) {
                if(lista_dispo.hasOwnProperty(item)) {
                    itemKey = Object.keys(lista_dispo[item])[0];

                    itemVal = lista_dispo[item][itemKey];

                    if(itemKey==key){
                        itemObj = Object.create(null);
                        itemVal = parseInt(itemVal)-key_mult;

                        if(itemVal>=1){
                            itemObj[itemKey] = itemVal-1;
                            lista_dispo.push(itemObj);
                        }
                        tempoCalc+= (parseInt(key))*key_mult;
                        delete lista_dispo[item];
                        break;
                    }
                }
            }

        }

        arrayAux = new Array();

        for(item in lista_dispo) {
            if(lista_dispo.hasOwnProperty(item)) {
                itemKey = Object.keys(lista_dispo[item])[0];
                arrayAux.push(itemKey);
            }
        }
    }else{
        arrayAux = new Array();
    }
    
    return ({
            "arg":arrayAux,"qtn":tempoCalc
        });
}
function objetos_mochila(tempo_total,mult){
    let tempoUsado=0;

    let table = $('table.table-vel');
    
    let lista = new Array();
    let lista_aux = new Array();
    let lista_qtn = new Array();
    let denominations = new Array();
    let array_aceleradores_tropas = new Array();
    let i = 0;
    table.find('tbody > tr').each(function() {
        let valor = $(this).find('td').eq(2).text();
        let gema=0;
        let tempo=0;
        let qtn=0;
        let valor2 = parseInt(valor);
        if (valor2<=0 || valor=='' ) {
          $(this).hide();
        }else{
            tempo   = $(this).find('td').eq(6).find('pre').text();
            qtn     = $(this).find('td').eq(6).find('i').text();
            let itemKey = tempo;

            itemObj = Object.create(null);
            itemObj[itemKey] = qtn;
            denominations.push(tempo);
            lista.push(itemObj);

            i++;
        }
    });
    
    for(let i=0; i<mult;i++){
        array_aceleradores_tropas.push(makeChange(denominations, tempo_total));
        let Tempoarg    = ReduzTempoUtilizadoDeAceleradores(array_aceleradores_tropas[i],lista);
        denominations   = Tempoarg.arg;
        //console.log(tempoUsado+" "+Tempoarg.qtn);
        tempoUsado      += Tempoarg.qtn;
        //console.log(array_aceleradores_tropas[i]);
    }

    return ({
            "arg":array_aceleradores_tropas,"qtn":tempoUsado
        });
}
function calcula_tempo_tropa(){
    obj_tropas = new Array();
    tempo_ace_usado[2]=tempo_aceleradores[2];
    let pontu_aux = pontu_nece;
    let pontuvali=0;
    let prosseguir = 1;
    let tempo;
    let dadosArgh;
    let qtn_tropa;
    for(let i=0; i<id_fonte;i++){
        tempo = $("#tempo-real-"+i).val();
        mult = $("#multiplicador-fonte-"+i).val();
        qtn_tropa = parseFloat($('#quantidade-tropa-'+i).val().replace(',', '.')).toFixed(3);

        if(tempo==null || tempo=='' || mult==null || mult==''){
            prosseguir =0;
            continue;
        }else{
            prosseguir = 1;
            tempo = converte_tempo_string(tempo);
            dadosArgh = objetos_mochila(tempo,mult);
            tempo = dadosArgh.qtn;
            if(tempo_ace_usado[2]>tempo){
                

                let auxTempo = tempo_ace_usado[2]-tempo;
                tempo_ace_usado[2] = auxTempo;
                let pontu = $('#peso-fonte-'+i).val();
                pontu  = pontu.split('|');
                pontuAux = pontu[1];
                pontuAux = parseFloat(pontuAux);
                pontuAux2 = pontu[0];
                pontuAux2 = parseFloat(pontuAux2);


                pontuvali += parseFloat(((pontuAux*qtn_tropa)*mult)).toFixed(3);
                pontuvali =  pontuvali.replace(/^0+(?!\.|$)/, '');

                pontuAux = parseFloat(((pontuAux*qtn_tropa)*mult)).toFixed(3);
                pontuAux =  pontuAux.replace(/^0+(?!\.|$)/, '');

                pontuAux2 = parseFloat(((pontuAux2*qtn_tropa)*mult)).toFixed(3);
                pontuAux2 =  pontuAux2.replace(/^0+(?!\.|$)/, '');

                let itemObj = Object.create(null);
                itemObj[i] = dadosArgh.arg;

                obj_tropas.push({"ac":itemObj,"if":pontuAux,"pd":pontuAux2,"t":pontu[2],"q":qtn_tropa});

                $("#hidden-pontu-infernal-"+i).text(pontuAux);
                $("#hidden-pontu-poder-"+i).text(pontuAux2);

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

function calcula_tempo_infernal(){
    tempo_ace_usado[2]=tempo_aceleradores[2];
    let pontu_aux = pontu_nece;
    let pontuvali=0;
    let prosseguir = 1;
    for(let i=0; i<id_fonte;i++){
        if( parseInt($("#tipo-fonte-"+i).val()) == 4){
            calcula_tempo_tropa();
            continue;
        }
        let tempo = $("#tempo-real-"+i).val();
        if(tempo==null || tempo==''){
            prosseguir =0;
            continue;
        }
        else{
            prosseguir = 1;
            tempo = converte_tempo_string(tempo);
            if(tempo_ace_usado[2]>tempo){
                tempo_ace_usado[2] = ((tempo_ace_usado[2]-tempo)>0) ? (tempo_ace_usado[2]-tempo):0;
                pontuvali += parseFloat($('#poder-recebido-'+i).val().replace(',', '.'));
                $("#fonte-valicacao-"+i).val(1);
                $("#button-check-"+i).addClass("button-success");
                $("#button-check-"+i).removeClass("button-warning");
                $("#button-check-"+i).removeClass("button-error");
            }else{
                $("#fonte-valicacao-"+i).val(0);
                let porcento = (tempo_ace_usado[2]/tempo)*100;
                tempo_ace_usado[2] = ((tempo_ace_usado[2]-tempo)>0) ? (tempo_ace_usado[2]-tempo):0;
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
        string+="<pre class='oculta-span'>"+1+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+3+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+5+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+10+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+15+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+30+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+60+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+180+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+480+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+900+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<span class='oculta-span'>"+valor*1440+"</span>";
        string+="<pre class='oculta-span'>"+1440+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+4320+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+10080+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        string+="<pre class='oculta-span'>"+43200+"</pre>";
        string+="<i class='oculta-span'>"+valor+"</i>";
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
        
        valorInicial = (valorInicial  == '' ? 0 : parseFloat(valorInicial));
        qtnAtaque = (qtnAtaque   == '' ? 1 : parseInt(qtnAtaque));
        vidaInitial = (vidaInitial == '' ? 100 : parseInt(vidaInitial));
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



function makeChange(coins, value) {
    var solutions = [];
    makeChangeBacktracking(coins, value, [], solutions);

    if (!solutions.length) {
        //no solution was found
        return null;
    }

    var solutionsWithCount = solutions
        .map(function(solution) {
            return {
                cardinality: solution.reduce(function(coinCount, item) {
                    return coinCount + item.numCoins;
                }, 0),
                solution: solution
            };
        })
        .sort(function(a, b) {
            if (a.cardinality === b.cardinality) {
                return 0;
            }

            return a.cardinality < b.cardinality ? -1 : 1;
        });

    //favor the solution with the least number of coins
    return solutionsWithCount[0].solution;

}

function makeChangeBacktracking(coins, value, resultCoins, solutions) {
    var newResult = resultCoins.concat([]);

    for (var i = 0; i < coins.length; i++) {
        var coinValue = coins[i];
        if (coinValue > value) {
            //e.g. trying to change 5 cents with a quarter: can't be done
            //so try the next coin
            continue;
        }

        var remainingValue = value % coinValue,
            numCoins = Math.floor(value / coinValue);

        newResult.push({
            coinValue: coinValue,
            numCoins: numCoins
        });

        if (remainingValue === 0) {
            //it worked!
            solutions.push(newResult.concat([]));

            //but let's keep trying, maybe there's something better?
            newResult.pop();
            continue;
        }

        //there's still some remaining money to change, so keep going
        makeChangeBacktracking(coins, remainingValue, newResult, solutions);

        //keep trying until we run out of coins
        newResult.pop();
    }

    //none of the coins worked out, not a solution :(
    return null;
}


