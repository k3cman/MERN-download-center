const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const _ = require("lodash");

const conn = require("../../config/connection");

router.get("/all", (req, res) => {
  conn.query(
    `SELECT * FROM enmon.article_collections`,
    (err, result, fields) => {
      const data = result;
      const categoriesList = data
        .map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
      const brandsList = data
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index);

      let tempObj = {};

      data.forEach(item => {
        if (typeof tempObj[item.brand] === "undefined")
          tempObj[item.brand] = [];

        tempObj[item.brand].push({
          id: item.id,
          title: item.title,
          newsletter: item.pdf,
          masterImg: item.image,
          cat: item.category
        });
      });

      let newItems = [];

      for (let brand in tempObj) {
        newItems.push({
          brand: brand,
          items: []
        });
        var lastItem = newItems.length - 1;
        tempObj[brand].forEach(item => {
          newItems[lastItem].items.push(item);
        });
      }

      let resFinal = {
        catList: categoriesList,
        brandList: brandsList,
        all: newItems
      };
      res.json(resFinal);
    }
  );
});

router.get("/c/:cat", (req, res) => {
  conn.query(
    `SELECT * FROM enmon.article_collections WHERE category in('${
      req.params.cat
    }')`,
    (err, result, fields) => {
      const data = result;
      const categoriesList = data
        .map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
      const brandsList = data
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index);

      let tempObj = {};

      data.forEach(item => {
        if (typeof tempObj[item.brand] === "undefined")
          tempObj[item.brand] = [];

        tempObj[item.brand].push({
          id: item.id,
          title: item.title,
          newsletter: item.pdf,
          masterImg: item.image,
          cat: item.category
        });
      });

      let newItems = [];

      for (let brand in tempObj) {
        newItems.push({
          brand: brand,
          items: []
        });
        var lastItem = newItems.length - 1;
        tempObj[brand].forEach(item => {
          newItems[lastItem].items.push(item);
        });
      }

      let resFinal = {
        catList: categoriesList,
        brandList: brandsList,
        all: newItems
      };
      res.json(resFinal);
    }
  );
});

router.get("/b/:brand", (req, res) => {
  conn.query(
    `SELECT * FROM enmon.article_collections WHERE brand='${req.params.brand}'`,
    (err, result, fields) => {
      const data = result;
      const categoriesList = data
        .map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
      const brandsList = data
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index);

      let tempObj = {};

      data.forEach(item => {
        if (typeof tempObj[item.brand] === "undefined")
          tempObj[item.brand] = [];

        tempObj[item.brand].push({
          id: item.id,
          title: item.title,
          newsletter: item.pdf,
          masterImg: item.image,
          cat: item.category
        });
      });

      let newItems = [];

      for (let brand in tempObj) {
        newItems.push({
          brand: brand,
          items: []
        });
        var lastItem = newItems.length - 1;
        tempObj[brand].forEach(item => {
          newItems[lastItem].items.push(item);
        });
      }

      let resFinal = {
        catList: categoriesList,
        brandList: brandsList,
        all: newItems
      };
      res.json(resFinal);
    }
  );
});

router.get("/search/:search", (req, res) => {
  conn.query(
    `SELECT * FROM enmon.article_collections WHERE title LIKE '%${
      req.params.search
    }%' OR brand LIKE '%${req.params.search}%';`,
    (err, result, fields) => {
      const data = result;
      const categoriesList = data
        .map(item => item.category)
        .filter((value, index, self) => self.indexOf(value) === index);
      const brandsList = data
        .map(item => item.brand)
        .filter((value, index, self) => self.indexOf(value) === index);

      let tempObj = {};

      data.forEach(item => {
        if (typeof tempObj[item.brand] === "undefined")
          tempObj[item.brand] = [];

        tempObj[item.brand].push({
          id: item.id,
          title: item.title,
          newsletter: item.pdf,
          masterImg: item.image,
          cat: item.category
        });
      });

      let newItems = [];

      for (let brand in tempObj) {
        newItems.push({
          brand: brand,
          items: []
        });
        var lastItem = newItems.length - 1;
        tempObj[brand].forEach(item => {
          newItems[lastItem].items.push(item);
        });
      }

      let resFinal = {
        catList: categoriesList,
        brandList: brandsList,
        all: newItems
      };
      res.json(resFinal);
    }
  );
});

module.exports = router;
