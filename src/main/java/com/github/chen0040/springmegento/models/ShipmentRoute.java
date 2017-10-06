package com.github.chen0040.springmegento.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by chen0 on 15/7/2017.
 */
@Getter
@Setter
public class ShipmentRoute {
    private List<ShipmentPt> points = new ArrayList<>();
}
