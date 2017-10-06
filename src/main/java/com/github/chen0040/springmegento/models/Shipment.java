package com.github.chen0040.springmegento.models;


import lombok.Getter;
import lombok.Setter;


/**
 * Created by chen0 on 15/7/2017.
 */
@Getter
@Setter
public class Shipment {
    private String option = "";
    private double price = 1.0;
    private ShipmentRoute route = new ShipmentRoute();
}
