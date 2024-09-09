// API Key - Insira sua chave de API da ExchangeRate ou Open Exchange Rates
const apiKey = 'SEU_API_KEY'; // Substitua por sua chave de API
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Elementos do DOM
const converterForm = document.getElementById('converterForm');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDisplay = document.getElementById('result');

// Inicialização: Carrega as moedas ao abrir o aplicativo
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrencies();
});

// Carregar lista de moedas disponíveis na API
async function fetchCurrencies() {
    try {
        const response = await fetch(apiURL + 'USD');
        const data = await response.json();
        const currencies = Object.keys(data.conversion_rates);

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);
        });

        // Definir USD como padrão no 'fromCurrency' e BRL no 'toCurrency'
        fromCurrency.value = 'USD';
        toCurrency.value = 'BRL';
    } catch (error) {
        console.error('Erro ao buscar moedas:', error);
        resultDisplay.textContent = 'Erro ao carregar as moedas.';
    }
}

// Lidar com a conversão de moedas ao enviar o formulário
converterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Por favor, insira um valor válido.';
        return;
    }

    try {
        const response = await fetch(apiURL + from);
        const data = await response.json();
        const rate = data.conversion_rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        resultDisplay.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        console.error('Erro ao converter moedas:', error);
        resultDisplay.textContent = 'Erro ao realizar a conversão.';
    }
});
