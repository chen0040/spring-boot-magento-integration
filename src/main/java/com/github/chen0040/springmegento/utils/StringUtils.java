package com.github.chen0040.springmegento.utils;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


/**
 * Created by xschen on 13/6/2017.
 */
public class StringUtils {
   public static boolean isEmpty(String text){
      return text == null || text.equals("");
   }


   public static String encodeUriComponent(String s) {
      try {
         return URLEncoder.encode(s, "UTF-8")
                 .replaceAll("\\+", "%20")
                 .replaceAll("\\%21", "!")
                 .replaceAll("\\%27", "'")
                 .replaceAll("\\%28", "(")
                 .replaceAll("\\%29", ")")
                 .replaceAll("\\%7E", "~");
      } catch (UnsupportedEncodingException e) {
         e.printStackTrace();
      }
      return s;
   }
}
