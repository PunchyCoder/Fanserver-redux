
"use strict";

const url = "https://kitsu.io/api/edge/anime"; //data.attributes.posterImage
const APIKey = 'AIzaSyARlWxggTnR6mIMhHdyW2Bnf7BomchaBaE';

window.onload = function() {
	const elForm = document.getElementById("search-form");

	elForm.addEventListener('submit', function(e){
		submitForm(e);
			
	})
	document.addEventListener('keypress', function(e){
		if(e.which === 13) {
			submitForm(e);
		}
	})
}



function formatSearchResults(responseJson) {
	console.log(responseJson)
	console.log(responseJson['data'])
}


function formatQueryParams(params) {
	const queryItems = Object.keys(params)
	.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
	return queryItems.join('&');
}


// collect params, queryString, and send request
function runSearch(search) {

	const params = {
		'filter[text]': search,
		'page[limit]': 10,
		'page[offset]': 0,

	}
	const queryString = formatQueryParams(params)//formatQueryParams(params);

	console.log(queryString)

	const searchURL = url + '?' + queryString;

	fetch(searchURL)
	.then(response => response.json())
	.then(responseJson => {
		formatSearchResults(responseJson);
	})
}







function submitForm(e) {
	e.preventDefault();

	var elInput = document.getElementById("search-input");
	var val = elInput.value;

	console.log(val);

	runSearch(val);	

	elInput.value = '';
}



