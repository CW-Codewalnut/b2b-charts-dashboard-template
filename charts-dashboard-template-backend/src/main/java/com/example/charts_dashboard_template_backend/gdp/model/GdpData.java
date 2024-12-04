package com.example.charts_dashboard_template_backend.gdp.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "gdp_data")
@AllArgsConstructor
@NoArgsConstructor
public class GdpData implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String year;

    @OneToMany(mappedBy = "gdpData", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<CountryGdpData> countryGdpDataList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public List<CountryGdpData> getCountryGdpDataList() {
        return countryGdpDataList;
    }

    public void setCountryGdpDataList(List<CountryGdpData> countryGdpDataList) {
        this.countryGdpDataList = countryGdpDataList;
    }
}
