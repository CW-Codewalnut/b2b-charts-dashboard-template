package com.example.charts_dashboard_template_backend.sale;

import com.example.charts_dashboard_template_backend.sale.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
}
