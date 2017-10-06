package com.github.chen0040.springmegento.services;


import com.github.chen0040.magento.models.Address;
import com.github.chen0040.magento.models.Cart;
import com.github.chen0040.magento.models.CartTotal;
import com.github.chen0040.springmegento.models.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.List;

import static org.testng.Assert.*;


/**
 * Created by xschen on 16/7/2017.
 */
public class OrderServiceImplIntegrationTest {
   private static final Logger logger = LoggerFactory.getLogger(OrderServiceImplIntegrationTest.class);
   private static final long customerId = 2L;
   private static final String orderId = "test";
   private OrderService orderService;
   @BeforeMethod
   public void setUp(){
      orderService = new OrderServiceImpl(new ElasticSearchServiceImpl());
   }

   @Test
   public void test_createOrUpdateOrder() {
      boolean exists = orderService.exists(orderId);
      logger.info("exists: {}", exists);

      Order order = new Order();
      order.setCart(new Cart());
      order.setCartTotal(new CartTotal());
      order.setCustomerId(customerId);
      order.setShippingAddress(new Address());
      order.setId(orderId);

      orderService.save(order);
      try {
         Thread.sleep(2000L);
      }
      catch (InterruptedException e) {
         e.printStackTrace();
      }

      exists = orderService.exists(orderId);
      logger.info("exists: {}", exists);
   }

   @Test
   public void test_deleteOrder() {
      boolean exists = orderService.exists(orderId);
      logger.info("exists: {}", exists);



      orderService.delete(orderId);
      try {
         Thread.sleep(2000L);
      }
      catch (InterruptedException e) {
         e.printStackTrace();
      }

      exists = orderService.exists(orderId);
      logger.info("exists: {}", exists);
   }

   @Test
   public void test_findByCustomerId() {
      List<Order> orders = orderService.findByCustomerId(customerId);
      logger.info("orders: {}", orders.size());
   }

}
