
var keywords       = document.getElementById("keywords");
var search_button  = document.getElementById("search_button");
var search_results = document.getElementById("search_results");
var search_detail  = document.getElementById("search_detail");
var index          = {};

function init() { 
  search_button.disabled = true;
  loadIndexFile("file:index.json");
}
window.addEventListener("DOMContentLoaded", init, false);

function search() {
  var input = keywords.value.split(/\W+/);
  var terms = [];
  for (var i=0; i<input.length; i++) {
    if (input[i].length>0 && !terms.contains(input[i])) {
      terms.push(input[i]);
    }
  }
  search_detail.innerHTML = "keyword count: "+ terms.length +" "+ terms; 

  var results = [];

  for (var fi=0; fi<index.json.files.length; fi++) {
    var ifile    = index.json.files[fi];
    var found    = false;
    var result   = {};
    result.name  = ifile.name;
    result.terms = [];
    
    for (var ti=0; ti<terms.length; ti++) {
      var term  = terms[ti];
      var count = ifile.keywords[term];
      if (count > 0) {
        result.terms.push({"name":term, "count":count});
        found = true;
      }
    }
    if (found) {
      results.push(result);
    }
  }

  search_results.innerHTML = "";
  for (var i=0; i<results.length; i++) {
    addResultRow(results[i]);
  }

}

function addResultRow(result) {
  var div   = document.createElement("div");
  var a     = document.createElement("a");
  var p     = document.createElement("p");
  var aText = document.createTextNode(result.name);
  var pText = document.createTextNode("");

  a.appendChild(aText);
  a.title = result.name;
  a.href  = "file:../pdfs/"+ result.name;
  div.appendChild(a);

  p.appendChild(pText);
  for (var i=0; i<result.terms.length; i++) {
    pText.data += result.terms[i].name +":"+ result.terms[i].count;
    if (i<result.terms.length-1) {
      pText.data += ", ";
    }
  }
  div.appendChild(p);

  search_results.appendChild(div);
}

function loadIndexFile(file) {
  var request = new XMLHttpRequest();
  request.overrideMimeType("application/json");
  request.open("GET", file, false);
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200 || request.status == 0) {
        index.json = JSON.parse(request.responseText);
        search_button.disabled = false;
      }
    }
  }
  request.send(null);
}

Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}
