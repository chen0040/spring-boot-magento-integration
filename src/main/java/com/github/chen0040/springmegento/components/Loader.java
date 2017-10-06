package com.github.chen0040.springmegento.components;


import com.github.chen0040.springmegento.models.SpringUser;
import com.github.chen0040.springmegento.models.SpringUserEntity;
import com.github.chen0040.springmegento.services.MagentoService;
import com.github.chen0040.springmegento.services.OrderService;
import com.github.chen0040.springmegento.services.SpringUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.*;


/**
 * Created by chen0 on 2/6/2016.
 */
@Component
public class Loader implements ApplicationListener<ApplicationReadyEvent> {
   private static final Logger logger = LoggerFactory.getLogger(Loader.class);

   @Value("${magento.admin.email}")
   private String supportEmail;

   @Value("${magento.admin.username}")
   private String magentoUsername;

   @Value("${magento.admin.password}")
   private String magentoPassword;

   @Autowired
   private MagentoService magentoService;

   @Autowired
   private OrderService orderService;

   @Override public void onApplicationEvent(ApplicationReadyEvent e) {
      logger.info("Loader triggered at {}", e.getTimestamp());

      ApplicationContext context = e.getApplicationContext();
      logger.info("Run loader...");


      SpringUserService userService = context.getBean(SpringUserService.class);

      logger.info("Run users...");
      setupUsers(userService);
      setupAdmin(userService);

      esBootstrap();

   }

   private void esBootstrap(){
      logger.info("bootstrapping for elasticsearch");
      orderService.bootstrap();
   }


   private Random random = new Random(new Date().getTime());

   private void setupAdmin(SpringUserService userService) {

      String username = "admin";
      logger.info("Setup {}", username);

      SpringUser admin;
      Optional<SpringUser> userOptional = userService.findUserByUsername(username);
      if(userOptional.isPresent()){
         admin = userOptional.get();
         String roles = admin.getRoles();
         if(!roles.contains("ROLE_ADMIN") || !roles.contains("ROLE_USER")) {
            admin.setRoles("ROLE_USER,ROLE_ADMIN");
         }
      } else {
         admin = new SpringUserEntity();
         admin.setUsername(magentoUsername);
         admin.setRoles("ROLE_USER,ROLE_ADMIN");
         admin.setPassword(magentoPassword);
         admin.setEmail(supportEmail);
         admin.setEnabled(true);
      }

      userService.save(admin);
   }

   private void setupUsers(SpringUserService userService){
      for(int i=1; i <= 2; ++i){
         String companyName = "company" + i;
         logger.info("Setup {}", companyName);



         String username = "user" + i;
         logger.info("Setup {}", username);

         SpringUser user;
         Optional<SpringUser> userOptional = userService.findUserByUsername(username);
         if(userOptional.isPresent()) {
            user = userOptional.get();
         } else {
            user = new SpringUserEntity();
            if(i == 1) {
               user.setEmail(supportEmail);
            } else {
               user.setEmail(supportEmail);
            }

            user.setUsername(username);
            user.setPassword(username);
            user.setEnabled(true);
         }

         user.setRoles("ROLE_USER");
         userService.save(user);
      }
   }


}
