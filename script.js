function Greetings() {
	Swal.fire("Bienvenue dans CryptoFocus")
}

function AddAsset () {
	var coin_name = document.querySelector('input[name="pickcrypto"]:checked').value;
	return coin_name
}

function AddQuantity() {
	var coin_quantity = document.getElementById("quantity").value
	return coin_quantity
}

function AddAssetValidation() {
	Swal.fire({
		title: 'Confirmer ajout ?',
		text: "Vous allez ajouter " + AddQuantity() + " " + AddAsset() + " à [exchange_name]",
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
}

function AddExchange () {
	var exchange_name = document.querySelector('input[name="pickexchange"]:checked').value;
	Swal.fire(exchange_name + " a bien été ajouté à la liste de vos exchanges")
}