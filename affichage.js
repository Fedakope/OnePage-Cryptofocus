var id_exchangeTemp;

$(document).ready(function() {
	GenerationTableauExchanges(exchangeList,$("#tblExchangesBody"));

	$("#seedbutton").on("click", function() {	
		Seeds();
		GenerationTableauExchanges(exchangeList);
		GenerationTableauAssets(assetList)
	});

	$("#modalexokbutton").on("click", function() {	
		CreerExchange()
		GenerationTableauExchanges(exchangeList);
		GenerationTableauAssets(assetList)
	});

	$("#newassetokbutton").on("click", function() {	
		NewAsset();
		GenerationTableauExchanges(exchangeList);
		GenerationTableauAssets(assetList)
	});






});



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



// update asset modal
$("#tblAssets tbody").on("click", ".update", function() {

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


// add asset modal 
$("#tblExchanges tbody").on("click", ".update", function() {
	var id_exchange = $(this).attr("data-idExchange");
	id_exchangeTemp = $(this).attr("data-idExchange");
	var exchange = RecupereElementTableauEx(exchangeList, id_exchange);
	$("#AddAssetModal").modal("show");



	// var exchange = RecupereElementTableau(exchangeList, id_exchange);
	
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
	console.log("je suis dans DisplayEx")
	for (var i=0; i < exchangeList.length;i++)
	{
		var p = exchangeList[i];
		console.log("exchange " + i + " " + p.Name)
		document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> <a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`;
	}
}



/*function InjectExchange() {
	document.getElementById("injectexchangehere").innerHTML = ""
	console.log("Je suis dans la fonction InjectExchange")
	if (sessionStorage.getItem("tableauExchange")==null)
		var tableauExchange = []
	else
		var tableauExchange=JSON.parse(sessionStorage.getItem("tableauExchange"))

	console.log(tableauExchange)

	

	for (var i=0; i < tableauExchange.length;i++)
	{
		var p = tableauExchange[i];
		console.log("exchange " + i + " " + p.Name)
		document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> <a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`;
	}
}*/

/*function InjectAsset() {
	document.getElementById("injectassethere").innerHTML = ""
	console.log("Je suis dans la fonction InjectAsset")
	if (sessionStorage.getItem("tableauAsset")==null)
		var tableauAsset = []
	else
		var tableauAsset=JSON.parse(sessionStorage.getItem("tableauAsset"))

	console.log(tableauAsset)

	

	for (var i=0; i < tableauAsset.length;i++)
	{
		var q = tableauAsset[i];
		console.log("asset " + i + " " + q.Exchange)
		document.getElementById("injectassethere").innerHTML += `<p> Asset : ${q.Quantity} ${q.Coin} sur ${q.Exchange} valant ${q.Totaleuro} </p>`
	}
}*/

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
			// document.getElementById("injectexchangehere").innerHTML += `Sur l'exchange ${p.Name} il y'a ${assListTemp.length} assets : ${assListTemp[i].Quantity} ${assListTemp[i].Coin} `;
			/*document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> `;
			document.getElementById("injectexchangehere").innerHTML += `Sur l'exchange ${p.Name} il y'a ${assListTemp.length} asset(s) : ${assListTemp[i].Quantity} ${assListTemp[i].Coin} `
			document.getElementById("injectexchangehere").innerHTML += `<a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`*/

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

		// console.log (`Sur l'exchange ${p.Name} il y'a ${assListTemp.length} assets : ${assListTemp[0].Quantity} ${assListTemp[0].Coin} `)
		// document.getElementById("injectexchangehere").innerHTML += `<div class="exchange"> <p> Nom de l'exchange : ${p.Name} </p> <a href=addasset.html?name=${p.Name}> ajouter asset pour ${p.Name} </a> </div class="exchange">`;
		
		// document.getElementById("injectexchangehere").innerHTML += `Sur l'exchange ${p.Name} il y'a ${assListTemp.length} assets : ${assListTemp[0].Quantity} ${assListTemp[0].Coin} `;
	}
}
