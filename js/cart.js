$(document).ready(function() {
	
	let proizvodi = proizvodiUKartici()
  console.log(proizvodi)
  if(proizvodi == null){
    praznaKorpa()
  }
	else if(proizvodi.length > 0){
		prikaziProizvode()
	}
	else if(proizvodi.length == 0){
		praznaKorpa()
	}
  


});




function prikaziProizvode() {
    let proizvodi = proizvodiUKartici();

    $.ajax({
        url : "data/products.json",
        success : function(data) {

            data = data.filter(p => {
                for(let proiz of proizvodi)
                {
                    if(p.id == proiz.id) {
                        p.kolicina = proiz.kolicina;
                        return true;
                    }
                        
                }

            });
            // console.log(data);
            ispisProizvoda(data)
        }
    });
}



function ispisProizvoda (data) {
	let ispis = `

		<div class="cart-view-table">
             <form action="">
               <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Obrisi</th>
                        <th>Slika</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>`
	data.forEach( function(p) {
		ispis += `
			
                    <tbody>
                      <tr>
                        <td><a class="remove" href="#" data-id='${p.id}'><fa class="fa fa-close"></fa></a></td>
                        <td><a href="#"><img src="${p.slika.putanja}" alt="${p.slika.alt}"></a></td>
                        <td><a class="aa-cart-title" href="#">${p.naziv.ime}</a></td>
                        <td>KM ${p.cijena.aktuelna}</td>
                        <td>${p.kolicina}</td>
                        <td>KM ${p.cijena.aktuelna * p.kolicina}</td>
                      </tr>
                      </tbody>`

            });	

           
	ispis += `
			</table>
                </div>
             </form>
             <!-- Cart Total view -->
             <div class="cart-view-total">
               <h4>Na kartici</h4>
               <table class="aa-totals-table">
                 <tbody>
                     <tr><th>Ukupno</th>
                     <td>KM ${ukupnaCijena(data)}</td>
                   </tr>
                 </tbody>
               </table>
               <a href="#" class="aa-cart-view-btn">Potvrdi</a>
             </div>
           </div>
		`

		$(".cart-view-area").html(ispis)

	
		$(".remove").click(obrisiIzKorpe)
}


function ukupnaCijena (data) {
   let suma = 0;
   data.forEach( function(p) {
     suma += p.cijena.aktuelna * p.kolicina
   });
   // console.log(data)
   // console.log(suma)
   return suma
}




function proizvodiUKartici() {
    return JSON.parse(localStorage.getItem("proizvodi"));
}



function praznaKorpa () {
	$(".cart-view-area").html("<h2>Niste dodali proizvod u korpu</h2>")
}


function obrisiIzKorpe (e) {
  e.preventDefault()
	let id = $(this).data("id")
	// console.log(id)
	let proizvodi = proizvodiUKartici();
    let filtrirani = proizvodi.filter(p => p.id != id);

    localStorage.setItem("proizvodi", JSON.stringify(filtrirani));
    if(filtrirani.length == 1)
      prikaziProizvode();
    else 
      praznaKorpa()
}