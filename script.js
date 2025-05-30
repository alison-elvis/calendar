const monthYearEl = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

const renderWeekdays = () => {
    // Remove todos os nós filhos (se houver)
    while (calendarBody.firstChild) {
        calendarBody.removeChild(calendarBody.firstChild);
    }
    weekDays.forEach(dia => {
        const diaNomeDiv = document.createElement("div");
        diaNomeDiv.className = "day-name";
        diaNomeDiv.innerText = dia;
        calendarBody.appendChild(diaNomeDiv);
    });
};

let currentDate = new Date();

const renderDays = data => {
    renderWeekdays();

    const ano = data.getFullYear();
    const mes = data.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const inicioIndice = primeiroDia.getDay(); // 0 (Domingo) a 6 (sábado)

    // Cria células vazias para os dias anteriores ao primeiro dia do mês
    Array.from({ length: inicioIndice }).forEach(() => {
        const vazioDiv = document.createElement("div");
        vazioDiv.className = "day empty";
        vazioDiv.innerText = "";
        calendarBody.appendChild(vazioDiv);
    });

    // Cria um array de objetos para cada dia do mês usando Array.from
    const diasArray = Array.from({ length: totalDias }, (_, indice) => ({
        dia: indice + 1,
        data: new Date(ano, mes, indice + 1)
    }));

    diasArray.forEach(objDia => {
        const diaDiv = document.createElement("div");
        diaDiv.className = "day";
        diaDiv.innerText = objDia.dia;
        calendarBody.appendChild(diaDiv);
    });
};

// Atualiza o cabeçalho e os dias do calendário
const updateCalendar = () => {
    const localidade = "pt-BR";
    const nomeMes = new Intl.DateTimeFormat(localidade, {
        month: "long"
    }).format(currentDate);
    const ano = currentDate.getFullYear();
    monthYearEl.innerText = `${nomeMes}  ${ano}`;
    renderDays(currentDate);
};

prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});
nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Inicializa o calendário
updateCalendar();
