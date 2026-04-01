const input = document.querySelector(".search-input");
const button = document.querySelector(".search-button");
const h1 = document.querySelector(".pais-nome");
const flag = document.querySelector(".pais-bandeira");
const capital = document.querySelector(".pais-capital");
const populacao = document.querySelector(".pais-populacao");
const linguas = document.querySelector(".pais-linguas");

async function searchPais() {
    const pais = input.value.toLowerCase().trim();

    if (pais === "") {
        return alert("Por favor, Insira o nome de um país");
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${pais}`);

        if (!response.ok) {
            return alert("País não encontrado. Tente novamente.");
        }

        const data = await response.json();
        const country = data[0];

        h1.innerHTML = country.name.common;
        flag.src = country.flags.png;
        capital.innerHTML = "Capital: " + country.capital[0];
        populacao.innerHTML = "População: " + country.population.toLocaleString();

        const listaLinguas = Object.values(country.languages);
        linguas.innerHTML = "Línguas: " + listaLinguas.join(", ");
        navigator.vibrate(200);

    } catch (error) {
        alert("Erro ao buscar o país. Verifique sua conexão.");
        console.error(error);
    }
}

button.addEventListener("click", searchPais);

if ('serviceWorker' in navigator) { navigator.serviceWorker.register('sw.js'); }
