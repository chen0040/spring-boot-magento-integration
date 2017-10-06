package com.github.chen0040.springmegento;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;


/**
 * Created by xschen on 13/6/2017.
 */
@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SpringMegentoApplication {
   public static void main(String[] args) {
      SpringApplication.run(SpringMegentoApplication.class, args);
   }
}
