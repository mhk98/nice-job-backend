const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const JobPostRoutes = require('../modules/jobPost/jobPost.routes');
// const JobPostRoutes = require('../modules/jobPost/jobPost.routes');


const router = express.Router();

const moduleRoutes = [
 
  {
    path: "/user",
    route: UserRoutes
  },
 
  {
    path: "/jobpost",
    route: JobPostRoutes
  },
  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
