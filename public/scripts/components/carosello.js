export const createTableCarosello = (parentElement, pubsub) => {
    let dati = null;
    let istance;

    let mw;
    istance = {
        setMiddleware: (middleware) => {
            mw = middleware;
        },

        render: async () => {
            dati = await mw.load();
            console.info(dati);
            let html = `
              <div id="carouselExample" class="carousel slide">
                  <div class="carousel-inner">
          `;

            if (dati.length) {
                for (let i = 0; i < dati.length; i++) {
                    html += `
                    <div class="carousel-item active">
                        <a href="`+ dati[i].url + `" download><img src=".` + dati[i].url + `" class="d-block w-100 immagine-carosello" alt="immagine"></a>
                    </div>
                `;
                }
            } else {
                html += `
                    <div class="carousel-item active">
                        <img src="../assets/images/noavailable.jpg" class="d-block w-100 immagine-carosello" alt="immagine">
                    </div>
                `;
            }

            html += `
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                  </button>
              </div>
          `;

            parentElement.innerHTML = html;

            document.querySelector(".carousel-control-next").click();
        },
    };

    pubsub.subscribe("imageUpdated", () => {
        istance.render();
    });

    return istance;
};