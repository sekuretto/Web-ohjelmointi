class Weather {
  constructor(city) {
    this.apiKey = 'API_KEY_HERE';
    this.city = city;
    //this.city = country;
  }

  // Fetch weather from Openweather API
  async getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`);

    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city) {
    this.city = city;
    //this.city = country;
  }
}
