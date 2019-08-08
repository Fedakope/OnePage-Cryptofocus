// FETCH
var pricesList = {};
// fetch ticker example
function FetchPrices2() {
	fetch('https://api.cryptonator.com/api/ticker/btc-eur')
	.then(function (response) {
		response.json()
		.then(function (value) {
			console.log("Prix BTC/EUR : " + value.ticker.price);
			console.log("Variation : " + value.ticker.change);
		});
	});
}


// recupere la liste de toutes les monnaies (les Coins de Asset) formaté pour aller fetché
function GetCoinsListToFetch() {
	var pairsList = []
	for (asset of assetList) {
		pairsList.push(asset.Coin)
	}
	pairsList = [...new Set(pairsList)]; // supprime les doublons
	pairsList = pairsList.map(a => a.toUpperCase()); // passe en majuscule
	var coinlist="";
	for (coin of pairsList) { // concatenne et mets une virgule
		coinlist += coin+","
	}

	coinlist = coinlist.slice(0, -1); // supprime le dernier caractère (,)
	return coinlist
}



// fetch les prix de toutes les coins de asset

 function FetchPrices() {
	return new Promise(function(resolve, reject) {
		console.log("j'entre dans FetchPrices")
		var call = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms='+ GetCoinsListToFetch() + '&tsyms=BTC,USD,EUR&api_key=440f35b466d7a82c3f7f94fd64f6436155c272410055baa6d4b58517d610476c';
		fetch(call)
		.then(function (response) {
			response.json()
			.then(function (value) {
				console.log("je suis dans le .then du fetch")
				var v = value
				pricesList = v;
				console.log(v);
				console.log("fin du fetch")
				resolve()
			});
		});
	})
}


function UpdatePrices() {
	console.log("j'entre dans UpdatePrices")
	console.log(assetList)
	for (asset of assetList) {
		var tempName = asset.Coin
		tempName = tempName.toUpperCase()
		var temppbtc = pricesList[tempName].BTC
		var temppeur = pricesList[tempName].EUR
		asset.Prixeuro = temppeur
		asset.Prixbtc = temppbtc
		asset.Totaleuro = asset.Quantity * asset.Prixeuro
	}

}




function Test () {
	console.log("j'entre dans test")
	var promise = new Promise(function(resolve, reject) {
		Texte();

		resolve();
	})
	console.log("fin de Test, hors block promise")
	return promise;
}




async function Test2 () {
	console.log("j'entre dans test2");
	await FetchPrices().then(()=>UpdatePrices())
	GeneratePage();
}


function Texte() {
	console.log("bla bla bla")
	console.log("et re bla bla bla")
}