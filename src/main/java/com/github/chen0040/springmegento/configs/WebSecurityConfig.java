package com.github.chen0040.springmegento.configs;

import com.github.chen0040.springmegento.components.SpringAuthenticationSuccessHandler;
import com.github.chen0040.springmegento.services.SpringUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


/**
 * Created by xschen on 15/10/2016.
 */

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

   @Autowired
   private SpringUserDetailService userDetailService;


   @Autowired
   private SpringAuthenticationSuccessHandler authenticationSuccessHandler;


   @Override
   protected void configure(HttpSecurity http) throws Exception {




      http
              .authorizeRequests()

              .antMatchers("/js/client/**").hasAnyRole("USER", "ADMIN")
              .antMatchers("/js/admin/**").hasAnyRole("ADMIN")
              .antMatchers("/admin/**").hasAnyRole("ADMIN")
              .antMatchers("/html/**").hasAnyRole("USER", "ADMIN")
              .antMatchers("/js/commons/**").permitAll()
              .antMatchers("/img/**").permitAll()
              .antMatchers("/css/**").permitAll()
              .antMatchers("/jslib/**").permitAll()
              .antMatchers("/webjars/**").permitAll()
              .antMatchers("/product-3d/**").permitAll()
              .antMatchers("/product-img/**").permitAll()
              .antMatchers("/bundle/**").permitAll()
              .antMatchers("/fonts/*.*").permitAll()
              .antMatchers("/signup").permitAll()
              .antMatchers("/locales").permitAll()
              .antMatchers("/locales/**").permitAll()
              .antMatchers("/privacy-policy").permitAll()
              .antMatchers("/change-locale").permitAll()
              .antMatchers("/link-cache").permitAll()
              .antMatchers("/signup-success").permitAll()
              .antMatchers("/terms-of-use").permitAll()
              .antMatchers("/contact-us").permitAll()
              .antMatchers("/forgot-password").permitAll()
              .antMatchers("/about-us").permitAll()
              .antMatchers("/magento/**").permitAll()
              //.antMatchers(HttpMethod.POST, "/magento/**").permitAll()
              .antMatchers("/magento/new-product").hasAnyRole("USER", "ADMIN")
              .antMatchers("/magento/upload/**").hasAnyRole("USER", "ADMIN")
              .antMatchers("/magento/add-product-to-category").hasAnyRole("USER", "ADMIN")
              .anyRequest().authenticated()
              .and()
              .formLogin()
              .loginPage("/login")
              .defaultSuccessUrl("/home")
              .successHandler(authenticationSuccessHandler)
              .permitAll()
              .and()
              .logout()
              .permitAll()
              .and()
              .csrf()
              .disable();
              //.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
   }

   @Autowired
   public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {


      auth.userDetailsService(userDetailService)
              .passwordEncoder(new BCryptPasswordEncoder());
   }
}
