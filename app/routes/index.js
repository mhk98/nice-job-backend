const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const ProductRoutes = require('../modules/product/product.routes');
// const JobPostRoutes = require('../modules/jobPost/jobPost.routes');


const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
  {
    path: "/product",
    route: ProductRoutes
  },
  // {
  //   path: "/job-post",
  //   route: JobPostRoutes
  // },
  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
