package com.example.charts_dashboard_template_backend.gdp;

import com.example.charts_dashboard_template_backend.gdp.model.GdpData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GdpService {

    @Autowired
    private GdpRepository gdpRepository;

    public List<GdpData> getAllCountryGdpData() {
        return gdpRepository.findAll();
    }

    public List<GdpData> saveCountryGdpData(List<GdpData> gdpData) {
        return gdpRepository.saveAll(gdpData);
    }

    public void deleteAllCountryGdpData() {
        gdpRepository.deleteAll();
    }
}
