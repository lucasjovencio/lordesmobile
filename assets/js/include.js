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
            gema = parseInt(gema);
            dados[0]+=valor2;
            dados[1]+=gema;
            $(this).show();
        }
    });

    if(dados[0]>0){
        $("#total-td-vel").html(dados[0]);
        $("#total-td-gem-vel").html(dados[1]);
        $("#total-td-temp-vel").html(dados[2]);
        $("#tr-total-val").show();
    }else{
        $("#tr-total-val").hide();
    }

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
        $("#td-vel-1").html(textoDigitado);
        verifica_tr();
        $("#td-gem-1").html(valor*5);
        $("#td-tempo-1").html(string);
    });
    $("#num-3").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*3);
        $("#td-vel-3").html(textoDigitado);
        verifica_tr();
        $("#td-gem-3").html('0');
        $("#td-tempo-3").html(string);
    });
    $("#num-5").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*5);
        $("#td-vel-5").html(textoDigitado);
        verifica_tr();
        $("#td-gem-5").html('0');
        $("#td-tempo-5").html(string);
    });
    $("#num-10").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*10);
        $("#td-vel-10").html(textoDigitado);
        verifica_tr();
        $("#td-gem-10").html('0');
        $("#td-tempo-10").html(string);
    });
    $("#num-15").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*15);
        $("#td-vel-15").html(textoDigitado);
        verifica_tr();
        $("#td-gem-15").html(valor*70);
        $("#td-tempo-15").html(string);
    });

    $("#num-30").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*30);
        $("#td-vel-30").html(textoDigitado);
        verifica_tr();
        $("#td-gem-30").html('0');
        $("#td-tempo-30").html(string);
    });

    $("#num-60").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*60);
        $("#td-vel-60").html(textoDigitado);
        verifica_tr();
        $("#td-gem-60").html(valor*130);
        $("#td-tempo-60").html(string);
    });

    $("#num-300").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*180);
        $("#td-vel-300").html(textoDigitado);
        verifica_tr();
        $("#td-gem-300").html(valor*800);
        $("#td-tempo-300").html(string);
    });

    $("#num-800").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*480);
        $("#td-vel-800").html(textoDigitado);
        verifica_tr();
        $("#td-gem-800").html(valor*650);
        $("#td-tempo-800").html(string);
    });
    $("#num-1500").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*900);
        $("#td-vel-1500").html(textoDigitado);
        verifica_tr();
        $("#td-gem-1500").html(valor*1000);
        $("#td-tempo-1500").html(string);
    });
    $("#num-240").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*1440);
        $("#td-vel-240").html(textoDigitado);
        verifica_tr();
        $("#td-gem-240").html(valor*1500);
        $("#td-tempo-240").html(string);
    });
    $("#num-3000").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*4320);
        $("#td-vel-3000").html(textoDigitado);
        verifica_tr();
        $("#td-gem-3000").html(valor*4400);
        $("#td-tempo-3000").html(string);
    });
    $("#num-700").on("input", function(){
        var textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*10080);
        $("#td-vel-700").html(textoDigitado);
        verifica_tr();
        $("#td-gem-700").html(valor*10000);
        $("#td-tempo-700").html(string);
    });
    $("#num-30000").on("input", function(){
        let textoDigitado = $(this).val();
        let valor = parseInt(textoDigitado);
        let string = converte_tempo(valor*43200);
        $("#td-vel-30000").html(textoDigitado);
        verifica_tr();
        $("#td-gem-30000").html(valor*40000);
        $("#td-tempo-30000").html(string);
    });
    
    $("#danger").on("input", function(){
        let valorInicial        = $(this).val();
        let qtnAtaque           = $('#qtn').val();
        let vidaInitial         = $('#qtn-vida').val();
        let ataqConseq          = $('#atac-con').val();
        
        qtnAtaque = qtnAtaque   == '' ? 1 : parseInt(qtnAtaque);
        vidaInitial = vidaInitial == '' ? 100 : parseInt(vidaInitial);
        
        console.log(valorInicial);
        console.log(qtnAtaque);
        console.log(vidaInitial);
        console.log(ataqConseq);
    });
});
