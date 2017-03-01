// Coordonnées
var alpha     = [0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
var num       = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var taken 	  = [];
var nb_cases  = 11;
var p1Active  = true;
var p2Active  = false;
var p1Life    = 17;
var p2Life    = 17;
var cpuActive = false;
var cpuPlayed = [];

$(document).ready(
	function(){
		init();
		posBoat();
		swal({
			title: 'Nouvelle partie',
			text: "Selectionner le nombre de joueurs",
			type: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '1 joueur',
			cancelButtonText: '2 joueurs',
			confirmButtonClass: 'btn light-blue accent-3',
			cancelButtonClass: 'btn light-green accent-3  black-text',
			buttonsStyling: false
		}).then(function () {
			swal(
				'Okay !',
				'Vous jouer contre le CPU',
				'success'
			)
			cpuActive = true;
			$("#title2").text("CPU");
		}, function (dismiss) {
			// dismiss can be 'cancel', 'overlay',
			// 'close', and 'timer'
				if (dismiss === 'cancel') {
					swal(
						'Okay !',
						'Au joueur 1 de commencer',
						'success'
				)

				cpuActive = false;
			}
		})
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
	if($("#"+t+"-"+x+"-"+y).hasClass("hit") != true &&
		((p1Active == true && t == "t2") || (p2Active == true && t == "t1"))){
		// Si c'est un bateau Boom et dégats
		if ($("#"+t+"-"+x+"-"+y).hasClass("boat")){
			$("#"+t+"-"+x+"-"+y).css("background-image", "url('./images/boom.png')");
			damage("#"+t+"-"+x+"-"+y);
		} else {
			$("#"+t+"-"+x+"-"+y).css("background-image", "url('./images/cross.png')");
		}
		$("#"+t+"-"+x+"-"+y).addClass("hit");
		$("#"+t+"-"+x+"-"+y).css("background-size", "100% 100%");

		// On change de joueur
		if (p1Active){
			p1Active = false;
			p2Active = true;
			$(".game2").css("opacity", "0.5");
			$(".game1").css("opacity", "1");
			cpuPlay();
		} else if (p2Active && !cpuActive){
			p2Active = false;
			p1Active = true;
			$(".game1").css("opacity", "0.5");
			$(".game2").css("opacity", "1");
		} else if (p2Active && cpuActive){
			p2Active = false;
			p1Active = true;
			$(".game1").css("opacity", "0.5");
			$(".game2").css("opacity", "1");
		}
	}
};

function cpuPlay(){
	shootOk = false;
	while (shootOk == false){
		var axeX   = Math.floor((Math.random() * 10) + 1);
		var axeY   = Math.floor((Math.random() * 10) + 1);
		var coords = "#t1-" + alpha[axeX] + "-" + num[axeY];

		if($.inArray(coords, cpuPlayed) == -1){
			shoot("t1", alpha[axeX], num[axeY]);
			cpuPlayed.push(coords);
			shootOk = true;
		}
	};
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

	// Joueur 1
	for ( i = 0; i < flotte.length; i++){
		deploy(flotte[i], "t1");
	};

	taken = [];
	// Joueur 2
	for ( i = 0; i < flotte.length; i++){
		deploy(flotte[i], "t2");
	};
};

function deploy(boat, t){
	
	var posed = false;

	while (posed == false){
		var poseAvailable = true;
		var orientation   = Math.floor((Math.random() * 2) + 1);
		var axeX          = Math.floor((Math.random() * 10) + 1);
		var axeY          = Math.floor((Math.random() * 10) + 1);

		// Il ne faut pas dépasser du cadre ça serait dommage..
		if ((axeX + boat.len < 10) && (axeY + boat.len < 10)){

			if (orientation == 1){
				for (k = 0; k < boat.len; k++){
					if ($.inArray("#"+ t +"-"+alpha[axeX + k]+"-"+num[axeY], taken) != -1){
						poseAvailable = false;
					}
				}
			} else if (orientation == 2){
				for (l = 0; l < boat.len; l++){
					if ($.inArray("#"+ t +"-"+alpha[axeX]+"-"+num[axeY + l], taken) != -1){
						poseAvailable = false;
					}
				};
			}

			if (poseAvailable != false){
				if (orientation == 1){
					for (k = 0; k < boat.len; k++){
						$("#"+ t +"-"+alpha[axeX + k]+"-"+num[axeY]).addClass(boat.name);
						$("#"+ t +"-"+alpha[axeX + k]+"-"+num[axeY]).addClass("boat");
						taken.push("#"+ t +"-"+alpha[axeX + k]+"-"+num[axeY]);
					};
				} else if (orientation == 2){
					for (l = 0; l < boat.len; l++){
						$("#"+ t +"-"+alpha[axeX]+"-"+num[axeY + l]).addClass(boat.name);
						$("#"+ t +"-"+alpha[axeX]+"-"+num[axeY + l]).addClass("boat");
						taken.push("#"+ t +"-"+alpha[axeX]+"-"+num[axeY + l]);
					};
				}
				posed = true;
			}
		} else {
			orientation = Math.floor((Math.random() * 2) + 1);
			axeX        = Math.floor((Math.random() * 10) + 1);
			axeY        = Math.floor((Math.random() * 10) + 1);
			posed 		= false;
		}
	}
};

function damage(coords){
	$(coords).removeClass("boat");
	if (p1Active){
		p2Life = p2Life - 1;
	} else if (p2Active){
		p1Life = p1Life - 1;
	}

	if (p1Life <= 0 && !cpuActive){
		swal({
		    title: 'Joueur 2 gagne !',
		    imageUrl: './images/win.gif',
		    imageWidth: 344,
		    imageHeight: 272,
			animation: false,
			showConfirmButton: false
		});
	} else if (p1Life <= 0 && cpuActive){
		swal({
		    title: 'CPU gagne !',
		    imageUrl: './images/fail.gif',
		    imageWidth: 480,
		    imageHeight: 272,
			animation: false,
			showConfirmButton: false
		});
	} else if (p2Life <= 0 && cpuActive){
		swal({
		    title: 'Joueur 1 gagne !',
		    imageUrl: './images/win.gif',
		    imageWidth: 344,
		    imageHeight: 272,
			animation: false,
			showConfirmButton: false
		});
	}
};