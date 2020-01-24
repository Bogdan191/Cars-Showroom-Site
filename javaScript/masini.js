
var div_articole;


function DeleteContent() {
    div_articole = document.getElementById('init');
    div_articole.innerHTML = "";

}
function makeTemplate(ind, test_1) {
    
    var text_intial = document.createTextNode('Numar anunt: ' + (ind + 1));
    var dv_text = document.createElement('div');

    dv_text.classList.add("text_node");
    dv_text.appendChild(text_intial);
    div_articole.appendChild(dv_text);

    var dv = document.createElement('div');
    dv.id = "div";
   
    dv.classList.add("template_user");

    var articol = document.createElement('article');
    dv.appendChild(articol);
    articol.classList.add("articol_masina");

    var dv_1 = document.createElement('div');
     articol.appendChild(dv_1);
    
  
    var h2_1 = document.createElement('h2');
    h2_1.innerHTML = test_1[ind].nume;
    dv_1.appendChild(h2_1);

    div_articole.appendChild(dv);
  

    var imag = document.createElement('img');
    dv_1.appendChild(imag);
    imag.src = "/uploads/imagini auto/" + test_1[ind].imagine;
    imag.alt = "nue";
    imag.style.width = '150px';
    imag.style.height = '150px';
    imag.style.margin = '1%';
    var h4_1 = document.createElement('h4');
    h4_1.innerHTML = "Categorie: " + test_1[ind].categorie;
    h4_1.id = "categorie";
    dv_1.appendChild(h4_1);
    
    var h4_2 = document.createElement('h4');
    h4_2.innerHTML = "Descriere: " + test_1[ind].descriere;
    h4_2.id = "descriere";
    dv_1.appendChild(h4_2);


    var dv_2 = document.createElement('div');
    articol.appendChild(dv_2);

    var tabel_date = document.createElement('table');
    dv_2.appendChild(tabel_date);

    var tr_1 = document.createElement('tr');
    var td_1_1 = document.createElement('td');
    td_1_1.innerHTML = "Pret:";
    tr_1.appendChild(td_1_1);
   
    var td_1_2 = document.createElement('td');
    td_1_2.innerHTML = test_1[ind].pret;
    tr_1.appendChild(td_1_2);
    tabel_date.appendChild(tr_1);

    var tr_2 = document.createElement('tr');
    var td_2_1 = document.createElement('td');
    td_2_1.innerHTML = "Data aducerii in depozit:";
    tr_2.appendChild(td_2_1);
   
    var td_2_2 = document.createElement('td');
    td_2_2.innerHTML = test_1[ind].data;
    tr_2.appendChild(td_2_2);
    tabel_date.appendChild(tr_2);

    var tr_3 = document.createElement('tr');
    var td_3_1 = document.createElement('td');
    td_3_1.innerHTML = "Electrica:";
    tr_3.appendChild(td_3_1);

    var td_3_2 = document.createElement('td');
    if(test_1[ind].electrica == false)
        td_3_2.innerHTML = "Nu";
    else 
        td_3_2.innerHTML = "Da";
    tr_3.appendChild(td_3_2);
    tabel_date.appendChild(tr_3);
   
     
    var tr_4 = document.createElement('tr');
    var td_4_1 = document.createElement('td');
    td_4_1.innerHTML = "Producator";
    tr_4.appendChild(td_4_1);
   
    var td_4_2 = document.createElement('td');
    td_4_2.innerHTML = test_1[ind].producator;
    tr_4.appendChild(td_4_2);
    tabel_date.appendChild(tr_4);

    var tr_5 = document.createElement('tr');
    var td_5_1 = document.createElement('td');
    td_5_1.innerHTML = "Accesorii:";
    tr_5.appendChild(td_5_1);
   
    var td_5_2 = document.createElement('td');
    td_5_2.innerHTML = test_1[ind].accesorii;
    tr_5.appendChild(td_5_2);
    tabel_date.appendChild(tr_5);
    
}

//functie ce sorteaza articolele in ordine lexicografica dupa nume
function sort_nume() {
    DeleteContent();
    auxiliar = test.slice();
    auxiliar.sort(function(a, b) {
        if(a.nume > b.nume)
          return 1;
        return -1;
    })
    for(var i = 0; i < auxiliar.length; i++) 
    makeTemplate(i, auxiliar);
    
}

///functie ce reseteaza tabela de anunturi
function resetare() {
    DeleteContent();
    
    for(var i = 0; i < test.length; i++) {
        makeTemplate(i, test);
        
    }
  
}

//functie ce calculeaza media preturilor si afiseaza cu alert
function medie_preturi() {
    var medie = 0.00;
    for(var i = 0; i < test.length; i++) {
        medie += test[i].pret;
    }

    medie /= test.length;
    alert("Media preturilor este: " + medie);
}

function schimba_font() {
    
    this.style.backgroundColor = "red";
    console.log("Font schimbat la "  + this.id); 
}

function reintializare_font() {
    this.style.backgroundColor = "lightblue";
}
function sterge_sub() {
    var element = document.createElement("article");
    element = this;
    console.log(element.nodeName);  
    while(element) {
      console.log(element.nodeName);
      var vechi = element;
      element = element.nextElementSibling;
      vechi.parentNode.removeChild(vechi);
      
      
    }

    var text_nodes = document.getElementsByClassName("text_node");
    for(var x = 0; x < text_nodes.length; x++) {
        text_nodes[x].innerHTML = "";
    }
  
}
function coordonate(event) {
    alert(event.clientsX + " " + event.clientY);
}
///functie ce sorteaza dupa pret 
function sort_pret() {
    DeleteContent();
    auxiliar = test.slice();
    auxiliar.sort(function(a, b) {
        if(a.pret > b.pret) 
            return 1;
        return -1;
    })

    for(var i = 0; i < auxiliar.length; i++) {
        setTimeout(makeTemplate, 200 * (i + 1), i, auxiliar);
        
    }
}
///functia pentru animatie
function myMove() {
    var elem = document.getElementById("animate");   
    var pos = 0;
    var id = setInterval(frame, 5);
    var id_1;
    function frame() {
      if (pos== 1250) {
        clearInterval(id);
         id_1 = setInterval(frame_1, 5);
      } else {
        pos++; 
        elem.style.left = pos + "px"; 
      }
    }
    function frame_1() {
        if(pos == 0) {
            clearInterval(id_1);
            id = setInterval(frame, 5);
        } else {
            pos--;
            elem.style.left = pos+ "px";
        }
    }
    var buton_stop = document.getElementById('stop');
    buton_stop.onclick = function() {
        clearInterval(id);
        clearInterval(id_1);
        elem.style.left = 0 + "px";
    }
  }

var interval = 1000;
document.addEventListener('keydown', function(event) {
    var i;
    var L;
    
        if (event.ctrlKey && event.key === 'i') {
            DeleteContent();
            alert("Anunturile vor fi afisate in ordine inversa fata de ordinea initiala!");
         
            var time_show = 1;
            
        
           
            for(i = test.length - 1; i >= 0; i--) {
                 L =  setTimeout(makeTemplate, interval * (time_show), i, test);
                  time_show++;
                  
            }
            buton_timeOut.onclick = function() {
                clearTimeout(L);
            }
   
       
         
    }
  });

window.onload = function() {
    
    this.resetare();
    var articole = document.getElementsByClassName("articol_masina");
    for(var i = 0; i <  articole.length; i++) {
       articole[i].addEventListener("mouseover", schimba_font);
       articole[i].addEventListener("mouseleave", reintializare_font);
       articole[i].addEventListener("dblclick", sterge_sub);
       articole[i].addEventListener("click", coordonate);

}
console.log(articole.length);
  
    //creare input text
    var dv_text = document.getElementById("text_nume");
    var input_text = document.createElement("INPUT");
    input_text.setAttribute("type", "text");
    input_text.setAttribute("placeholder", "Numele masinii");
    input_text.style.width = "30%";
    input_text.style.height = "30px";
    dv_text.appendChild(input_text);

    //creare input range
    var dv_range = document.getElementById('range');
    var input_range = document.createElement("INPUT");
    input_range.setAttribute("type", "range");
    input_range.setAttribute("min", "2500");
    input_range.setAttribute("max", "120000");
    input_range.setAttribute("value", "15000");
    dv_range.appendChild(document.createTextNode("2500"));
    dv_range.appendChild(input_range);
    var val= document.createElement('p');
    var pret_maxim = 15000;
    input_range.oninput = function() {
     
        val.innerHTML = "Pret maxim: " + this.value;
        pret_maxim = this.value;
       
    }
    dv_range.appendChild(document.createTextNode("120000"));
    dv_range.appendChild(val);
    
     //input checkbox
     var check_electrica = document.createElement("INPUT");
     check_electrica.setAttribute("type", "checkbox");
     check_electrica.setAttribute("name", "electrica");
     check_electrica.setAttribute("value", "masina_electrica");
     var dv_checkbox = document.getElementById("checkbox_1");
     dv_checkbox.appendChild(check_electrica);
    
    ///create textarea input
    var text_area = document.createElement("textarea");
    var dv_text_area = document.getElementById("text_area");
    text_area.rows = 4;
    text_area.cols = 50;
    text_area.placeholder = "Cuvinte cheie";
    dv_text_area.appendChild(text_area);
    
    //creare radio buttons input
    var dv_radio = document.getElementById("radio_buttons");

    var radio_buton_1 = document.createElement("input");
    radio_buton_1.setAttribute("type", "radio");
    radio_buton_1.setAttribute("name", "conditii");
    radio_buton_1.setAttribute("value", "o_conditie");
    radio_buton_1.textContent = "O conditie";
    var radio_p1 = document.createTextNode("O conditie");
    dv_radio.appendChild(radio_p1);
    dv_radio.insertBefore(radio_buton_1, dv_radio.lastChild);
     
    var radio_buton_2 = document.createElement("input");
    radio_buton_2.setAttribute("type", "radio");
    radio_buton_2.setAttribute("name", "conditii");
    radio_buton_2.setAttribute("value", "jumatate_din_conditii");
    radio_buton_2.textContent = "Jumatate din conditii";
    var radio_p2 = document.createTextNode("Jumatate din conditii");
    dv_radio.appendChild(radio_p2);
    dv_radio.insertBefore(radio_buton_2, dv_radio.lastChild);
    
    var radio_buton_3 = document.createElement("input");
    radio_buton_3.setAttribute("type", "radio");
    radio_buton_3.setAttribute("name", "conditii");
    radio_buton_3.setAttribute("value", "toate_conditiile");
    radio_buton_3.textContent = "Toate conditiile";
    var radio_p3 = document.createTextNode("Toate conditiile");
    dv_radio.appendChild(radio_p3);
    dv_radio.insertBefore(radio_buton_3, dv_radio.lastChild);
     
    ///buton pentru sortare dupa nume
    var buton_sortare_nume = document.getElementById("sortare_nume");
    buton_sortare_nume.onclick = sort_nume;

    // buton pentru sortare dupa pret
    var buton_sortare_pret = document.getElementById('sortare_pret');
    buton_sortare_pret.addEventListener("click", sort_pret);

    //buton pentru resetare tabela anunturi 
    var buton_restare_tabela = document.getElementById('resetare');
    buton_restare_tabela.addEventListener("click", resetare);
     

    //buton ce calculeaza valoarea totala a masinilor
     var buton_calcul_medie_pret = document.getElementById('calculare');
     buton_calcul_medie_pret.onclick = medie_preturi;
       
     //buton pentru oprirea timeOut-ului
     var buton_timeOut = document.getElementById('buton_timeOut');

    //buton ce filtreaza dupa caracteristicile date
    var buton_filtreaza = document.getElementById('filtrare');
    buton_filtreaza.onclick = function () {
            
            resetare();
            var text = input_text.value;
            var masina_electrica = false;
            var select_option = document.getElementById('select_producator');

            if(check_electrica.checked == true) {
                masina_electrica = true;
            }
           
            var ind = 1;
            var dv_articole = document.getElementById("init");
            var  i = 0;
            var remove = false;
            console.log("Numar copii: " + dv_articole.children.length);
            console.log("Prret: " + pret_maxim + "\n");
            while(ind< dv_articole.children.length && i < 21) {
                remove = false;
                var n = test[i].descriere.includes(text_area.value);
                if(radio_buton_3.checked === true)
                { if( select_option.value != test[i].producator || input_text.value != test[i].nume || masina_electrica != test[i].electrica || pret_maxim < test[i].pret)
                       remove = true;
                }
                if(radio_buton_2.checked === true) {
                    var nr_conditii = 0;
                    if(select_option.value === test[i].producator)
                        nr_conditii++;
                    if(input_text.value === test[i].nume)
                         nr_conditii++;
                    if(masina_electrica === test[i].electrica)
                        nr_conditii++;
                    if(pret_maxim > test[i].pret) 
                        nr_conditii++;
                    
                    if(nr_conditii < 3)
                         remove = true;
                }
                if(radio_buton_1.checked === true) {
                    var nr_conditii = 0;
                    if(select_option.value === test[i].producator)
                        nr_conditii++;
                    if(input_text.value === test[i].nume)
                         nr_conditii++;
                    if(masina_electrica === test[i].electrica)
                        nr_conditii++;
                    if(pret_maxim > test[i].pret) 
                        nr_conditii++;
                    
                    if(nr_conditii != 1)
                         remove = true;
                    console.log(nr_conditii + "\n");
                }
                  if(remove === true)   {
                    dv_articole.removeChild(dv_articole.children[ind]);
                    ind++;
                    //console.log(input_text.value + "\n");
                }else {
                    ind+=2;
                  
                }
                i++;
            }


            var text_nodes = document.getElementsByClassName("text_node");
            for(var x = 0; x < text_nodes.length; x++) {
                text_nodes[x].innerHTML = "";
            }

            
            
        
        
    }

  

     
    
    
}
