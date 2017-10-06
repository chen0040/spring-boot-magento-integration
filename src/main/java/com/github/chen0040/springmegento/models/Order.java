package com.github.chen0040.springmegento.models;

import com.github.chen0040.magento.models.Address;
import com.github.chen0040.magento.models.Cart;
import com.github.chen0040.magento.models.CartTotal;
import io.searchbox.annotations.JestId;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


/**
 * Created by chen0 on 15/7/2017.
 */
@Getter
@Setter
public class Order {
    @JestId
    private String id;

    private long customerId;
    private Map<Long, Shipment> shipments = new HashMap<>();
    private Cart cart;
    private CartTotal cartTotal;
    private Address shippingAddress = new Address();
    private long timestamp;

    public Order() {
        id = UUID.randomUUID().toString();
    }
}
