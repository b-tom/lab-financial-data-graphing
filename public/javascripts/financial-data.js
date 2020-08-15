const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json`


axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI);
        const BTCValue = responseFromAPI.data.bpi;
        const dates = Object.keys(BTCValue);
        const values = Object.values(BTCValue);
        const maxPrice = Math.max(...values);
        const minPrice = Math.min(...values);
        
        document.getElementById('max').innerText = maxPrice;
        document.getElementById('min').innerText = minPrice;
        printTheChart(dates, values);
    })
    .catch(err => console.log(err));

const getBTCValue = () => {
    const startDate = document.getElementById('start').value;
    const endDate = document.getElementById('end').value;
    const currency = document.getElementById('currency').value;

    axios
        .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then( responseFromAPI => {
            console.log(responseFromAPI);
            const BTCValue = responseFromAPI.data.bpi;
            const dates = Object.keys(BTCValue);
            const values = Object.values(BTCValue);
            const maxPrice = Math.max(...values);
            const minPrice = Math.min(...values);
            
            document.getElementById('max').innerText = maxPrice;
            document.getElementById('min').innerText = minPrice;
            printTheChart(dates, values);
        })
        .catch(err => console.log(err));
        
}

function printTheChart(dates, values) {
  const ctx = document.getElementById('bitcoin-canvas').getContext('2d');
  ctx.clearRect(0, 0, 700, 400);
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'BTC Chart',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: values
        }
      ]
    }
  }); 
} 

document.getElementById('canvas-update').addEventListener('click', () => {
  getBTCValue();
});