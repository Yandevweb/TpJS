// Coordonnées
var alpha    = [0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var num      = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var taken 	 = [];
var nb_cases = 11;

$(document).ready(
	function(){
		init();
		posBoat();
	});

function init(){

	// Tableau 1
	for (i = 0; i < nb_cases; i++){
		if (i == 0){

			$("#t1").append("<tr>");

			for (j = 0; j < nb_cases; j++){
				$("#t1").append("<th class='" + alpha[j]+  " axe '>");
				$("#t1 ." + alpha[j]).append("<p>" + alpha[j] + "<p>");
				$("#t1").append("</th>");
			}

			$("#t1").append("</tr>");
		} else {

			$("#t1").append("<tr>");
		
			for (k = 0; k < nb_cases; k++){

				var dataT1 =  " onclick='shoot(\"t1\",\""+ alpha[k] +"\", \""+ num[i] +"\")'" ;
				
				if (k == 0){
					dataT1 = '';
				}

				if (k == 0){
					$("#t1").append("<td class='axe " + alpha[k] + "-" + num[i] + "' "+ dataT1 +" >");
					$("#t1 ." + alpha[k] + "-" + num[i]).append("<p>"+ num[i] + "<p>");
					$("#t1").append("</td>");
				} else {
					$("#t1").append("<td class='case' id='t1-" + alpha[k] + "-" + num[i] + "'"+ dataT1 +" >");
					$("#t1").append("</td>");
				}

			}
			
			$("#t1").append("</tr>");
		}
	}

	//Tableau 2
	for (i = 0; i < nb_cases; i++){
		if (i == 0){

			$("#t2").append("<tr>");

			for (j = 0; j < nb_cases; j++){
				$("#t2").append("<th class='" + alpha[j]+  " axe '>");
				$("#t2 ." + alpha[j]).append("<p>" + alpha[j] + "<p>");
				$("#t2").append("</th>");
			}

			$("#t2").append("</tr>");
		} else {

			$("#t2").append("<tr>");
		
			for (k = 0; k < nb_cases; k++){

				var dataT2 =  " onclick='shoot(\"t2\",\""+ alpha[k] +"\", \""+ num[i] +"\")'" ;
				
				if (k == 0){
					dataT2 = '';
				}

				if (k == 0){
					$("#t2").append("<td class='axe " + alpha[k] + "-" + num[i] + "' "+ dataT2 +" >");
					$("#t2 ." + alpha[k] + "-" + num[i]).append("<p>"+ num[i] + "<p>");
					$("#t2").append("</td>");
				} else {
					$("#t2").append("<td class='case' id='t2-" + alpha[k] + "-" + num[i] + "'"+ dataT2 +" >");
					$("#t2").append("</td>");
				}

			}
			
			$("#t2").append("</tr>");
		}
	}
};

function shoot(t, x, y){
	//alert("#"+t+"-"+x+"-"+y);
	//$("#"+t +" .case ."+x+"-"+y).addClass("cross");
	if ($("#"+t+"-"+x+"-"+y).hasClass("boat")){
		$("#"+t+"-"+x+"-"+y).css("background-image", "url('./images/boom.png')");
	} else {
		$("#"+t+"-"+x+"-"+y).css("background-image", "url('./images/cross.png')");
	}
	$("#"+t+"-"+x+"-"+y).css("background-size", "100% 100%");
};

function posBoat(){
	// Déclaration des bateaux
	var portAvion  = {len: 5, name: "portAvion"};
	var croiseur   = {len: 4, name: "croiseur"};
	var destroyer  = {len: 3, name: "destroyer"};
	var sousmarin  = {len: 3, name: "sousmarin"};
	var torpilleur = {len: 2, name: "torpilleur"};

	// flotte
	var flotte = [portAvion, croiseur, destroyer, sousmarin, torpilleur];

	for ( i = 0; i < flotte.length; i++){
		deploy(flotte[i]);
	};
};

function deploy(boat){
	var posed         = false;

	while (posed == false){
		var poseAvailable = true;
		var orientation   = Math.floor((Math.random() * 2) + 1);
		var axeX          = Math.floor((Math.random() * 10) + 1);
		var axeY          = Math.floor((Math.random() * 10) + 1);
		// Il ne faut pas dépasser du cadre ça serait dommage..
		if ((axeX + boat.len < 10) && (axeY + boat.len < 10)){

			if (orientation == 1){
				for (k = 0; k < boat.len; k++){
						console.log($.inArray("#t1-"+alpha[axeX + k]+"-"+num[axeY], taken));
					if ($.inArray("#t1-"+alpha[axeX + k]+"-"+num[axeY], taken) != -1){
						poseAvailable = false;
						//break;
					}
				}
			} else if (orientation == 2){
				for (l = 0; l < boat.len; l++){
						console.log($.inArray("#t1-"+alpha[axeX]+"-"+num[axeY + l], taken));
					if ($.inArray("#t1-"+alpha[axeX]+"-"+num[axeY + l], taken) != -1){
						poseAvailable = false;
						//break;
					}
				};
			}

			if (poseAvailable != false){
				if (orientation == 1){
					for (k = 0; k < boat.len; k++){
						$("#t1-"+alpha[axeX + k]+"-"+num[axeY]).addClass(boat.name);
						$("#t1-"+alpha[axeX + k]+"-"+num[axeY]).addClass("boat");
						taken.push("#t1-"+alpha[axeX + k]+"-"+num[axeY]);
					};
				} else if (orientation == 2){
					for (l = 0; l < boat.len; l++){
						$("#t1-"+alpha[axeX]+"-"+num[axeY + l]).addClass(boat.name);
						$("#t1-"+alpha[axeX]+"-"+num[axeY + l]).addClass("boat");
						taken.push("#t1-"+alpha[axeX]+"-"+num[axeY + l]);
					};
				}
				posed = true;
			}
		} else {
			console.log(poseAvailable);
			orientation = Math.floor((Math.random() * 2) + 1);
			axeX        = Math.floor((Math.random() * 10) + 1);
			axeY        = Math.floor((Math.random() * 10) + 1);
			posed 		= false;
		}
	}
};