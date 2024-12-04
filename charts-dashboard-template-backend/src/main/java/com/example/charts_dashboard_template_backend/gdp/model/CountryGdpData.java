package com.example.charts_dashboard_template_backend.gdp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "country_gdp_data")
@AllArgsConstructor
@NoArgsConstructor
public class CountryGdpData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private long gdp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gdp_data_id")
    @JsonBackReference
    private GdpData gdpData;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public long getGdp() {
        return gdp;
    }

    public void setGdp(long gdp) {
        this.gdp = gdp;
    }

    public GdpData getGdpData() {
        return gdpData;
    }

    public void setGdpData(GdpData gdpData) {
        this.gdpData = gdpData;
    }
}
