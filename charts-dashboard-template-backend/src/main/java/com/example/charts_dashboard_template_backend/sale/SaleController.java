package com.example.charts_dashboard_template_backend.sale;

import com.example.charts_dashboard_template_backend.sale.model.Sale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    @Autowired
    private SaleService saleService;

    @GetMapping
    @CrossOrigin(origins = "*")
    public List<Sale> getSales() {
        return saleService.getAllSales();
    }

    @PostMapping
    @CrossOrigin(origins = "*")
    public List<Sale> addSale(@RequestBody List<Sale> sales) {
        return saleService.saveSales(sales);
    }

    @DeleteMapping
    @CrossOrigin(origins = "*")
    public void deleteSales() {
        saleService.deleteSales();
    }
}

