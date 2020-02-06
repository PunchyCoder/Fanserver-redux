
"use strict";

const url = "https://kitsu.io/api/edge/anime"; //data.attributes.posterImage
const APIKey = 'AIzaSyARlWxggTnR6mIMhHdyW2Bnf7BomchaBaE';

const elSearchResults = document.getElementById("search-results");

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

function injectTemplate(element) {

	// Create Elements
	var elDiv = document.createElement('div');
	var elAnchor = document.createElement('a');
	var elImage = document.createElement('img');
	var elHeading = document.createElement('h3');


	// Create and Set class attribute for 'div'
	var card = document.createAttribute("class");
	card.value = "result-card";
	elDiv.setAttributeNode(card);


	// Set 'src' and 'innerText' to correct endpoint
	elImage.src = element.attributes.posterImage.small;
	elHeading.innerText = element.attributes.canonicalTitle;


	//nest elements
	elAnchor.appendChild(elImage);
	elDiv.appendChild(elAnchor);
	elDiv.appendChild(elHeading);

	console.log(elDiv)

	return elDiv;
}

function clearPreviousResults() {
	elSearchResults.innerHTML = '';
}

function formatSearchResults(responseJson) {
	console.log(responseJson)
	console.log(responseJson['data'])

	clearPreviousResults();

	responseJson['data'].forEach(element => {
		var title = element.attributes.slug;
		var image = element.attributes.posterImage.medium;

		console.log(title, image)

		

		elSearchResults.appendChild(injectTemplate(element));

	})
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



