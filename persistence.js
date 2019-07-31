// SAVE EXCHANGE
function SaveExchange() {
	sessionStorage.setItem("tableauExchange", JSON.stringify(exchangeList));
	console.log("echanges saved")
}


// LOAD EXCHANGE
function LoadExchange() {
	var loadedexchange = JSON.parse(sessionStorage.getItem("tableauExchange"));
	exchangeList = loadedexchange
	return loadedexchange
};





exchangeList3 = [];


// exchangeList = LoadExchange();
// comme exchangeList ne veut pas changer je mets dans exchangeList2 : 
//window.onload = function() {
//}
// exchangeList2 = LoadExchange();

function ToEx() {
	var exchangeListTemp = []
	for (var i = exchangeList.length - 1; i >= 0; i--) {
		var name =  exchangeList[i].Name
		var p = new Exchange(exchangeList[i].Name);	
		exchangeListTemp.push(p);
	}
	exchangeList = exchangeListTemp
}




// SAVE ASSET 
function SaveAsset() {
	sessionStorage.setItem("tableauAsset", JSON.stringify(assetList));
	console.log("asset saved")
}

// LOAD ASSET
function LoadAsset() {
	var loadedasset = JSON.parse(sessionStorage.getItem("tableauAsset"));
	assetList = loadedasset
	return loadedasset		
};

// assetList = LoadAsset();
// comme assetList ne veut pas changer je mets dans assetList2 : 

// assetList = LoadAsset()
// assetList3 = [];

function ToAsset() {
	var assetListTemp = []
	for (var i = assetList.length - 1; i >= 0; i--) {
		var exchange =  assetList[i].Exchange
		var coin = assetList[i].Coin;
		var quantity = assetList[i].Quantity;
		var prixeuro = assetList[i].Prixeuro;
		var prixbtc = assetList[i].Prixbtc;
		var totaleuro = assetList[i].Totaleuro;

		var p = new Asset(exchange, coin, quantity, prixeuro, prixbtc, totaleuro);
		assetListTemp.push(p);
	}
		assetList = assetListTemp

}	
