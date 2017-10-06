package com.github.chen0040.springmegento.services;


import com.github.chen0040.springmegento.consts.IndexPropertyType;
import com.github.chen0040.springmegento.models.Article;
import com.github.chen0040.springmegento.models.IndexMap;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.io.IOException;
import java.util.List;


/**
 * Created by xschen on 16/7/2017.
 */
public class ElasticSearchServiceImplIntegrationTest {
   private static final Logger logger = LoggerFactory.getLogger(ElasticSearchServiceImplIntegrationTest.class);
   private ElasticSearchService es;
   private final static long categoryId = 2L;
   private final static String articleId = "test";
   private final static String indexName = "twitter";
   private final static String typeName = "tweet";

   @BeforeTest
   public void setUp(){
      es = new ElasticSearchServiceImpl();
   }

   @Test
   public void test_createOrUpdateIndexMapping() throws IOException, InterruptedException {
      IndexMap im = new IndexMap();
      im.setName(typeName);
      im.addProperty("message", IndexPropertyType.TEXT);
      im.addProperty("timestamp", IndexPropertyType.LONG);
      im.addProperty("categoryId", IndexPropertyType.LONG);

      es.indexMapping(indexName, typeName, im);

      Thread.sleep(2000L);
   }

   @Test
   public void test_createOrUpdateArticle() throws IOException, InterruptedException {
      boolean exists = es.exists(articleId, indexName, typeName);
      logger.info("exists: {}", exists);
      if(!exists){
         Article article = new Article();
         article.setDocumentId(articleId);
         article.setDocumentVersion(1L);
         article.setMessage("The Lord of the Rings is an epic high fantasy novel");
         article.setUser("chen0040");
         article.setTimestamp(System.currentTimeMillis());
         article.setCategoryId(categoryId);

         es.create(article, indexName, typeName, articleId);
         Thread.sleep(2000L);
      }
      exists = es.exists(articleId, indexName, typeName);
      logger.info("exists: {}", exists);
   }

   @Test
   public void test_deleteArticle() throws IOException, InterruptedException {
      boolean exists = es.exists(articleId, indexName, typeName);
      logger.info("exists: {}", exists);
      if(exists){
         es.delete(indexName, typeName, articleId);
         Thread.sleep(2000L);
      }
      exists = es.exists(articleId, indexName, typeName);
      logger.info("exists: {}", exists);
   }

   @Test
   public void test_searchArticle() throws IOException {
      SearchSourceBuilder builder = new SearchSourceBuilder();
      builder.query(QueryBuilders.termQuery("categoryId", categoryId));
      List<Article> articleList = es.search(indexName, typeName, builder, Article.class);
      logger.info("articles: {}", articleList.size());
   }


}
