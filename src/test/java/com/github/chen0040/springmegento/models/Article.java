package com.github.chen0040.springmegento.models;


import io.searchbox.annotations.JestId;
import io.searchbox.annotations.JestVersion;
import lombok.Getter;
import lombok.Setter;


/**
 * Created by xschen on 16/7/2017.
 */
@Getter
@Setter
public class Article {

   @JestId
   private String documentId;

   @JestVersion
   private Long documentVersion;

   private String user;

   private String message;

   private long timestamp;

   private long categoryId;

}
