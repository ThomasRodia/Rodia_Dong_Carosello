export const createMiddleware = () => {
    return {
        delete: function (indice) {
            fetch(`/img/delete/${indice}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nella cancellazione del file");
                }
            })
            .catch(error => {
                console.error("Errore durante l'eliminazione dell'immagine:", error);
            });
        },

        load: function () {
            return fetch("/img/downloadAll")
                .then(response => response.json())
                .then((json) => {
                    return json
                });
        },
        upload: async (inputFile) => {
            const formData = new FormData();
            formData.append("file", inputFile.files[0]);
            const body = formData;
            const fetchOptions = {
                method: 'post',
                body: body
            };
            try {
                const res = await fetch("/img/upload", fetchOptions);
                inputFile.value = "";
            } catch (e) {
                console.log(e);
            }
        }
    }
}