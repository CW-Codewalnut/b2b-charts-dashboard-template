package com.example.charts_dashboard_template_backend.sale;

import com.example.charts_dashboard_template_backend.sale.model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public List<Sale> saveSales(List<Sale> sales) {
        return saleRepository.saveAll(sales);
    }

    public void deleteSales() {
        saleRepository.deleteAll();
    }
}

