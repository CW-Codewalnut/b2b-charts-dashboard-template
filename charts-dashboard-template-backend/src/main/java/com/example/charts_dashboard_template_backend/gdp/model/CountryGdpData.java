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
@Getter
@Setter
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
}
