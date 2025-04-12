const express = require('express');
const UserRoutes = require('../modules/user/user.routes');
const JobPostRoutes = require('../modules/jobPost/jobPost.routes');
const ProfileRoutes = require('../modules/profile/profile.routes');
const AppliedJobRoutes = require('../modules/appliedJob/appliedJob.routes');
const JobCategoryRoutes = require('../modules/jobCategory/jobCategory.routes');
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
  
  {
    path: "/profile",
    route: ProfileRoutes
  },
  
  {
    path: "/appliedJob",
    route: AppliedJobRoutes
  },
  {
    path: "/category",
    route: JobCategoryRoutes
  },
  
  
 
 
  
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
module.exports = router;
