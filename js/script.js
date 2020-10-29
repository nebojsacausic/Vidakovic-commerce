window.onload = function(){

	//Dohvatanje jsona preko ajaxa
	$.ajax({
        url: 'data/super-ponuda.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          superPonuda(data);
        },
        error: function (err) {
          console.error(err);
        }
    	});
    
    //pozivanje regularnog izraza
    document.getElementById("posalji").addEventListener("click", provjera);


    //Unos liste gradova
    var grad = document.getElementById("gradovi");
    grad.innerHTML = `<option value='0'>Izaberite</option>`;
    for(var i=1;i<gradovi.length;i++){
        grad.innerHTML += `<option value='${i}'>${gradovi[i]}</option>`;
    }
    
}

//Ispis proizvoda u super ponudi
function superPonuda(data) {
	let ispis = "";

	data.forEach(element => {
	  ispis += `
				<li>
				<figure>
					<img src="${element.slika.putanja}" alt="${element.slika.alt}">
					<figcaption>
					<h4 class="aa-product-title"><a href="${element.naziv.href}">${element.naziv.ime}</a></h4>
					<span class="aa-product-price">${element.cijena.aktuelna}</span><span class="aa-product-price"><del>${element.cijena.del}</del></span>
					</figcaption>
				</figure>                        
				<!-- product badge -->
				<span class="${element.badge.klasa}" href="#">${element.badge.ispis}</span>
				</li>
	  `;
	});

	document.querySelector("#super-ponuda").innerHTML = ispis;
  };


//niz gradova za dinamicku listu
var gradovi = [
	"Trebinje",
	"Banja Luka",
	"Sarajevo",
	"Mostar",
	"Doboj",
	"Tuzla"
];


//regularni izraz
function provjeraFirma(){

	var regFirma = /^[A-Z][a-z]{2,19}$/;
	var unos = document.getElementById("firma");
	var roditelj = unos.parentElement.parentElement;
	var trTagGreska = roditelj.nextElementSibling;
	
	if(!regFirma.test(unos.value)){
		trTagGreska.classList.remove('nevidljiv');
	}
	else{
		trTagGreska.classList.add('nevidljiv');
	}
}

function provjeraImePrezime(){
	
	regImePrezime = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,12}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,12})+$/;
	
	var unos = document.getElementById("imePrezime");
	var roditelj = unos.parentElement.parentElement;
	var trTagGreska = roditelj.nextElementSibling;
	
	if(!regImePrezime.test(unos.value)){
		trTagGreska.classList.remove('nevidljiv');
	}
	else{
		trTagGreska.classList.add('nevidljiv');
	}	
}

function provjeraGrad(){
	var unos = document.getElementById("gradovi");
	var roditelj = unos.parentElement.parentElement;
	var trTagGreska = roditelj.nextElementSibling;
	
	if(unos.value === "0"){
		trTagGreska.classList.remove('nevidljiv');		
	}
	else{
		trTagGreska.classList.add('nevidljiv');
	}
}

function provjeraMail(){
	regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	var unos = document.getElementById("mail");
	var roditelj = unos.parentElement.parentElement;
	var trTagGreska = roditelj.nextElementSibling;
	
	if(!regMail.test(unos.value)){
		trTagGreska.classList.remove('nevidljiv');
	}
	else{
		trTagGreska.classList.add('nevidljiv');
	}
}


function provjera(){
	provjeraFirma();
	provjeraImePrezime();
	provjeraGrad();
	provjeraMail();
}