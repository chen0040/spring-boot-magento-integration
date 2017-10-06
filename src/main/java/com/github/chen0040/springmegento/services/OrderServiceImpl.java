package com.github.chen0040.springmegento.services;


import com.github.chen0040.magento.models.Address;
import com.github.chen0040.magento.models.Cart;
import com.github.chen0040.magento.models.CartItem;
import com.github.chen0040.springmegento.consts.IndexPropertyType;
import com.github.chen0040.springmegento.models.IndexMap;
import com.github.chen0040.springmegento.models.Order;
import com.github.chen0040.springmegento.models.Shipment;
import com.github.chen0040.springmegento.models.ShipmentPt;
import io.searchbox.client.JestResult;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


/**
 * Created by xschen on 15/7/2017.
 */
@Service
public class OrderServiceImpl implements OrderService {

   @Autowired
   private ElasticSearchService es;

   private static final String indexName = "order";
   private static final String typeName = "order";

   private Random random = new Random(System.currentTimeMillis());

   public OrderServiceImpl(){

   }

   public OrderServiceImpl(ElasticSearchService es) {
      this.es = es;
   }


   @Override
   public Order save(Order order) {
      try {
         es.index(order, indexName, typeName, order.getId());
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return order;
   }

   @Override
   public Order findById(String orderId) {
      try {
         return es.get(orderId, indexName, typeName, Order.class);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return null;
   }

   @Override
   public boolean exists(String orderId) {
      try {
         return es.exists(orderId, indexName, typeName);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return false;
   }

   @Override public void delete(String orderId) {
      try {
         es.delete(indexName, typeName, orderId);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
   }


   @Override
   public List<Order> findByCustomerId(long customerId) {
      SearchSourceBuilder builder = new SearchSourceBuilder();
      builder.query(QueryBuilders.termQuery("customerId", customerId));
      try {
         return es.search(indexName, typeName, builder, Order.class);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      return new ArrayList<>();
   }


   @Override public void bootstrap() {
      try {
         es.index(indexName);
         Thread.sleep(2000L);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
      catch (InterruptedException e) {
         e.printStackTrace();
      }

      IndexMap im = new IndexMap();
      im.setName(typeName);
      im.addProperty("customerId", IndexPropertyType.LONG);
      im.addProperty("timestamp", IndexPropertyType.LONG);

      try {
         es.indexMapping(indexName, typeName, im);
      }
      catch (IOException e) {
         e.printStackTrace();
      }
   }


   @Override public Order applyShipmentRoutes(Order order) {
      Cart cart = order.getCart();
      List<CartItem> items = cart.getItems();
      for(CartItem item : items) {
         long id = item.getItem_id();
         Shipment shipment = order.getShipments().getOrDefault(id, new Shipment());
         if(shipment.getRoute().getPoints().isEmpty()){
            shipment = synthesizeRoute(shipment, item, order.getShippingAddress());
         }
         order.getShipments().put(id, shipment);
      }
      return order;
   }

   private Shipment synthesizeRoute(Shipment shipment, CartItem item, Address destination){
      int pointCount = random.nextInt(5) + 2;

      ShipmentPt pt = new ShipmentPt();
      pt.setDescription("Assembly of " + item.getName() + " at pt 0");
      pt.setStatus("Pending");
      shipment.getRoute().getPoints().add(pt);
      for(int i=0; i < pointCount; ++i){
         pt = new ShipmentPt();
         pt.setDescription("Delivery of " + item.getName() + " from pt " + i + " to pt " + (i+1));
         pt.setStatus("Pending");
         shipment.getRoute().getPoints().add(pt);
      }

      pt = new ShipmentPt();
      String addr = "";
      if(!destination.getStreet().isEmpty()){
         addr = destination.getStreet().get(0);
      }
      addr += destination.getCity() + ", " + destination.getCountry_id() + " " + destination.getPostcode();
      pt.setDescription("Delivery " + item.getName() + " from pt " + pointCount + " to " + addr);
      shipment.getRoute().getPoints().add(pt);

      return shipment;
   }


}
