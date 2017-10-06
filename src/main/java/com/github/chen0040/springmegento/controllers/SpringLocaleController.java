package com.github.chen0040.springmegento.controllers;


import com.github.chen0040.springmegento.components.SpringRequestHelper;
import com.github.chen0040.springmegento.services.SpringLocaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by xschen on 11/12/2016.
 */
@RestController
public class SpringLocaleController {

   @Autowired
   private SpringLocaleService localeService;

   @Autowired
   private SpringRequestHelper requestHelper;

   @RequestMapping(value = "locales/get-text/{locale}", method = RequestMethod.GET)
   public @ResponseBody  Map<String, String> getTexts(@PathVariable("locale") String locale) {
      List<String> sources = localeService.getSources();
      Map<String, String> result = new HashMap<>();

      for(String source : sources) {
         result.put(source, localeService.getText(source, locale));
      }

      return result;
   }

   @RequestMapping(value = "locales", method = RequestMethod.GET)
   public @ResponseBody Map<String, Map<String, String>> getVocabulary() {
      return localeService.getVocabulary();
   }

   @RequestMapping(value = "locales/get-locale", method = RequestMethod.GET)
   public @ResponseBody Map<String, String> getLocale(HttpServletRequest request){

      String language = requestHelper.getLanguage(request);

      Map<String, String> result = new HashMap<>();
      result.put("locale", language);

      List<String> sources = localeService.getSources();

      for(String source: sources) {
         result.put(source, localeService.getText(source, language));
      }

      return result;
   }


}
