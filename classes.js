// EXCHANGES 
var exchangeList = [];
function Exchange(id_exchange, name, listing){
	id_exchange = GetExchangeMaxId()+1
	this.Id_Exchange = id_exchange;
	this.Name = name;
	this.Listing = listing
	exchangeList.push(this);

	this.Assets = function() {
		lst = [];
		temp = this.Name	
		assetList.forEach(function(element){
			if (element.Exchange == temp) {
				lst.push(element)
			}
		});
		return lst;
	}
}


function ListExchanges(){
	exchangeList.forEach(function(element) {
		console.log(element);
	});
}


function CreerExchange(name){
	var xc = {"Bitcoin": "BTC", "Augur": "REP", "Bitcoin Cash": "BCH", "Cardano": "ADA", "Cosmos" : "ATOM", "Dash" : "DASH", "Dogecoin" : "DOGE", 
"EOS" : "EOS", "Ethereum" : "ETH", "Ethereum Classic" : "ETC", "Gnosis" : "GNO", "Litecoin": "LTC", "Monero":"XMR", "Qtum":"QTUM", 
"Ripple":"XRP", "Stellar Lumens":"XML", "Tether (Omni Layer)":"USDT", "Tezos":"XTZ", "Watermelon":"MLN", "Zcash":"ZEC"};
	var name = document.querySelector('input[name="pickexchange"]:checked').value;
	new Exchange(1, name, xc);
	// Swal.fire(name + " a bien été ajouté à la liste de vos exchanges");
	Swal.fire({
		type: 'success',
		title: 'Votre echange a bien été ajouté',
		showConfirmButton: false,
		timer: 1500
	})
}




// ASSETS 
var assetList = [];
function Asset (id_asset, exchange, coin, quantity, prixeuro, prixbtc, totaleuro) {
	id_asset = GetAssetMaxId()+1
	this.Id_Asset = id_asset
	this.Exchange = exchange;
	this.Coin = coin;
	this.Quantity = quantity;
	this.Prixeuro = prixeuro;
	this.Prixbtc = prixbtc;
	this.Totaleuro = totaleuro;
	assetList.push(this);

}

function ListAssets(){
	assetList.forEach(function(element) {
		console.log(element) //.Quantity + " " + element.Coin + " sur " + element.Exchange);
	});
}

/*function CreerAsset(exchange, coin, quantity, prixeuro, prixbtc, totaleuro){
	var coin = document.querySelector('input[name="pickcrypto"]:checked').value;
	var qty = document.getElementById("quantity").value
	var exchange = PathName();
	console.log(qty);
	new Asset(exchange, coin, qty, 500, "", 6000)
	Swal.fire({
		title: 'Confirmer ajout ?',
		text: "Vous allez ajouter " + AddQuantity() + " " + AddAsset() + " à exchange" + exchange,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Oui, ajouter !'
	}).then((result) => {
		if (result.value) {
			Swal.fire(
				'Ajouté',
				'Votre crypto a bien été ajouté à lexchange',
				'success'
				)
		}
	})
}*/


function NewAsset() {
	var exchange = RecupereElementTableauEx(exchangeList, id_exchangeTemp);
	var coin = document.querySelector('input[name="pickcrypto"]:checked').value;
	var qty = document.getElementById("quantity").value
	new Asset(1, exchange.Name, coin, qty, 500, "", 6000)
	Swal.fire({
		type: 'success',
		title: 'Votre asset a bien été ajouté',
		showConfirmButton: false,
		timer: 1500
	})
}




// INJECTION
function Injection() {
	exchangeList.forEach(function(element){		
		document.getElementById("testbox").innerHTML += `<h2> ${element.Name + element.Assets()} </h2>`
	});
}



// SEEDS

function Seeds() {
	assetList = [];
	exchangeList = [];

	var kc = {"KrakenCoin": "KRC", "Augur": "REP", "Bitcoin Cash": "BCH", "Cardano": "ADA", "Cosmos" : "ATOM", "Dash" : "DASH", "Dogecoin" : "DOGE", 
"EOS" : "EOS", "Ethereum" : "ETH", "Ethereum Classic" : "ETC", "Gnosis" : "GNO", "Litecoin": "LTC", "Monero":"XMR", "Qtum":"QTUM", 
"Ripple":"XRP", "Stellar Lumens":"XML", "Tether (Omni Layer)":"USDT", "Tezos":"XTZ", "Watermelon":"MLN", "Zcash":"ZEC"};   

	var bc = {"Biannce Coin": "BNB", "Augur": "REP", "Bitcoin Cash": "BCH", "Cardano": "ADA", "Cosmos" : "ATOM", "Dash" : "DASH", "Dogecoin" : "DOGE", 
"EOS" : "EOS", "Ethereum" : "ETH", "Ethereum Classic" : "ETC", "Gnosis" : "GNO", "Litecoin": "LTC", "Monero":"XMR", "Qtum":"QTUM", 
"Ripple":"XRP", "Stellar Lumens":"XML", "Tether (Omni Layer)":"USDT", "Tezos":"XTZ", "Watermelon":"MLN", "Zcash":"ZEC"}; 

	var pc = {"Polocoin": "PLC", "Augur": "REP", "Bitcoin Cash": "BCH", "Cardano": "ADA", "Cosmos" : "ATOM", "Dash" : "DASH", "Dogecoin" : "DOGE", 
"EOS" : "EOS", "Ethereum" : "ETH", "Ethereum Classic" : "ETC", "Gnosis" : "GNO", "Litecoin": "LTC", "Monero":"XMR", "Qtum":"QTUM", 
"Ripple":"XRP", "Stellar Lumens":"XML", "Tether (Omni Layer)":"USDT", "Tezos":"XTZ", "Watermelon":"MLN", "Zcash":"ZEC"}; 
	
	var k = new Exchange(GetExchangeMaxId(), "kraken", kc);
	var b = new Exchange(GetExchangeMaxId(), "binance", bc);
	var p = new Exchange(GetExchangeMaxId(), "poloniex", pc);


	var asset1 = new Asset(GetAssetMaxId(), "kraken", "btc", 5, 12000, 150, 60000);
	var asset2 = new Asset(GetAssetMaxId(), "kraken", "xrp", 5, 24000, "", 120000);
	var asset3 = new Asset(GetAssetMaxId(), "kraken", "bch", 5, 6000, "", 3000);
	var asset4 = new Asset(GetAssetMaxId(), "kraken", "eth", 20, 300, "", 6000);
	var asset5 = new Asset(GetAssetMaxId(), "binance", "ada", 17000, "", 0.0045, 3000);
	var asset6 = new Asset(GetAssetMaxId(), "binance", "xmr", 17000, "", 0.0045, 3000);
	var asset7 = new Asset(GetAssetMaxId(), "binance", "dgb", 17000, "", 0.0045, 3000);
	var asset8 = new Asset(GetAssetMaxId(), "poloniex", "dgb", 17000, "", 0.0045, 3000);
	var asset9 = new Asset(GetAssetMaxId(), "poloniex", "dgb", 17000, "", 0.0045, 3000);

	console.log("Seeds done : 3 exchanges, 9 assets")
}


// PATH NAME 

function PathName() {
	path = window.location
	var pathname = path.href
	exname = pathname.split('=')[1]
	document.getElementById("pathtestbox").innerHTML = exname
	return exname
	
}


//Gestion des IDs TODO
function GetAssetMaxId() {
	if(assetList.length !== 0) {
		let max = assetList[0].Id_Asset;
		for (asset of assetList) {
			if (asset.Id_Asset > max) {
				max = asset.Id_Asset;	
			}
		}
		return max;
	} else {
		return 0 
	}
}


function GetExchangeMaxId() {
	if(exchangeList.length !== 0) {
		let max = exchangeList[0].Id_Exchange;
		for (asset of exchangeList) {
			if (asset.Id_Exchange > max) {
				max = asset.Id_Exchange;	
			}
		}
		return max;
	} else {
		return 0 
	}
}



/*function GetExName(str) {
    return str.split('=')[1];
}
*/




