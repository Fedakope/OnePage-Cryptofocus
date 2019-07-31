// EXCHANGES 
var exchangeList = [];
function Exchange(id_exchange, name){
	this.Id_Exchange = id_exchange;
	this.Name = name;
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
	var name = document.querySelector('input[name="pickexchange"]:checked').value;
	new Exchange(1, name);
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
	var k = new Exchange(1, "kraken");
	var b = new Exchange(2, "binance");
	var p = new Exchange(3, "poloniex");


	var asset1 = new Asset(1, "kraken", "btc", 5, 12000, 150, 60000);
	var asset2 = new Asset(2, "kraken", "xrp", 5, 24000, "", 120000);
	var asset3 = new Asset(3, "kraken", "bch", 5, 6000, "", 3000);
	var asset4 = new Asset(4, "kraken", "eth", 20, 300, "", 6000);
	var asset5 = new Asset(5, "binance", "ada", 17000, "", 0.0045, 3000);
	var asset6 = new Asset(6, "binance", "xmr", 17000, "", 0.0045, 3000);
	var asset7 = new Asset(7, "binance", "dgb", 17000, "", 0.0045, 3000);
	var asset8 = new Asset(8, "poloniex", "dgb", 17000, "", 0.0045, 3000);
	var asset9 = new Asset(9, "poloniex", "dgb", 17000, "", 0.0045, 3000);

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


/*function GetExName(str) {
    return str.split('=')[1];
}
*/




