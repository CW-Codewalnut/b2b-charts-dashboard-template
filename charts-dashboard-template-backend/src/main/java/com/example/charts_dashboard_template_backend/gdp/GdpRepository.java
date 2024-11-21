package com.example.charts_dashboard_template_backend.gdp;

import com.example.charts_dashboard_template_backend.gdp.model.GdpData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GdpRepository extends JpaRepository<GdpData, Long> {
}
