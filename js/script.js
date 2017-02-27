$(document).ready(
	function(){
		init();
	});

function init(){

	var alpha = [0, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	var num   = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// Tableau 1
	for (i = 0; i < 11; i++){
		if (i == 0){

			$("#t1").append("<tr>");

				for (j = 0; j < 11; j++){
				$("#t1").append("<th class='" + alpha[j]+  " axe '>");
				$("#t1 ." + alpha[j]).append("<p>" + alpha[j] + "<p>");
				$("#t1").append("</th>");
			}
				

			$("#t1").append("</tr>");
		} else {

			$("#t1").append("<tr>");
		
			for (k = 0; k < 11; k++){

				var dataT1 =  " onclick='alertf(\"t1\",\""+ alpha[k] +"\", \""+ num[i] +"\")'" ;
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
	for (i = 0; i < 11; i++){
		if (i == 0){

			$("#t2").append("<tr>");

				for (j = 0; j < 11; j++){
				$("#t2").append("<th class='" + alpha[j]+  " axe '>");
				$("#t2 ." + alpha[j]).append("<p>" + alpha[j] + "<p>");
				$("#t2").append("</th>");
			}
				

			$("#t2").append("</tr>");
		} else {

			$("#t2").append("<tr>");
		
			for (k = 0; k < 11; k++){

				var dataT2 =  " onclick='alertf(\"t2\",\""+ alpha[k] +"\", \""+ num[i] +"\")'" ;
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

function alertf(t, x, y){
	//alert("#"+t+"-"+x+"-"+y);
	//$("#"+t +" .case ."+x+"-"+y).addClass("cross");
	$("#"+t+"-"+x+"-"+y).css("background-image", "url('./images/cross.png')");
	$("#"+t+"-"+x+"-"+y).css("background-size", "100% 100%");
};