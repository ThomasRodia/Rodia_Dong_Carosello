export const createTableCarosello = (parentElement) => {
    let dati=null;
    let istance;
    let callback;
  istance ={
    
   setcallback:(cb)=>{
callback=cb;
   },
    render: () => {

      
              let html = `<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">`
  for(let i=0;i<dati.length;i++){
  html+=`

    <div class="carousel-item active">
      <img src="../files/`+dati[i].nome+`" class="d-block w-100 immagine-carosello" alt="immagine">
    </div>
   
  `;
  }
  html+=`
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> `;
                      

              parentElement.innerHTML = html;

              
      
    },

    load: function () {
      return fetch("/img/downloadAll")
      .then(response => response.json())
      .then(json => {
          dati = json;
          istance.render();
          return json;
      })
      .catch(error => { console.error("Errore nel caricamento delle immagini:", error); });
    }
  };
  return istance;
};

