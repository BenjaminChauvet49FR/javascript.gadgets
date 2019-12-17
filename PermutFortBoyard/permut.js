function aleatoire(a,b){
	return Math.floor(Math.random()*(b-a+1)+a);
}

function definirPermut(n){
	var i,j,alea,pos;
	var reste = n; //Nombre restant de lettres
	var reponse = new Array(n);
	for(i=0;i<n;i++){
		reponse[i] = -1;
	}
	for(i=0;i<n;i++){ //Glisser aléatoirement les valeurs A,B,... dans scrambleur.
		alea = aleatoire(1,reste);
		pos = 0;
		for(j=0;j<alea;j++){
			while(reponse[pos]!= -1)
				pos++;
			pos++;
		}
		reste--;
		pos--;
		reponse[pos]=i+1;
	}
	return reponse;
}

var taille = 10;
var permut = definirPermut(taille);
var chaine = ""
for(var k=0;k<taille/2;k++)
	chaine += permut[k]+" ";
chaine+="- ";
for(var k=taille/2;k<taille;k++)
	chaine += permut[k]+" ";
console.log(chaine);


