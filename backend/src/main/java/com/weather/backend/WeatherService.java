package com.weather.backend;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    private final String API_KEY = "6003d8fafd007611eb71441f5fa4749d";

    public String getWeather(String city) {

        String url =
                "https://api.openweathermap.org/data/2.5/weather?q="
                        + city
                        + "&appid="
                        + API_KEY
                        + "&units=metric";

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(url, String.class);
    }
    public String getForecast(String city) {

    String url =
            "https://api.openweathermap.org/data/2.5/forecast?q="
                    + city
                    + "&appid="
                    + API_KEY
                    + "&units=metric";

    RestTemplate restTemplate = new RestTemplate();

    return restTemplate.getForObject(url, String.class);
}
public String getAQI(double lat, double lon) {

    String url =
            "https://api.openweathermap.org/data/2.5/air_pollution?lat="
                    + lat
                    + "&lon="
                    + lon
                    + "&appid="
                    + API_KEY;

    RestTemplate restTemplate = new RestTemplate();

    return restTemplate.getForObject(url, String.class);
}
public String getWeatherByCoordinates(
        double lat,
        double lon
){

    String url =
            "https://api.openweathermap.org/data/2.5/weather?lat="
                    + lat
                    + "&lon="
                    + lon
                    + "&appid="
                    + API_KEY
                    + "&units=metric";

    RestTemplate restTemplate = new RestTemplate();

    return restTemplate.getForObject(url, String.class);
}
}
