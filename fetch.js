// FETCH
function FetchPrices() {
	fetch('https://api.cryptonator.com/api/ticker/btc-eur')
	.then(function (response) {
		response.json()
		.then(function (value) {
			console.log("Prix BTC/EUR : " + value.ticker.price);
			console.log("Variation : " + value.ticker.change);
		});
	});
}

