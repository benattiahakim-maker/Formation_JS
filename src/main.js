
function loadDate()
{

var date = new Date().toLocaleString();
var footer = document.getElementById("footer");
footer.innerText = date;
console.log("Date modifié");

}

function updateDate()
{

setInterval(function(){loadDate()},1000)

}
document.addEventListener('DOMContentLoaded', function(evt){ updateDate()});