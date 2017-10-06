package com.github.chen0040.springmegento.services;


import com.github.chen0040.springmegento.models.Order;

import java.util.List;


/**
 * Created by xschen on 16/7/2017.
 */
public interface OrderService {
   Order save(Order order);

   Order findById(String orderId);

   boolean exists(String orderId);

   void delete(String orderId);

   List<Order> findByCustomerId(long customerId);

   void bootstrap();

   Order applyShipmentRoutes(Order order);
}
