var promedio = 15;
var dEstandar = 2;
var variableAleatorea = 0;
var carril = new Array(0,0,0,0,0);
var contador = 1;
var choquesReales = new Array(0,0,0,0,0);
var flujoFinalDeCarros = 0;
var chochesTotalesFinales = 0;
var porcentajeFinalDeChoques = 0;
var dia = 0;
var carrosConExcesoCarril1 = new Array(5);
var carrilFinalDia = new Array(0,0,0,0,0);
var promedioCarrosDia = new Array(0,0,0,0,0);
var promedioChoquesDía = new Array(0,0,0,0,0);
var choquesTotalesEnLaSemana = 0;
var dias = 0;
var	carrilUnoDias =  new Array();
var	carrilDosDias = new Array();
var	carrilTresDias = new Array();
var	carrilCuatroDias = new Array();
var	carrilCincoDias = new Array();
var modasCarrilres = new Array();
var varianzasCarrilres = new Array();
var desviacionEstandarCarrilres = new Array();

function ejecutarUnAño(){
	alert("Este proceso puede tardar algunos segundos");
	dias = 100;
	for(var i = 0; i <= 53; i++){
		ejecutar();
	}
	dias = 5;
}

function ejecutar(){
	if(dias==0){
		dias = 5;
	}
	for(var i = 0; i <= 2399; i++){
		numerosAleatoriosPromedioDeCarros();
	}
	choquesTotalesDelDia();
}

function numerosAleatoriosPromedioDeCarros(){
	var sumatoriaNumerosAleatoriosPromedioDeCarros = 0;
	for (var i = 0; i <= 11; i++) {
		var aleatorio = Math.random();
		sumatoriaNumerosAleatoriosPromedioDeCarros += aleatorio;
	}
	GenerarVariableAleatorea(sumatoriaNumerosAleatoriosPromedioDeCarros);
}

//Convolución.
function GenerarVariableAleatorea(sumatoriaNumerosAleatoriosPromedioDeCarros){
	variableAleatorea = promedio + ((sumatoriaNumerosAleatoriosPromedioDeCarros - 6)*2);
	carrosPorCarril();
}

//Distrinución Empirica. 
function carrosPorCarril(){
	variableAleatorea = Math.round(variableAleatorea);
	for(var i = 0; i <= variableAleatorea - 1; i++){
		var aleatorio = Math.random();
		if (aleatorio>=0 && aleatorio<.05){
			carril[0] += 1;
			
		} else if(aleatorio>=.05 && aleatorio<.15){
			carril[4] += 1;
			
		} else if(aleatorio>=.15 && aleatorio<.35){
			carril[1] += 1;
			
		} else if(aleatorio>=.35 && aleatorio<.60){
			carril[3] += 1;
		 
		} else if(aleatorio>=.60 && aleatorio<1){
			carril[2] += 1;
		 
		}
	}
	carrosExcesoVelocidad();
}

function carrosExcesoVelocidad(){
	carrosConExcesoCarril1[0] = Math.round(carril[0] *.70); 
	carrosConExcesoCarril1[1] = Math.round(carril[1] *.70); 
	carrosConExcesoCarril1[2] = Math.round(carril[2] *.70); 
	carrosConExcesoCarril1[3] = Math.round(carril[3] *.70);  
	carrosConExcesoCarril1[4] = Math.round(carril[4] *.70);

	carrosExesoVelocidadMasDe40();
}

function carrosExesoVelocidadMasDe40(){
	for (var i = 0; i <= 4; i++) {
		var aleatorio = Math.random() * (60 - 10) + 10;
		aleatorio = Math.round(aleatorio);

		// Cambio de carril.
		if (aleatorio>=40 && i != 4) { //PREGUNTAR AL PROFE
			carril[i] -= carrosConExcesoCarril1[i];
			carril[i+1] += carrosConExcesoCarril1[i];
			//alert("Cambio de carril debido a que es mayor que 40 (" + aleatorio + ") Cambian "+carrosConExcesoCarril1[i]+" carros del carril"+i+" al carril"+(i+1));
		} else if(aleatorio>=40 && i == 4){
			carril[i] -= carrosConExcesoCarril1[i];
			carril[i-1] += carrosConExcesoCarril1[i];
			//alert("Cambio del carril 5 debido a que es mayor que 40 (" + aleatorio + ") Cambian "+carrosConExcesoCarril1[i]+" carros del carril"+i+" al carril"+(i-1));
		}
	}
	carrosTotalesEnFlujo();
}

var carrosTotalesFlujo = 0;

function carrosTotalesEnFlujo(){
	for(var i = 0; i<=4; i++){
		carrosTotalesFlujo += carril[i]; 
	}
	flujoFinalDeCarros += carrosTotalesFlujo;
	probabilidadChoquesCarros();
}

var probabilidadDeChoqueCarril1 = new Array(5);

function probabilidadChoquesCarros(){
	var x=0;
	for(var i = 0; i<=4; i++){
		x = carril[i];
		if (x>7) {
			probabilidadDeChoqueCarril1[i] = 100;
		} else{
			switch(x){
				case (6):
					probabilidadDeChoqueCarril1[i] = 50;
				break;
				case (7):
					probabilidadDeChoqueCarril1[i] = 80;
				break;
				default:
					probabilidadDeChoqueCarril1[i] = 0;
				break;
			}
		}
	}
	choques();
}

var numerosAleatorios = new Array();

//Bernoulli
function choques(){
	for(var i = 0; i<=4; i++){
		var aleatorio = Math.random();
		if(aleatorio > (1-(probabilidadDeChoqueCarril1[i]/100)) && probabilidadDeChoqueCarril1[i] != 100){
			choquesReales[i] += 1;
		} else if(probabilidadDeChoqueCarril1[i] == 100){
			for(var j = 0; j<= carril[i] - 1; j++){
				numerosAleatorios = Math.random();
				if(numerosAleatorios>.7){
					choquesReales[i] += 1;	
				}
			}
		}
	}
	limpiarBloque3segundos();
}

function limpiarBloque3segundos(){
	for(var i = 0; i <= 4; i++){
		carrilFinalDia[i] += carril[i];
		carril[i] = 0; 
	}
}

function choquesTotalesDelDia(){
	for(var i = 0; i<=4; i++){
		chochesTotalesFinales += choquesReales[i];
	}
	porcentajeDeChoquesTotalesDelDia();
}

function porcentajeDeChoquesTotalesDelDia(){
	porcentajeFinalDeChoques = (chochesTotalesFinales/flujoFinalDeCarros) * 100;
	imprimir();
}

function imprimir(){
	dia++;
	var numeroCarril = 1;
	document.getElementById('resultados').innerHTML += '<div class="col-12"><h5><b>Día '+dia+'</b></h5><p class="colorGris">Total de carros: '+flujoFinalDeCarros.toFixed(0)+'</p> <p class="colorGris">Choques de totales: '+chochesTotalesFinales.toFixed(0)+'</p> <p class="colorGris">Porcentaje de choques total: '+porcentajeFinalDeChoques.toFixed(2)+'</p> <h6 class="mt-2"><b>Choques y flujo de carros por carril:</h6></p> </div>';
	for (var i = 0; i <= probabilidadDeChoqueCarril1.length - 1; i++) {
		document.getElementById('resultados').innerHTML += '<div class="col"><p><b>Carril</b> '+(numeroCarril++)+'</p><p>Choques: '+choquesReales[i].toFixed(0)+'</p><p>Número de carros: '+carrilFinalDia[i]+'</p></div>';
	}
	document.getElementById('resultados').innerHTML += '<div class="col-12"><hr class"style-three">	</div>';
	contador ++;
	promedioDeCarriosPorDia()
}

function promedioDeCarriosPorDia(){
	for(var i = 0; i<= 4; i++){
		promedioCarrosDia[i] += carrilFinalDia[i];
		promedioChoquesDía[i] += Math.round(choquesReales[i]);
	}
	arregloCarrosDiasPorCarril();
}

function arregloCarrosDiasPorCarril(){
	carrilUnoDias[dia-1] = choquesReales[0].toFixed(0);
	carrilDosDias[dia-1] = choquesReales[1].toFixed(0);
	carrilTresDias[dia-1] = choquesReales[2].toFixed(0);
	carrilCuatroDias[dia-1] = choquesReales[3].toFixed(0);
	carrilCincoDias[dia-1] = choquesReales[4].toFixed(0);
	limpiarDatos();
}


function limpiarDatos(){
	carrosTotalesFlujo = 0;
	chochesTotalesFinales = 0;
	flujoFinalDeCarros = 0;
	for(var i = 0; i<=4; i++){
		choquesReales[i]=0;
		carril[i] = 0;
		carrilFinalDia[i]=0;
	}
	correrDeNuevo();
}

function correrDeNuevo(){
	if(dia<=dias-1){
		ejecutar();
	} else if(dia==dias){
		imprimirFlujoPromedioSemanal();
	}
}

function imprimirFlujoPromedioSemanal(){
	document.getElementById('titulo2').innerHTML +='<h5><b>Datos generales de por semana</b></h5>';
	for(var i = 0; i<= 4; i++){
		choquesTotalesEnLaSemana += promedioChoquesDía[i];
	}
	for(var i = 0; i<= 4; i++){
		promedioCarrosDia[i] /= (dias/5);
		promedioChoquesDía[i] /= (dias/5);
		document.getElementById('promediosFinales').innerHTML +='<p>Flujo promedio final por semana, carril '+i+' : '+promedioCarrosDia[i].toFixed(2)+'</p>';
		document.getElementById('promediosFinales2').innerHTML +='<p>Choques promedio final por semana, carril '+i+' : '+promedioChoquesDía[i].toFixed(2)+'</p>';
	}
	var promedioChoquesPorSemana = choquesTotalesEnLaSemana/(dias/5);
	document.getElementById('promediosFinales3').innerHTML +='<p>Choques totales durante la semana: '+choquesTotalesEnLaSemana.toFixed(2)+'</p><p>Promedio de choques por semana: '+promedioChoquesPorSemana.toFixed(2)+'</p><p>Semanas transcurridas: '+(dias/5)+'</p>';
	
	datosEstadisticosMedia();
}


// Para cada día por separado, calcule para cada acarril la media, mediana, moda, variza y desviacion estandar de choques por treansito.	 

var mediaC1 = 0;
var mediaC2 = 0;
var mediaC3 = 0;
var mediaC4 = 0;
var mediaC5 = 0;
var mediana = 0;
var moda = 0;
var varianza = 0;
var desviacionEstandar = 0;
var carrilUnoDiasOrdenado = 0;
var carrilDosDiasOrdenado = 0;  
var carrilTresDiasOrdenado = 0; 
var carrilCuatroDiasOrdenado = 0;
var carrilCincoDiasOrdenado = 0; 

function datosEstadisticosMedia(){
	// Media.
	for(var i = 0; i<=dia-1; i++){
		mediaC1 += Math.round(carrilUnoDias[i]);
	}
	for(var i = 0; i<=dia-1; i++){
		mediaC2 += Math.round(carrilDosDias[i]); 
	}
	for(var i = 0; i<=dia-1; i++){
		mediaC3 += Math.round(carrilTresDias[i]); 
	}
	for(var i = 0; i<=dia-1; i++){
		mediaC4 += Math.round(carrilCuatroDias[i]); 
	}
	for(var i = 0; i<=dia-1; i++){
		mediaC5 += Math.round(carrilCincoDias[i]); 
	}
	mediaC1 = mediaC1 / dia;
	mediaC2 = mediaC2 / dia; 
	mediaC3 = mediaC3 / dia; 
	mediaC4 = mediaC4 / dia; 
	mediaC5 = mediaC5 / dia;

	datosEstadisticosMediana();
}

function datosEstadisticosMediana(){	
	function comparar ( a, b ){ return a - b; }

	carrilUnoDiasOrdenado = carrilUnoDias.sort(comparar);
	carrilDosDiasOrdenado = carrilDosDias.sort(comparar);  
	carrilTresDiasOrdenado = carrilTresDias.sort(comparar);  
	carrilCuatroDiasOrdenado = carrilCuatroDias.sort(comparar);  
	carrilCincoDiasOrdenado = carrilCincoDias.sort(comparar);

	// Media carril uno.
	if(carrilUnoDiasOrdenado.length%2){
		divicion = (carrilUnoDiasOrdenado.length/2).toFixed(0);
		mediana1 = carrilUnoDiasOrdenado[divicion-1];
	} else {
		divicion = (carrilUnoDiasOrdenado.length/2);
		mediana1 = (Math.round(carrilUnoDiasOrdenado[divicion-1]) + Math.round(carrilUnoDiasOrdenado[divicion]))/2;
	}
	// Media carril dos.
	if(carrilDosDiasOrdenado.length%2){
		divicion = (carrilDosDiasOrdenado.length/2).toFixed(0);
		mediana2 = carrilDosDiasOrdenado[divicion-1];
	} else {
		divicion = (carrilDosDiasOrdenado.length/2);
		mediana2 = (Math.round(carrilDosDiasOrdenado[divicion-1]) + Math.round(carrilDosDiasOrdenado[divicion]))/2;
	}
	// Media carril tres.
	if(carrilTresDiasOrdenado.length%2){
		divicion = (carrilTresDiasOrdenado.length/2).toFixed(0);
		mediana3 = carrilTresDiasOrdenado[divicion-1];
	} else {
		divicion = (carrilTresDiasOrdenado.length/2);
		mediana3 = (Math.round(carrilTresDiasOrdenado[divicion-1]) + Math.round(carrilTresDiasOrdenado[divicion]))/2;
	}
	// Media carril cuatro.
	if(carrilCuatroDiasOrdenado.length%2){
		divicion = (carrilCuatroDiasOrdenado.length/2).toFixed(0);
		mediana4 = carrilCuatroDiasOrdenado[divicion-1];
	} else {
		divicion = (carrilCuatroDiasOrdenado.length/2);
		mediana4 = (Math.round(carrilCuatroDiasOrdenado[divicion-1]) + Math.round(carrilCuatroDiasOrdenado[divicion]))/2;
	}
	// Media carril cinco.
	if(carrilCincoDiasOrdenado.length%2){
		divicion = (carrilCincoDiasOrdenado.length/2).toFixed(0);
		mediana5 = carrilCincoDiasOrdenado[divicion-1];
	} else {
		divicion = (carrilCincoDiasOrdenado.length/2);
		mediana5 = (Math.round(carrilCincoDiasOrdenado[divicion-1]) + Math.round(carrilCincoDiasOrdenado[divicion]))/2;
	}

	//EJecutar funciones para moda:

	array_count_values(carrilUnoDiasOrdenado,0);
	array_count_values(carrilDosDiasOrdenado,1);
	array_count_values(carrilTresDiasOrdenado,2);
	array_count_values(carrilCuatroDiasOrdenado,3);
	array_count_values(carrilCincoDiasOrdenado,4);
	datosEstadisticosVarianza();
}

// Esta función crea un objeto contando las veces que se repite cada numero.
function array_count_values (array,indice) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // + namespaced by: Michael White (http://getsprink.com)
    // +      input by: sankai
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Shingo
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
    // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
    // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
    // *     returns 3: {42:1, "fubar":1}
    var tmp_arr = {},
        key = '',
        t = '';

    var __getType = function (obj) {
        // Objects are php associative arrays.
        var t = typeof obj;
        t = t.toLowerCase();
        if (t === "object") {
            t = "array";
        }
        return t;
    };

    var __countValue = function (value) {
        switch (typeof(value)) {
        case "number":
            if (Math.floor(value) !== value) {
                return;
            }
            // Fall-through
        case "string":
            if (value in this && this.hasOwnProperty(value)) {
                ++this[value];
            } else {
                this[value] = 1;
            }
        }
    };

    t = __getType(array);
    if (t === 'array') {
        for (key in array) {
            if (array.hasOwnProperty(key)) {
                __countValue.call(tmp_arr, array[key]);
            }
        }
    }
   	
   	// Creamos un arreglo del objeto.
    var repetidos = Object.entries(tmp_arr);
    // Ornedamos de menor a mayor los datos del arreglo.
    function comparar ( a, b ){ return a[1] - b[1]; }
    repetidos = repetidos.sort(comparar);
    // Funcion que guarda los datos en un nuevo arreglo.
    datosEstadisticosModa(repetidos,indice);
}

function datosEstadisticosModa(repetidos,indice){
	var x = repetidos.length;  
	modasCarrilres[indice] = repetidos[x-1][0];
}

function datosEstadisticosVarianza(){
	var sumatoria1 = 0;
	for(var i = 0; i <= carrilUnoDias.length - 1; i++){
		sumatoria1 += ((carrilUnoDias[i]-mediaC1) * (carrilUnoDias[i]-mediaC1));
	}
	var sumatoria2 = 0;
	for(var i = 0; i <= carrilDosDias.length - 1; i++){
		sumatoria2 += ((carrilDosDias[i]-mediaC2) * (carrilDosDias[i]-mediaC2));
	}
	var sumatoria3 = 0;
	for(var i = 0; i <= carrilTresDias.length - 1; i++){
		sumatoria3 += ((carrilTresDias[i]-mediaC3) * (carrilTresDias[i]-mediaC3));
	}
	var sumatoria4 = 0;
	for(var i = 0; i <= carrilCuatroDias.length - 1; i++){
		sumatoria4 += ((carrilCuatroDias[i]-mediaC4) * (carrilCuatroDias[i]-mediaC4));
	}
	var sumatoria5 = 0;
	for(var i = 0; i <= carrilCincoDias.length - 1; i++){
		sumatoria5 += ((carrilCincoDias[i]-mediaC5) * (carrilCincoDias[i]-mediaC5));
	}
	varianzasCarrilres[0] = sumatoria1/(carrilUnoDias.length);
	varianzasCarrilres[1] = sumatoria2/(carrilDosDias.length);
	varianzasCarrilres[2] = sumatoria3/(carrilTresDias.length);
	varianzasCarrilres[3] = sumatoria4/(carrilCuatroDias.length);
	varianzasCarrilres[4] = sumatoria5/(carrilCincoDias.length);

	datosEstadisticosDesviacionEstandar();
}


function datosEstadisticosDesviacionEstandar(){
	for(var i = 0; i <= 4; i++){
		desviacionEstandarCarrilres[i] = Math.sqrt(varianzasCarrilres[i]);
	}
	imprimirDatosEstadisticos();
}

function imprimirDatosEstadisticos(){
	document.getElementById('estadisticas1').innerHTML += '<h5><div class=col-12><b>Datos estadísticos por carri; Media, Mediana, Moda, Varianza y Desviación estándar</b></div></h5>'
	document.getElementById('estadisticas2').innerHTML += '<p>Media C1: '+mediaC1.toFixed(2)+'</p><p>Media C2: '+mediaC2.toFixed(2)+'</p><p>Media C3: '+mediaC3.toFixed(2)+'</p><p>Media C4: '+mediaC4.toFixed(2)+'</p><p>Media C5: '+mediaC5.toFixed(2)+'</p>'
	document.getElementById('estadisticas3').innerHTML += '<p>Mediana C1: '+mediana1.toFixed(2)+'</p><p>Mediana C2: '+mediana2.toFixed(2)+'</p><p>Mediana C3: '+mediana3.toFixed(2)+'</p><p>Mediana C4: '+mediana4.toFixed(2)+'</p><p>Mediana C5: '+mediana5.toFixed(2)+'</p>'
	

	for(var i = 0; i <= 4; i++){
		document.getElementById('estadisticas4').innerHTML += '<p>Moda C'+(i+1)+': '+modasCarrilres[i]+'</p>';
	}

	
	
	for(var i = 0; i <= 4; i++){
		document.getElementById('estadisticas5').innerHTML += '<p>Varianza C'+(i+1)+': '+varianzasCarrilres[i].toFixed(2)+'</p>';
	}
	
	

	for(var i = 0; i <= 4; i++){
		document.getElementById('estadisticas6').innerHTML += '<p>Desviación estándar C'+(i+1)+': '+desviacionEstandarCarrilres[i].toFixed(2)+'</p>';
	}

}