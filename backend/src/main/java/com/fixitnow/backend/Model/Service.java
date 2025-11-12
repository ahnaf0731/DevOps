package com.fixitnow.backend.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "service")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serId;
    private String title, description;
    private Double price;

    @ManyToOne
    @JoinColumn(name = "provider_id")
    private User provider;

    @ManyToOne
    @JoinColumn(name = "cat_id")
    private Category category;

    // Getters & Setters
    public Long getSerId() { return serId; }
    public void setSerId(Long serId) { this.serId = serId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public User getProvider() { return provider; }
    public void setProvider(User provider) { this.provider = provider; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}