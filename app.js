
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

// First, prev, next, last

function runSearchNextOffset(element, pageDirection) {


	// SUCCESS! finally got this endpoint to work!
	// Check to see if it was Bracket notation that I was missing

	// Added 'pageDirection' in hopes of fetching from the proper page/offset
	fetch(element["links"][pageDirection])
	.then(response => response.json())
	.then(responseJson => {
		formatSearchResults(responseJson);
	})
}


function clearPreviousResults() {
	elSearchResults.innerHTML = '';
}

function buildPaginationButtons(responseJson, pageDirection) {

	console.log(pageDirection)

	var elButton = document.createElement('button');
	var id = document.createAttribute('id');
	id.value = pageDirection + '-button';
	elButton.setAttributeNode(id);
	elButton.innerText = pageDirection;
	elButton.addEventListener('click', ()=>{ runSearchNextOffset(responseJson, pageDirection) });
	
	elSearchResults.appendChild(elButton)
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

	// check responseJson.links for object keys(first,next,prev,last)
	// forEach keys link/page build button for it.

	const pageLinkArray = Object.keys(responseJson["links"]);

	pageLinkArray.forEach( link => { buildPaginationButtons(responseJson, link) })

	//--------------------------

	

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



