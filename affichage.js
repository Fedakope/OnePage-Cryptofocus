var id_exchangeTemp;
$(".js-example-placeholder-single").select2({
	placeholder: "Select a state",
	allowClear: true
});






$(document).ready(function() {
	GenerationTableauExchanges(exchangeList,$("#tblExchangesBody"));





	$("#seedbutton").on("click", function() {	
		Seeds();
		GeneratePage();
	});

	$("#modalexokbutton").on("click", function() {	
		CreerExchange()
		GeneratePage()
	});

	$("#newassetokbutton").on("click", function() {	
		NewAsset();	
		GeneratePage()
	});	


	$("#Doit").on("click", function() {	
	FetchPrices()
	});	

	$("#Doit2").on("click", function() {	
		Test2();
	});




});









// Generation tableau des echanges avec liens add asset
function GenerationTableauExchanges(tableauDeDonnees) {
	$("#tblExchangesBody").empty();
	for(exchange of tableauDeDonnees) {
		let ligne = $("<tr></tr>");	
		ligne.append($("<td></td>").html(exchange.Id_Exchange));	
		ligne.append($("<td></td>").html(exchange.Name));	
		ligne.append($("<td></td>").append($("<button></button>")
			.addClass('btn btn-link update').attr("data-idExchange", exchange.Id_Exchange).html("Ajouter un asset") ))
		$("#tblExchangesBody").append(ligne);
	}
}


// Generation tableau des assets avec liens modifier
function GenerationTableauAssets(assetList) {
	$("#tblAssetsBody").empty(); // clean le tableau
	for (var i = 0; i < assetList.length; i++) {
		let ligne = $("<tr></tr>");
		ligne.append($("<td></td>").text(assetList[i].Id_Asset));
		ligne.append($("<td></td>").text(assetList[i].Exchange));
		ligne.append($("<td></td>").text(assetList[i].Coin));
		ligne.append($("<td></td>").text(assetList[i].Quantity));
		ligne.append($("<td></td>").text(assetList[i].Prixeuro));
		ligne.append($("<td></td>").text(assetList[i].Prixbtc));
		ligne.append($("<td></td>").text(assetList[i].Totaleuro));
		ligne.append($("<td></td>").append($("<button></button>")
			.addClass('btn btn-link update').attr("data-idAsset",  assetList[i].Id_Asset).html("Modifier") ))
		$("#tblAssetsBody").append(ligne);

	}
}

// GENERATION ASSETS FINAL - a faire apres generation tableau global 
function GenerationTableauAssetsGlobal() {
	for (var i=0; i < exchangeList.length;i++) {
		var q = exchangeList[i]
		let chaine = "#tblAssetsBody"+ q.Name
			let assetList = q.Assets() //pour remplir chaque case d'exchanges
		$("#tblAssetsBody"+ q.Name).empty(); // clean le tableau
		for (var j = 0; j < assetList.length; j++) {
			let ligne = $("<tr></tr>");
			//ligne.append($("<td></td>").text(assetList[j].Id_Asset));
			//ligne.append($("<td></td>").text(assetList[j].Exchange));
			ligne.append($("<td></td>").text(assetList[j].Coin));
			ligne.append($("<td></td>").text(assetList[j].Quantity));
			ligne.append($("<td></td>").text(assetList[j].Prixeuro));
			ligne.append($("<td></td>").text(assetList[j].Prixbtc));
			ligne.append($("<td></td>").text(assetList[j].Totaleuro));
			ligne.append($("<td></td>").append($("<button></button>")
				.addClass('btn btn-link update').attr("data-idAsset",  assetList[j].Id_Asset).html("Modifier") ))
			$("#tblAssetsBody"+ q.Name).append(ligne);
		}
	}
}


// generation globale
function GeneratePage() {
	GenerationTableauGlobal();
	GenerationTableauAssetsGlobal();

} 	

// generation nom d'exchange + header tableau asset 
function GenerationTableauGlobal() {
	document.getElementById("injectexchangehere").innerHTML = ""

	for (var i=0; i < exchangeList.length;i++)
	{
		var p = exchangeList[i];


		document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p style="font-size :40px; text-transform: capitalize;"> ${p.Name} <p>`;
		document.getElementById("injectexchangehere").innerHTML +=
		`
		<table class="table table-hover" id="tblAssets">
		<thead>
		<tr>
		
		<th scope="col">Coin</th>
		<th scope="col">Quantity</th>
		<th scope="col">Prixeuro</th>
		<th scope="col">Prixbtc</th>
		<th scope="col">Totaleuro</th>
		<th scope="col">Modifier</th>
		</tr>
		</thead>
		<tbody id="tblAssetsBody${p.Name}">
		</tbody>
		</table>
		`	


		$("#injectexchangehere").append($("<button></button>")
			.addClass('btn btn-link upasset').attr({
				"data-idExchange": p.Id_Exchange,
				"data-toggle": "collapse",
				"data-target": "#collapseExample"+p.Name,   // cible le bon collapse pour chaque exchange
				"aria-expanded": "false",
				"aria-controls": "collapseExample"

			}).html("Ajouter un asset"))



		//inject les listes deroulantes avec les coins de chaque exchanges 
		document.getElementById("injectexchangehere").innerHTML += `<div class="collapse" id="collapseExample${p.Name}">
		<div class="card card-body">


		
		<div class="container" style="margin-top: 20px;">
		<div class="row">
		<div class="col-sm" style="text-align: right;">
		<label for="favorite-animal">Monnaie : </label>
		</div>
		<div class="col-sm" style="">
		<select class="js-example-basic-single" id="focusaddasset${p.Name}" name="state">
		</select>
		</div>
		<div class="col-sm" style="text-align: right;">
		<label for="favorite-animal2">Quantité : </label>
		</div>
		<div class="col-sm">
		<input class="form-control" type="number" id="quantity${p.Name}">
		</div>
		<div class="col-sm">
		<button type="button" id="okbuttonaddasset" nomex="${p.Name}" class="btn btn-outline-success btn">Ajouter</button>
		</div>
		</div>
		</div>`

		for(var j in p.Listing) {
			document.getElementById(`focusaddasset${p.Name}`).innerHTML += `<option value="${p.Listing[j]}"> ${j} (${p.Listing[j]})</option>`
		}
		document.getElementById(`focusaddasset${p.Name}`).innerHTML += 	"</select> </div> </div>"


// on clik sur le couton valider pour ajouter un asset a un exchange
$("[nomex]").on("click", function() {
	console.log("hello World")
	var tempName = $(this).attr("nomex");
	console.log(tempName)
	var tempQty = ($("#quantity"+tempName).val())
	console.log(tempQty)
	var tempCoin = $('#focusaddasset'+tempName +' :selected').val();
	console.log(tempCoin)
	var tempAsset = new Asset(GetAssetMaxId(), tempName, tempCoin, tempQty, "", "", "");
	console.log(tempAsset)
	Swal.fire("asset bien ajouté ("+tempQty+tempCoin+"). Mettre swal de feu ici ou alert bootstrap")
	// AJOUTER ICI LES FETCH ET AFFICHA DES PRIX 
	GeneratePage()
})






} // fin cboucle for 	


} // fin fonction 







// update asset modal
$("#tblAssets tbody").on("click", ".update", function() {
	alert("je suis dans : // update asset modal")
	var id_asset = $(this).attr("data-idAsset");
	$("#UpdateAssetModal").modal("show");
	var asset = RecupereElementTableau(assetList, id_asset);
	$("#txtQtyUpdate").val(asset.Quantity);
	$("#updateassetokbutton").on("click", function() {
		var newqty = $("#txtQtyUpdate").val();
		asset.Quantity = newqty
		GenerationTableauExchanges(exchangeList);
		GenerationTableauAssets(assetList)
	});
});

var assetTemp;
var id_assetTemp ;
// update asset modal POUR TABLEAU FINAL
$("#injectexchangehere").on("click", ".update", function() {
	id_assetTemp = $(this).attr("data-idAsset");
	$("#UpdateAssetModal").modal("show");
	assetTemp = RecupereElementTableau(assetList, id_assetTemp);
	$("#txtQtyUpdate").val(assetTemp.Quantity);
	
});


$("#updateassetokbutton").on("click", function() {
	var newqty = $("#txtQtyUpdate").val();
	assetTemp.Quantity = newqty

	GeneratePage()
});

// add asset modal 
$("#tblExchanges tbody").on("click", ".update", function() {
	var id_exchange = $(this).attr("data-idExchange");
	id_exchangeTemp = $(this).attr("data-idExchange");
	var exchange = RecupereElementTableauEx(exchangeList, id_exchange);
	$("#AddAssetModal").modal("show");
	// var exchange = RecupereElementTableau(exchangeList, id_exchange);	
});



// add asset modal POUR TABLEAU FINAL
$("#injectexchangehere").on("click", ".upasset", function() {
	var id_exchange = $(this).attr("data-idExchange");
	id_exchangeTemp = $(this).attr("data-idExchange");
	var exchange = RecupereElementTableauEx(exchangeList, id_exchange);
	$('.js-example-basic-single').select2();
	// $("#AddAssetModal").modal("show"); A DECOMMENTER POUR REVENIR A LA MODAL D'AJOUT D'ASSET
});





function RecupereElementTableau(tableau, id) {
	var asset = tableau.find(element => element.Id_Asset == id);
	return asset;
}

function RecupereElementTableauEx(tableau, id) {
	var exchange = tableau.find(element => element.Id_Exchange == id);
	return exchange;
}




function DisplayEx() {
	document.getElementById("injectexchangehere").innerHTML = ""
	for (var i=0; i < exchangeList.length;i++)
	{
		var p = exchangeList[i];
		console.log("exchange " + i + " " + p.Name)
		document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> <a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`;
	}
}


function Display() {
	document.getElementById("injectexchangehere").innerHTML = ""
	for (var i=0; i < exchangeList.length;i++)
	{
		var p = exchangeList[i];
		console.log("exchange " + i + " " + p.Name)
		document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> <a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`;
	}
}



function DisplayAss() {
	document.getElementById("injectassethere").innerHTML = ""
	console.log("je suis dans DisplayAss")
	for (var i=0; i < assetList.length;i++)
	{
		var q = assetList[i];
		console.log("asset " + i + " sur " + q.Exchange)
		document.getElementById("injectassethere").innerHTML += `<p> Asset : ${q.Quantity} ${q.Coin} sur ${q.Exchange} valant ${q.Totaleuro} </p>`;
	}
}

function DisplayBoth() {
	document.getElementById("injectexchangehere").innerHTML = ""
	console.log("je suis dans DisplayBoth")
	console.log("taille de l'exchangeList : " + exchangeList.length)

	for (var i=0; i < exchangeList.length;i++)

	{

		var p = exchangeList[i];
		var assListTemp = []
		assListTemp = p.Assets()
		console.log("Pour " + exchangeList[i].Name + ", taille de la lst: " + assListTemp.length)




		document.getElementById("injectexchangehere").innerHTML += `
		<div class="exchangename">
		<p>${p.Name}</p>
		</div>
		`

		for (var j=0; j < assListTemp.length;j++) {
			console.log (`Sur l'exchange ${p.Name} il y'a ${assListTemp.length} asset(s) : ${assListTemp[i].Quantity} ${assListTemp[i].Coin} `)

			document.getElementById("injectexchangehere").innerHTML += `
			<div class="asset">
			<div class="logo">
			<img src="./images/crypto_logos/${assListTemp[i].Coin}.png" alt="bitcoin">
			</div>
			<div class="name">
			<p>${assListTemp[i].Coin}</p>
			</div>0
			<div class="quantity">
			<p>${assListTemp[i].Quantity}</p>
			</div>
			<div class="prixeur">
			<p>prixeur</p>
			</div>
			<div class="prixbtc">
			<p>0.2548641</p>
			</div>
			<div class="valoreur">
			<p>64 000 €</p>
			</div>
			</div>
			`
		}
		document.getElementById("injectexchangehere").innerHTML += `
		<div class="addasset">
		<div class="icone">
		<a href="addasset.html?name=${p.Name}"><img class="icoaddasset" src="./images/ico/add.png" alt="add asset"> Ajouter une cryptomonnaie sur ${p.Name} </a>
		</div>
		</div>
		`

	}
}

