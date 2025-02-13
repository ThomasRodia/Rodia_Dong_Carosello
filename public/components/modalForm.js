const createModalForm = (parentElement) => {
    let data;
    let callback = null;
    let btn;

    return {
        setLabels: (labelsAndType) => {
            data = labelsAndType;
        },
        onsubmit: (button, callbackInput) => {
            btn = button;
            callback = callbackInput;
        },
        render: () => {
            let modalHTML = "";
            for (let key in data) {
                if (data[key][1] == null) {
                    modalHTML += "<div>%KEY%\n<input class='underPadding2 mb-3' id='%ID%' type='%TYPE%'/></div>\n"
                        .replace("%KEY%", key)
                        .replace("%ID%", key.split(" ")[0])
                        .replace("%TYPE%", data[key][0]);
                } else {
                    let optionsHTML = Object.entries(data[key][1])
                        .map((value) => "<option value='%VALUE%'>%VALUE%</option>"
                            .replace("%VALUE%", value[1])
                        ).join('');

                    modalHTML += `
                        <div class='underPadding2'>
                            %KEY%
                            <%TAG% id="%ID%">
                                %OPTIONS%
                            </%TAG%>
                        </div>
                    `
                        .replace("%KEY%", key)
                        .replace("%TAG%", data[key][0])
                        .replace("%ID%", key)
                        .replace("OPTIONS", optionsHTML);
                }
            }

            btn.onclick = () => {
                const result = Object.keys(data).map((name) => {
                    return document.querySelector("#" + name.split(" ")[0]).value;
                });

                Object.keys(data).forEach(e => document.querySelector("#" + e.split(" ")[0]).value = "");

                callback(result);
            };

            parentElement.innerHTML = modalHTML;
        }
    };
};

export { createModalForm };