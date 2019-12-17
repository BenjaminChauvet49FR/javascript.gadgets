var mdp = [
"BDHP","JXMJ","ECBQ","YMCJ","TQKB","WNLD","FXQO","NHAG","KCRE","UVWS",
"CNPE","WVHI","OCKS","BTDY","COZQ","SKKK","AJMG","HMJL","MRHR","KGFP",
"UGRW","WZIN","HUVE","UNIZ","PQGV","YVYJ","IGGZ","UJDO","QGOL","BQZP",
"RYMS","PEFS","BQSN","NQFI","VDTM","NXIS","VQNK","BIFA","ICXY","YWFH",
"GKWD","LMFU","UJDP","TXHL","OVPZ","HDQJ","LXPP","JYSF","PPXI","QBDH",
"IGGJ","PPHT","CGNX","ZMGC","SJES","FCJE","UBXU","YBLT","BLDM","ZYVI",
"RMOW","TIGW","GOHX","IJPQ","UPUN","ZIKZ","GGJA","RTDI","NLLY","GCCG",
"LAJM","EKFT","QCCR","MKNH","MJDV","NMRH","FHIC","GRMO","JINU","EVUG",
"SCWF","LLIO","OVPJ","UVEO","LEBX","FLHH","YJYS","WZYV","VCZO","OLLM",
"JPQG","DTMI","REKF","EWCS","BIFQ","BIFQ","IOCS","TKWD","XUVU","QJXR",
"RPIR","VDDU","PTAC","KWNL","YNEG","NXYB","ECRE","LIOC","KZQR","XBAO",
"KRQJ","NJLA","PTAS","JWNL","EGRW","HXMF","FPZT","OSCW","PHTY","FLXP",
"BPYS","SJUM","YKZE","TASX","MYRT","QRLD","JMWZ","FTLA","HEAN","XHIZ",
"FIRD","ZYFA","TIGG","XPPH","LYWO","LUZL","HPPX","LUJT","VLHH","SJUK",
"MCJE","UCRY","OKOR","GVXQ","TONY","JHEN","COZA","RGSK","DIGW"
];
var longueurMDP = 149;

var i,j,k;

var nbOccurences = [],nbOccurencesUniques = [],
nbOccurencesOrdre = [];
for(i=0;i<26;i++){
	nbOccurences.push(0);
	nbOccurencesUniques.push(0);
}

for(i=0;i<4;i++){
	nbOccurencesOrdre.push([0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0,0]);
}

var nbOccurencesCroisees = new Array(26);
var nbOccurencesUniquesCroisees = new Array(26);
for(i=0;i<26;i++){
	nbOccurencesCroisees[i] = new Array(26);
	nbOccurencesUniquesCroisees[i] = new Array(26);
	for(j=0;j<26;j++){
		nbOccurencesCroisees[i][j] = 0;
		nbOccurencesUniquesCroisees[i][j] = 0;
	}
}



var posA = 65; //Position du caractère 'A'

function positionApresA(caractere){
	console.log(caractere);
	return caractere.charCodeAt(0)-posA;
} // A=>0, Z=>25

function caractere(position){
	return String.fromCharCode(position+posA);
} // 0=>A, 25=>Z


/*---Tricroisées---*/

var etiquettesTricroisees = [];
var nbOccurencesTricroisees = [];
var nbOccurencesUniquesTricroisees = [];


for(i=0;i<26;i++){
	for(j=i;j<26;j++){
		for(k=j;k<26;k++){
			etiquettesTricroisees.push(caractere(i)+caractere(j)+caractere(k));	
			nbOccurencesTricroisees.push(0);
			nbOccurencesUniquesTricroisees.push(0);
		}
	}
}//Oups ! J'avais tenté de définir ce tableau AVANT les fonctions positionApresA et caractere et ça n'a pas fonctionné sans que je comprenne pourquoi.



//On suppose 0 <= pos1 <= pos2 <= pos3 <= 25. On veut la position d'un ensemble de 3 lettres dans l'ordre suivant : AAA => 0, AAB => 1... AAZ => 25, ABB = 26, ABC = 27, ... ABZ = 50 ; ACC = 51. Etc...
// Recherches : prendre le complémentaire de chaque lettre (0,0,0 => 25,25,25)
// Résultat = (nombre de combinaisons-1 (3275))-nombre pyramidal(1er chiffre complémentaire)-nombre triangulaire(2nd chiffre)-nombre (dernier chiffre)
//Exemples : XZZ => C,A,A => 2,0,0 => 3275-4 = 3271
function positionner(tableau){
	var apos1 = 25-tableau[0], apos2 = 25-tableau[1], apos3 = 25-tableau[2];
	return 26*27*28/6-1 - apos1*(apos1+1)*(apos1+2)/6 - apos2*(apos2+1)/2 - apos3;
}

function rangerNombres(a,b){
	return(a-b);
}

/*---Comptage---*/

function compter(){
	var mot;
	var pos = new Array(4); //Positions dans l'alphabet des 4 lettres de mot. (mot = "ABCD" => pos = [0,1,2,3])
	var k;
	var position; //Sert dans les occurences croisées tricroisées
	var pris; //Sert dans les occurences Uniques
	
	for(i=0;i<longueurMDP;i++){
		mot = mdp[i];
		
		//augmenter l'occurence des lettres
		pris = [];
		for(j=0;j<4;j++){
			pos[j] = positionApresA(mot.charAt(j));
			nbOccurences[pos[j]]++;
			nbOccurencesOrdre[j][pos[j]] ++;
			if (pris.indexOf(pos[j]) == -1){
				pris.push(pos[j]);
				nbOccurencesUniques[pos[j]]++;
			}	
		}

		//A partir de maintenant, pos est ordonné
		pos.sort(rangerNombres);
		
		//augmenter les 6 occurences croisées 
		pris = [];
		for(j=0;j<4;j++){	
			for(k=0;k<j;k++){
				nbOccurencesCroisees[pos[j]][pos[k]]++;
				if (pos[j] != pos[k])
					nbOccurencesCroisees[pos[k]][pos[j]]++;
				position = positionner([0,pos[k],pos[j]]);
				if (pris.indexOf(position) == -1){
					pris.push(position);
					nbOccurencesUniquesCroisees[pos[j]][pos[k]]++;
					if (pos[j] != pos[k])
						nbOccurencesUniquesCroisees[pos[k]][pos[j]]++;						
				}
			}
		}
		
		//augmenter les 4 occurences tricroisées

			
		position = positionner([pos[0],pos[1],pos[2]]);
		nbOccurencesTricroisees[position]++;
		nbOccurencesUniquesTricroisees[position]++;
		pris=[position];
		
		position = positionner([pos[0],pos[1],pos[3]]);
		nbOccurencesTricroisees[position]++;
		if(pris.indexOf(position) == -1){
			pris.push(position);
			nbOccurencesUniquesTricroisees[position]++;
		}
		position = positionner([pos[0],pos[2],pos[3]]);
		nbOccurencesTricroisees[position]++;
		if(pris.indexOf(position) == -1){
			pris.push(position);
			nbOccurencesUniquesTricroisees[position]++;
		}
		
		position = positionner([pos[1],pos[2],pos[3]]);
		nbOccurencesTricroisees[position]++;
		if(pris.indexOf(position) == -1){
			pris.push(position);
			nbOccurencesUniquesTricroisees[position]++;
		}
		
	}
}


/*function trierSelonIndex(tableau,aIndex){
	var v = new Array(26);
	for(i=0;i<26;i++){
		v[i] = {index : i,valeur : tableau[aIndex][i]};
	}
	v.sort(function(a,b){
		return a.valeur-b.valeur;
	});
	return v;
}*/



/*Partie HTML*/
function ajouterTDaTR(noeudTR,texte){
	noeudTD = document.createElement("td");
	noeudTD.appendChild(document.createTextNode(texte));
	noeudTR.appendChild(noeudTD);
}

function ajouterOccurences(noeudTableau,tNb,tNbUniques,tNbOrdre){
	
	var noeudTR,noeudTD,noeudTD2;	
	noeudTR = document.createElement("thead");
	ajouterTDaTR(noeudTR,"Lettre");
	ajouterTDaTR(noeudTR,"Occ/uniq");
	ajouterTDaTR(noeudTR,"En 1");
	ajouterTDaTR(noeudTR,"En 2");
	ajouterTDaTR(noeudTR,"En 3");
	ajouterTDaTR(noeudTR,"En 4");	
	noeudTableau.appendChild(noeudTR);
	
	for(i=0;i<26;i++){
		noeudTR = document.createElement("tr");
		
		ajouterTDaTR(noeudTR,String.fromCharCode(posA+i));	
		ajouterTDaTR(noeudTR,tNb[i]+"/"+tNbUniques[i]);
			
		for(j=0;j<4;j++)
			ajouterTDaTR(noeudTR,tNbOrdre[j][i]);	
		noeudTableau.appendChild(noeudTR);	
	}
}

function ajouterOccurencesCroisees(noeudTableau,tNb,tNbUniques){
	var noeudTR,noeudTD,noeudTD2;	
	
	//1ère ligne
	noeudTR = document.createElement("thead");		
	ajouterTDaTR(noeudTR,"-");
	for(i=0;i<26;i++){
		ajouterTDaTR(noeudTR,String.fromCharCode(posA+i));
	}
				
	noeudTableau.appendChild(noeudTR);	

	//26 lignes suivantes
	for(i=0;i<26;i++){
		noeudTR = document.createElement("tr");
		ajouterTDaTR(noeudTR,String.fromCharCode(posA+i));			
		for(j=0;j<26;j++){
			noeudTD = document.createElement("td");
			noeudTD.appendChild(document.createTextNode(tNb[i][j]));
			//if(tNbUniques != undefined){
				noeudTD.innerHTML+="/"+tNbUniques[i][j];
				
			//}
			if (i==j){
				noeudTD.innerHTML+= '('+caractere(i)+')';
				noeudTD.style.MozBoxShadow = "inset 0 0 5px #ff00ff";
				noeudTD.style.WebkitBoxShadow = "inset 0 0 5px #ff00ff";
				noeudTD.style.boxShadow = "inner 1px 1px 5px #ff00ff";
			}
			noeudTR.appendChild(noeudTD);
		}
		noeudTableau.appendChild(noeudTR);			
	}
	
}

var idTotal = -1; //ID du tableau : 0 occurences, 1 croisées, 2 tricroisées (à implémenter le 2) 
var indiceTotal = -1; //indice colonne du tableau javascript sur laquelle trier
var sens = 1;
var uniqueTotal = -1; //-1 : indéfini. 0 : quelconque. 1 : unique.

function ajouterEventListenersTDTableau(){
	
	function ordonnerTDselonIndiceEtTableau(id,indice,noeudHTMLTableau,tableau,u) {
		return(	
			function(){			
				sens = (((indiceTotal == indice) && (uniqueTotal == u) && (id == idTotal)) ? -sens : 1);
				indiceTotal = indice;
				uniqueTotal = u;
				idTotal = id;

				var listeTri = new Array(26);
				for(j=0;j<26;j++){
					listeTri[j] = {cle:j,valeur:tableau[j]}
				}
				listeTri.sort(function(a,b){
					return((a.valeur-b.valeur)*sens);
				});	
				
				var noeudsTR = [];
				for(j=0;j<26;j++)
					noeudsTR.push(noeudHTMLTableau.children[j+1]);
				noeudsTR.sort(function(a,b){
					if (a.children[0].innerHTML>b.children[0].innerHTML)
						return 1;
					if (a.children[0].innerHTML<b.children[0].innerHTML)
						return -1;
					return 0;
				});
				
				
				for(j=0;j<26;j++){
					noeudHTMLTableau.appendChild(noeudsTR[listeTri[j].cle]); //Chaque noeud est un objet. L'append, c'est le déplacer.
				}
			}
		);
		
	}
	
	var o = document.getElementById("occurencesTable");
	o.children[0].children[1].addEventListener('click',
		ordonnerTDselonIndiceEtTableau(0,1,o,nbOccurences,0)
	);
	o.children[0].children[1].addEventListener('contextmenu',
		function(e){
			e.preventDefault();
		}
	);
	o.children[0].children[1].addEventListener('contextmenu',
		ordonnerTDselonIndiceEtTableau(0,1,o,nbOccurencesUniques,1)		
	);	
	for(var indexO=0;indexO<4;indexO++)	
		o.children[0].children[indexO+2].addEventListener('click',
			ordonnerTDselonIndiceEtTableau(0,indexO,o,nbOccurencesOrdre[indexO],0)
		);
	
	
	var oc = document.getElementById("occurencesCroiseesTable");
	for(var indexOC=0;indexOC<26;indexOC++){	
		oc.children[0].children[indexOC+1].addEventListener('click',
			ordonnerTDselonIndiceEtTableau(1,indexOC,oc,nbOccurencesCroisees[indexOC],0)
		);
		oc.children[0].children[indexOC+1].addEventListener('contextmenu',
			function(e){
				e.preventDefault();
			}
		);
		oc.children[0].children[indexOC+1].addEventListener('contextmenu',
			ordonnerTDselonIndiceEtTableau(1,indexOC,oc,nbOccurencesUniquesCroisees[indexOC],1)	
		);	
	}//for
}

function contient(mot,valeurLettres,longueur){
	var i = 0,j; //i index sur valeurLettres, j index sur mot
	var correct = true,correct2;
	var disponible = [true,true,true,true];
	while ((i<longueur) && correct){
		j=0;
		correct2 = false;
		
		while(j<4 && !correct2){
			if (mot.charAt(j) == valeurLettres.charAt(i) && disponible[j]){
				correct2 = true;
				disponible[j] = false;	
			}
			j++;
		}
		correct = correct2;
		i++;
	}
	return correct;
}

function ajouterEventListenerTableauTricroisees(noeudTableau,tEtiq,tNb,tNbUniques,minInput,lettresInput){
	
	if (!(/\d+/.test(minInput.value)))
		minInput.value = 0;
	var valeurMin = minInput.value;
	
	if (!/^[A-Z]{0,3}$/.test(lettresInput.value))
		minLettres.value = "";
	var valeurLettres = lettresInput.value, longueur = valeurLettres.length;
	
	var noeudTR;

	noeudTableau.innerHTML="";	
	for(i=0;i<tNb.length;i++){
		if (tNb[i]>=valeurMin && contient(tEtiq[i],valeurLettres,longueur)){
			noeudTR = document.createElement("tr");
			ajouterTDaTR(noeudTR,tEtiq[i]);	
			ajouterTDaTR(noeudTR,tNb[i]+"/"+tNbUniques[i]);	
			noeudTableau.appendChild(noeudTR);
		}
	}
}

/*Fonction principale, où tout se joue*/
(function(){
	//Comptage général
	compter();

	//Gestion de la partie des occurences 
	var o = document.getElementById("occurencesTable");
	ajouterOccurences(o,nbOccurences,nbOccurencesUniques,nbOccurencesOrdre);	
		
	//Gestion de la partie des occurences croisées 
	var oc = document.getElementById("occurencesCroiseesTable");
	ajouterOccurencesCroisees(oc,nbOccurencesCroisees,nbOccurencesUniquesCroisees);	
	ajouterEventListenersTDTableau();
	
	//Gestion de la partie des occurences tricroisées
	var otcMinInput = document.getElementById('occurencesTricroiseesMinInput');
	var otcLettresInput = document.getElementById('occurencesTricroiseesLettresInput');
	var otcForm = document.getElementById('occurencesTricroiseesForm');
	var otcTable = document.getElementById('occurencesTricroiseesTable');
	otcForm.addEventListener('submit',function(e){
		ajouterEventListenerTableauTricroisees(otcTable,etiquettesTricroisees,nbOccurencesTricroisees,nbOccurencesUniquesTricroisees,otcMinInput,otcLettresInput);
		e.preventDefault();
	});
	
})();