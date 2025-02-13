export const createTable = (parentElement) => {
    let dati = null;
    let istance;
    let callback;

    istance = {
        setcallback: (cb) => {
            callback = cb;
        },

        render: () => {
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
                            +dati[i].nome+`
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <img src="files/`+dati[i].nome+`" class="immagine-tabella" alt="immagine" />
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button class="btn btn-dark titolo cancella-btn">CANCELLA</button>
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
                try {
                    const formData = new FormData();
                    console.info(inputFile.files[0]);
                    formData.append("file", inputFile.files[0]);

                    const body = formData;
                    console.info(body);

                    const fetchOptions = {
                        method: 'post',
                        body: body
                    };

                    const res = await fetch("/img/upload", fetchOptions);
                    inputFile.value = "";
                    
                    await istance.load();
                } catch (e) {
                    console.log(e);
                }
            };

            input.onclick = handleSubmit;

            document.querySelectorAll(".cancella-btn").forEach((button, index) => {
                button.onclick = () => {
                    istance.delete(index);
                };
            });
        },

        delete: function (indice) {
            fetch(`/img/delete/${indice}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella cancellazione del file");
                }
                dati.splice(indice, 1);
                istance.render();
            })
            .catch(error => {
                console.error("Errore durante l'eliminazione dell'immagine:", error);
            });
        },

        load: function () {
            return fetch("/img/downloadAll")
                .then(response => response.json())
                .then(json => {
                    dati = json;
                    istance.render();
                    return json;
                })
                .catch(error => {
                    console.error("Errore nel caricamento delle immagini:", error);
                });
        }
    };

    return istance;
};