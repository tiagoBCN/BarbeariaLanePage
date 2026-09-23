// =================================
// SERVIÇO
// =================================

const serviceButtons =
    document.querySelectorAll(".service-option");

serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

        serviceButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});


// =================================
// DATA
// =================================

const dateButtons =
    document.querySelectorAll(".date-option");

dateButtons.forEach(button => {

    button.addEventListener("click", () => {

        dateButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});


// =================================
// HORÁRIO
// =================================

const timeButtons =
    document.querySelectorAll(".time-option");

timeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (
            button.classList.contains("disabled")
        ) {
            return;
        }

        timeButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});


// =================================
// TELEFONE
// =================================

const phoneInput =
    document.querySelector("#phone");

phoneInput.addEventListener("input", () => {

    let value =
        phoneInput.value.replace(/\D/g, "");

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length <= 10) {

        value = value.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        value = value.replace(
            /(\d{4})(\d)/,
            "$1-$2"
        );

    } else {

        value = value.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );

        value = value.replace(
            /(\d{5})(\d)/,
            "$1-$2"
        );

    }

    phoneInput.value = value;

});


// =================================
// CONFIRMAR AGENDAMENTO
// =================================

const bookingButton =
    document.querySelector("#bookingButton");


bookingButton.addEventListener("click", () => {

    const name =
        document.querySelector("#name").value.trim();

    const phone =
        document.querySelector("#phone").value.trim();

    const service =
        document.querySelector(
            ".service-option.active"
        );

    const time =
        document.querySelector(
            ".time-option.active"
        );


    if (!name) {

        alert("Digite seu nome.");

        return;

    }


    if (!phone) {

        alert("Digite seu WhatsApp.");

        return;

    }


    if (!service) {

        alert("Escolha um serviço.");

        return;

    }


    if (!time) {

        alert("Escolha um horário.");

        return;

    }


    alert(
        `Agendamento solicitado!\n\n` +
        `Cliente: ${name}\n` +
        `Serviço: ${service.dataset.service}\n` +
        `Horário: ${time.textContent.trim()}`
    );

});