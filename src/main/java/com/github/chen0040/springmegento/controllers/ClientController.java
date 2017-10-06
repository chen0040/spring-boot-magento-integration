package com.github.chen0040.springmegento.controllers;


import com.github.chen0040.springmegento.components.SpringAuthentication;
import com.github.chen0040.springmegento.models.SpringUser;
import com.github.chen0040.springmegento.models.SpringUserDetails;
import com.github.chen0040.springmegento.services.SpringUserService;
import com.github.chen0040.springmegento.viewmodels.SpringUserViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


/**
 * Created by xschen on 15/11/2016.
 */
@RestController
@RequestMapping(value="/client")
public class ClientController {

   private static final Logger logger = LoggerFactory.getLogger(ClientController.class);

   @Autowired
   private SpringUserService userService;

   @Autowired
   private SpringAuthentication authentication;

   @RequestMapping(value="user", method = RequestMethod.GET)
   public @ResponseBody SpringUserViewModel getUser(){
      String username = authentication.getUsername();
      Optional<SpringUser> optional = userService.findUserByUsername(username);

      if(optional.isPresent()) {
         return new SpringUserViewModel(optional.get());
      } else {
         return new SpringUserViewModel();
      }
   }
   @PostMapping(value="user")
   public @ResponseBody SpringUserViewModel saveUser(@RequestBody SpringUserViewModel user){

      SpringUserDetails userDetails = authentication.getCurrentUser();
      String username = user.getUsername(); //get logged in username

      if(!user.getUsername().equals(username)){
         logger.warn("The client tries to save user as someone other than himself: {} to {}", user.getUsername(), username);
         return user;
      }

      authentication.getUser().copyProfile(user);

      return new SpringUserViewModel(userService.save(user));
   }

   @RequestMapping(value="_search/users/userId/{userId}", method = RequestMethod.GET)
   public @ResponseBody SpringUserViewModel findUserById(@PathVariable("userId") long userId) {
      if(!authentication.isSuperUser()){
         return new SpringUserViewModel(authentication.getUser());
      }
      Optional<SpringUser> optional = userService.findUserById(userId);
      if(optional.isPresent()) {
         return new SpringUserViewModel(optional.get());
      }
      return new SpringUserViewModel();
   }


}
