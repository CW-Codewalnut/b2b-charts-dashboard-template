package com.example.charts_dashboard_template_backend.gdp;

import com.example.charts_dashboard_template_backend.gdp.model.GdpData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gdp")
public class GdpController {

    @Autowired
    private GdpService gdpService;

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<GdpData> getGdpData() {
        return gdpService.getAllCountryGdpData();
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public List<GdpData> addGdpData(@RequestBody List<GdpData> gdpData) {
        return gdpService.saveCountryGdpData(gdpData);
    }

    @DeleteMapping
    @CrossOrigin(origins = "*")
    public void deleteGdpData() {
        gdpService.deleteAllCountryGdpData();
    }
}
