export const createTable = (parentElement, pubsub) => {
    let dati = null;
    let istance;
    let mw;

    istance = {
        setMiddleware: (middleware) => {
            mw = middleware;
        },

        render: async () => {
            dati = await mw.load();

            let html = `
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <input id="file" name="file" class="form-control" placeholder="Inserisci immagine" type="file" single>
                        </div>
                        <div class="col">
                            <button type="button" id="Caricaimg" class="btn btn-dark b1">
                                <img class="i-upload" src="assets/images/upload.png" alt="tab" /> Aggiungi immagine
                            </button>
                        </div>
                    </div>

                    <div class="mt-4" id="tab">
                        <table class="table table-bordered tabellina radius">
                            <thead class="table-dark titolo">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Nome</th>
                                    <th scope="col" class="px-6 py-3">Immagine</th>
                                    <th scope="col" class="px-6 py-3">Elimina</th>
                                </tr>
                            </thead>
                            <tbody class="titiolo">
            `;

            for (let i = 0; i < dati.length; i++) {
                html += `
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">`
                            +dati[i].url.split("/").pop()+`
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src="`+ dati[i].url+`" class="immagine-tabella" alt="immagine" />
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button class="btn btn-dark titolo cancella-btn" id="delete_` + dati[i].id + `">CANCELLA</button>
                        </th>
                    </tr>
                `;
            }

            html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            parentElement.innerHTML = html;

            const input = document.getElementById("Caricaimg");
            const inputFile = document.getElementById("file");

            let handleSubmit = async (event) => {
                await mw.upload(inputFile);
                dati = await mw.load();
                istance.render();
                pubsub.publish("imageUpdated");
            };

            input.onclick = handleSubmit;

            document.querySelectorAll(".cancella-btn").forEach((button) => {
                button.onclick = async () => {
                    await mw.delete(button.id.split("_")[1]);
                    dati = await mw.load();
                    istance.render();
                    pubsub.publish("imageUpdated");
                };
            });
        },
    };


    return istance;
};