class WeatherWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.apiKey = '1fae056d561fdbc43e6a4d4ec53d8745';
      this.city = 'Moscow';
      this.render();
      this.fetchWeatherData();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./style.css">
        <div class="container">
          <h2 class="city">Городe</h2>
          
          <div class="weather-info">
            <span class="temperature">Средняя температура</span>
            <span class="temperatureMin">Минимальная температура</span>
            <span class="temperatureMax">Максимальная температура</span>
            <span class="windSpeed">Скорость ветра</span>
            <span class="condition"> Условия </span>
          </div>
        </div>     
      `;
    }
  
    async fetchWeatherData() {
      try {
        console.log("Запрос")

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.shadowRoot.querySelector('.city').textContent = data.name;
        this.shadowRoot.querySelector('.temperature').textContent = `Средняя температура: ${data.main.temp}°C`;
        this.shadowRoot.querySelector('.temperatureMax').textContent = `Минимальная температура: ${data.main.temp_min}°C`;
        this.shadowRoot.querySelector('.temperatureMin').textContent = `Максимальная температура: ${data.main.temp_max}°C`;
        this.shadowRoot.querySelector('.condition').textContent = `Условия: ${data.weather[0].description}`;
        this.shadowRoot.querySelector('.windSpeed').textContent = `Скорость ветра: ${data.wind.speed}`;
    
    } 
      
      catch (error) {
        this.shadowRoot.querySelector('.container').innerHTML = `<p>Ошибка: ${error.message}</p>`;
      }
    }
  }
  
  customElements.define('weather-widget', WeatherWidget);
  
  