
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

function buildTemplate(element) {

	// Need to check element.data.links to see if there are any other pages!
	//-------------------------------
	// Create NEXT Pagination Button!
	//-------------------------------

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

function runSearchNextOffset(element) {


	// SUCCESS! finally got this endpoint to work!
	// Check to see if it was Bracket notation that I was missing..
	fetch(element["links"].next)
	.then(response => response.json())
	.then(responseJson => {
		formatSearchResults(responseJson);
	})
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

		

		elSearchResults.appendChild(buildTemplate(element));

		// Add/append Next-Button/Pagination
		//------------------------------------- Function-IZE!
		
	})

	var elNextButton = document.createElement('button');
	var id = document.createAttribute('id');
	id.value = "next-button";
	elNextButton.setAttributeNode(id);
	elNextButton.innerText = "NEXT!.. BITCHES!";



	elNextButton.addEventListener('click', ()=>{ runSearchNextOffset(responseJson) });
	
	elSearchResults.appendChild(elNextButton)

	console.log(elNextButton)
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



