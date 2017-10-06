package com.github.chen0040.springmegento.controllers;


import com.github.chen0040.springmegento.models.Order;
import com.github.chen0040.springmegento.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by xschen on 15/7/2017.
 */
@RestController
public class OrderController {

   @Autowired
   private OrderService orderService;

   @RequestMapping(value="/magento/customer/{customerId}/orders", method = RequestMethod.POST, consumes="application/json")
   public @ResponseBody Order saveOrder(@PathVariable("customerId") long customerId, @RequestBody Order order){
      order.setCustomerId(customerId);
      order = orderService.applyShipmentRoutes(order);
      order = orderService.save(order);
      return order;
   }

   @RequestMapping(value="/magento/customer/{customerId}/orders/{orderId}", method = RequestMethod.DELETE)
   public @ResponseBody Map<String, Object> deleteOrder(@PathVariable("customerId") long customerId, @PathVariable("orderId") String orderId){
      orderService.delete(orderId);
      return new HashMap<>();
   }

   @RequestMapping(value="/magento/customer/{customerId}/orders", method = RequestMethod.GET)
   public @ResponseBody List<Order> findOrdersByCustomerId(@PathVariable("customerId") long customerId){
      List<Order> orders = orderService.findByCustomerId(customerId);
      return orders;
   }
}
