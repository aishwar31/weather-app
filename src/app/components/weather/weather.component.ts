import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  city: string = '';
  weatherData: any;
  forecastData: any[] = [];
  loading: boolean = false;

  constructor(private weatherService: WeatherService) { }

  getWeather() {
    if (this.city.trim()) {
      this.loading = true;
      this.weatherService.getWeather(this.city).subscribe(
        (data) => {
          this.weatherData = data;
          this.loading = false;
        },
        (error) => {
          alert('City not found!');
          this.weatherData = null;
          this.loading = false;
        }
      );
    }
  }

  getForecast() {
    this.weatherService.getFiveDayForecast(this.city).subscribe(
      (data) => {
        this.forecastData = data.list.filter((_: any, index: any) => index % 8 === 0); // Get one forecast per day
      },
      (error) => {
        alert('Error fetching forecast!');
      }
    );
  }

  getLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getWeatherByCoords(lat, lon).subscribe((data) => {
          this.weatherData = data;
        });
      });
    }
  }

}
