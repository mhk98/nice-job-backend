const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const AppliedJobService = require("./appliedJob.service");
const { AppliedJobFilterAbleFileds } = require("./appliedJob.constants");
const db = require("../../../models");
// const Profile = db.profile;









const insertIntoDB = catchAsync(async (req, res) => {

  const { 
    title,
    companyName,
    minSalary,
    maxSalary,
    location,
    type,
    user_id,
    jobPost_id
  } = req.body;

  const data = { 
    title,
    companyName,
    minSalary,
    maxSalary,
    location,
    type,
    user_id,
    jobPost_id
  }

  //   const profileData = await Profile.findOne({
  //   where:{
  //     user_id:user_id
  //   }
  // })

  // console.log("profileData", profileData)
  // const appliedJobInfo = {
  //   data,
  //   name: profileData.name,
  //   skills: profileData.skills,
  //   employmentType:profileData.employmentType,
  //   profileLocation: profileData.location
  // }

  const result = await AppliedJobService.insertIntoDB(data);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully applied job!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, AppliedJobFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


//   const result = await CartService.getAllFromDB(filters, options);
  const result = await AppliedJobService.getAllFromDB( options, filters);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await AppliedJobService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetched!!",
      data: result
  })
})

const getAppliedJobProfleById = catchAsync(async (req, res) => {

  const result = await AppliedJobService.getAppliedJobProfleById(req.params.jobPost_id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await AppliedJobService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    console.log('deleteId',id)

  const result = await AppliedJobService.deleteIdFromDB(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost delete successfully!!",
      data: result
  })
})

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

  const result = await AppliedJobService.getAllFromDBWithoutQuery();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetch!!",
      data: result
  })
})

 const AppliedJobController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery,
  getAppliedJobProfleById
}

module.exports = AppliedJobController;