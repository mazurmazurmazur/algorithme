function fetchTerms() {
  fetch("http://dashboard.algorithme.co/wp-json/wp/v2/terms/496") //only one entry in json file (WP REST)
    .then(res => res.json())
    .then(showTerms);
}
function showTerms(json) {
  let termsText = document.getElementById("termsText");

  let jsonText = json.content.rendered;

  termsText.innerHTML = jsonText;
}

fetchTerms();
