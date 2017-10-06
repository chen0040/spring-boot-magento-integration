package com.github.chen0040.springmegento.controllers;


import com.github.chen0040.springmegento.components.SpringAuthentication;
import com.github.chen0040.springmegento.models.SpringUser;
import com.github.chen0040.springmegento.services.SpringUserService;
import com.github.chen0040.springmegento.viewmodels.SpringUserViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


/**
 * Created by xschen on 13/11/2016.
 */
@RestController
@RequestMapping(value="/admin")
public class AdminController {

   @Autowired
   private SpringUserService userService;


   @Autowired
   private SpringAuthentication authentication;

   @RequestMapping(value="users", method = RequestMethod.GET)
   @ResponseBody
   public List<SpringUserViewModel> findAll(){
      return userService.findAll().stream().map(SpringUserViewModel::new).collect(Collectors.toList());
   }

   @RequestMapping(value="users", method = RequestMethod.POST)
   @ResponseBody
   public SpringUserViewModel saveUser(@RequestBody SpringUserViewModel user){

      String currentUsername = authentication.getUsername();

      Optional<SpringUser> existingUserOptional = userService.findUserByUsername(user.getUsername());

      SpringUser currentUser = authentication.getUser();

      if(existingUserOptional.isPresent()) {
         SpringUser existingUser = existingUserOptional.get();
         if(user.getUsername().equals(currentUsername)) {

            if(user.getRoles().equals(existingUser.getRoles())) {
               user.setRoles(existingUser.getRoles());
            }
         }

         if (existingUser.isSuperUser()) {
            if (!currentUser.getUsername().equalsIgnoreCase("admin")) {
               return new SpringUserViewModel(existingUser);
            }
         }

         if (existingUser.getUsername().equals("admin")) {
            user.setRoles("ROLE_USER,ROLE_ADMIN");
            user.setEnabled(true);
         }
      }

      return new SpringUserViewModel(userService.save(user));
   }

   @RequestMapping(value="users/{id}", method = RequestMethod.GET)
   @ResponseBody
   public SpringUserViewModel findUserById(@PathVariable(value="id") long id){
      Optional<SpringUser> optional = userService.findUserById(id);
      if(optional.isPresent()) {
         return new SpringUserViewModel(optional.get());
      } else {
         return new SpringUserViewModel();
      }
   }


   @RequestMapping(value="users/{id}", method = RequestMethod.DELETE)
   @ResponseBody
   public Map<String, Object> deleteUserById(@PathVariable(value="id") long id){
      Optional<SpringUser> existingUserOptional = userService.findUserById(id);
      String username = authentication.getUsername();
      Optional<SpringUser> currentUserOptional = userService.findUserByUsername(username);

      Map<String, Object> result = new HashMap<>();
      if(!existingUserOptional.isPresent()) {
         result.put("deleted", false);
         result.put("reason", "User " + username + " does not exists");
         return result;
      }

      if(!currentUserOptional.isPresent()) {
         result.put("deleted", false);
         result.put("reason", "Your user account " + username + " does not exists");
         return result;
      }

      SpringUser existingUser = existingUserOptional.get();
      SpringUser currentUser = currentUserOptional.get();

      if(existingUser.getUsername().equals(username)) {
         result.put("deleted", false);
         result.put("reason", "User " + username + " is the current logged-in user and thus cannot be deleted");
         return result;

      } else if(existingUser.isSuperUser() && !currentUser.getUsername().equalsIgnoreCase("admin")){
         result.put("deleted", false);
         result.put("reason", "User " + username + " is a super user that can only be deleted by super super user");
         return result;
      }

      userService.deleteUserById(id);

      result.put("deleted", true);
      result.put("reason", "");
      return result;
   }



}
