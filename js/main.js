$(document).ready(function(){
  proizvodi();
  kategorije();
  $("#pretraga").click(filtrirajPoNaslovu);

 

  //jquery nad filtriranjem i sortiranjem
  
  $("#kategorije").hide();
    $('#hKat').click(function(){
      $('#kategorije').slideToggle('slow');
    });
  

    $("#sliderForma").hide();
    $('#cKat').click(function(){
      $('#sliderForma').slideToggle('slow');
    });
  
    $("#pKatSadrzaj").hide();
    $('#pKat').click(function(){
      $('#pKatSadrzaj').slideToggle('slow');
    });

    $("#topProizvodiSadrzaj").hide();
    $('#topProizvodi').click(function(){
      $('#topProizvodiSadrzaj').slideToggle('slow');
    });



    // SORTIRANJE

    $(".sort").click(sortPodaci)
});

window.onload = function(){
  const cenaRN = document.getElementById("rnCena");
  cenaRN.addEventListener('input', izmeniCenu);

  document.querySelector("#rnCena").addEventListener('click', filterCena);
}

//Ispisivanje proizvoda
function proizvodi(){
  $.ajax({
    url: "data/products.json",
    method: "GET",
    success: function(proizvodi){
      prikazProizvoda(proizvodi);
    },
    error: function(err){
      console.log(err);
    }
  });
}

function prikazProizvoda(proizvodi){
  ispis = "";

  if(proizvodi.length > 0){
    for (let proizvod of proizvodi) {
      ispis += ispisPojedinacnogProizvoda(proizvod);
    }
  }
  else{
    ispis += "<h2>Nema proizvoda za odabrani kriterijum</h2>";
  }
  $("#products_ul").html(ispis);

  bindCartEvents();
}


// SORTIRANJE

function sortPodaci () {

    // imena DATA atributa NE mogu biti camilcase! npr: sortBy

    let sort = $(this).data('sort'); // naziv svojstva po kome se sortira
    let order = $(this).data('order');
    console.log(sort + "=" + order);

    $.ajax({
      url: "data/products.json",
      method: "GET",
      success: function(proizvodi){
         sortiranjeProizvoda(proizvodi, sort, order)
         prikazProizvoda(proizvodi);
      },
      error: function(err){
        console.log(err);
      }
  });
}


function sortiranjeProizvoda(proizvodi, sort, order) {
    proizvodi.sort(function(a,b){
        let vrednostA = (sort=='cijena')? a.cijena.aktuelna : a.naziv.ime;
        let vrenodstB = (sort=='cijena')? b.cijena.aktuelna : b.naziv.ime;
        if(vrednostA > vrenodstB)
            return order=='asc' ? 1 : -1;
        else if(vrednostA < vrenodstB)
            return order=='asc' ? -1 : 1;
        else 
            return 0;
    });
}


function bindCartEvents() {
  $(".add-to-cart").click(addToCart);
}

function addToCart(){
  let id = $(this).data("id");
  console.log(id);

  let proizvodi = proizvodLocalStorage()

  if(proizvodi){
    if(vecNaKartici()){
      dodajULocalStorage()
    }
    else{
      dodajNoviULocal()
    }
  }
  else{
    dodavanjePrvog()
  }



function proizvodLocalStorage () {
  return JSON.parse(localStorage.getItem("proizvodi"));
}


function dodavanjePrvog () {
  let proizvodi = []
  proizvodi.push({
      id : id,
      kolicina : 1
  });

  localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
}



function vecNaKartici () {
  return proizvodi.filter(p => p.id == id).length
}


function dodajULocalStorage () {

  let proizvodi = proizvodLocalStorage()

  for(let i in proizvodi)
        {
            if(proizvodi[i].id == id) {
                proizvodi[i].kolicina++;
                break;
            }      
        }
   
  localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
}



function dodajNoviULocal () {
  let proizvodi = proizvodLocalStorage()
  
    proizvodi.push({
        id : id,
        kolicina : 1
    });

    localStorage.setItem("proizvodi", JSON.stringify(proizvodi));    
}



}





function ispisPojedinacnogProizvoda(proizvod){
  return ` <li>
            <figure>
                <a class="aa-product-img" href="${proizvod.slika.href}"><img src="${proizvod.slika.putanja}" alt="${proizvod.slika.alt}"></a>
                <input type="button" data-id=${proizvod.id} value="Dodaj u korpu" class="button btn add-to-cart" />
                <figcaption>
                <h4 clfunkcijaProizvodiass="aa-product-title">${proizvod.naziv.ime}</h4>
                <span class="aa-product-price">${proizvod.cijena.aktuelna},00 KM</span><span class="aa-product-price"><del>${proizvod.cijena.del}</del></span>
                <p class="aa-product-descrip">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam accusamus facere iusto, autem soluta amet sapiente ratione inventore nesciunt a, maxime quasi consectetur, rerum illum.</p>
                </figcaption>
            </figure>                      

            <span class="${proizvod.badge.klasa}" href="#">${proizvod.badge.ispis}</span>
            </li>`
}

//Proizvodi kraj

//Ispisivanje kategorija
function kategorije(){
  $.ajax({
    url: "data/categories.json",
    method: "GET",
    success: function(kategorije){
      prikazKategorija(kategorije);
    },
    error: function(err){
      console.log(err);
    }
  });
}

function prikazKategorija(kategorije){
  ispis = "";
  for (let kategorija of kategorije) {
    ispis += ispisPojedinacneKategorije(kategorija);
  }

  $("#kategorije").html(ispis);

  $(".filter-category").click(filterKategorija);
}

function ispisPojedinacneKategorije(kategorija){
  return `<li class="kat-li">
            <a href="#" class="d-flex filter-category" data-id="${ kategorija.id }">
              <span>${ kategorija.title }</span>
            </a>
          </li>`
}
//Kategorije kraj


//filtriranje kategorija

function filterKategorija(e){
  e.preventDefault();

    let idKategorije = $(this).data('id');
    $.ajax({
      url: "data/products.json",
      method: "GET",
      success: function(proizvodi){
          proizvodi = filtriranjePoKategoriji(proizvodi, idKategorije);
          prikazProizvoda(proizvodi);
      }
  });
}

function filtriranjePoKategoriji(proizvodi, idKategorije){
  return proizvodi.filter(x => x.kategorija.idKategorije == idKategorije);
}
//kraj filtriranja po kat

//Filtriranje po naslovu
function filtrirajPoNaslovu(){
  let unosKorisnika = document.querySelector("#polje").value;
  
  $.ajax({
    url: "data/products.json",
    method: "GET",
    dataType: "json",
    success: function(proizvodi){
      let filtriraniPostovi = proizvodi.filter(el => {
        if(el.naziv.ime.toUpperCase().indexOf(unosKorisnika.toUpperCase()) !== -1){
          return true;
        }
      });

      prikazProizvoda(filtriraniPostovi);
    }
  });
}


//Filtriranje po slajderu
function izmeniCenu() {
  var cena = document.getElementById("rnCena").value;
  document.getElementById("cenaIzbor").textContent = cena;
}


function filterCena() {
  var cena = document.getElementById("rnCena").value;
  console.log(cena);
  
  $.ajax({
    url: "data/products.json",
    method: "GET",
    success: function(proizvodi){
      const noviFiltriranNizArtikala = proizvodi.filter(function (el) {
        if (el.cijena.aktuelna <= cena) {
          return el;
        }
      });
      prikazProizvoda(noviFiltriranNizArtikala);
    }
  })
}