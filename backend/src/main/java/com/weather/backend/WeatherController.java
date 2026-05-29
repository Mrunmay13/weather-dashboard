package com.weather.backend;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/")
    public String home() {
        return "Weather Backend Running Successfully 🚀";
    }

    @GetMapping("/api/weather")
    public String getWeather(
            @RequestParam String city
    ) {
        return weatherService.getWeather(city);
    }
    @GetMapping("/api/forecast")
public String getForecast(
        @RequestParam String city
) {
    return weatherService.getForecast(city);
}
@GetMapping("/api/aqi")
public String getAQI(
        @RequestParam double lat,
        @RequestParam double lon
) {
    return weatherService.getAQI(lat, lon);
}
@GetMapping("/api/weather-by-coordinates")
public String getWeatherByCoordinates(

        @RequestParam double lat,

        @RequestParam double lon
){

    return weatherService
            .getWeatherByCoordinates(lat, lon);
}
}