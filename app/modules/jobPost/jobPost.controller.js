const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const JobPostService = require("./jobPost.service");
const { JobPostFilterAbleFileds } = require("./jobPost.constants");








const insertIntoDB = catchAsync(async (req, res) => {

  const { 
    title,
    companyName,
    email,
    tags,
    type,
    experience,
    minSalary,
    maxSalary,
    city,
    category_id,
    location,
    user_id,
    content
  } = req.body;

  const data = { 
    title,
    companyName,
    email,
    tags,
    type,
    experience,
    minSalary,
    maxSalary,
    city,
    category_id,
    location,
    user_id,
    content,
  image: req.file === undefined ? undefined : req.file.path,

  }

  const result = await JobPostService.insertIntoDB(data);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, JobPostFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await JobPostService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Job data fetched!!",
      meta: result.meta,
      data: result.data
  })
})



const getDataById = catchAsync(async (req, res) => {

  const result = await JobPostService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetched!!",
      data: result
  })
})


const getManageJobById = catchAsync(async (req, res) => {

  const {userId} = req.params;

  const result = await JobPostService.getManageJobById(userId);
  console.log('userId', userId)
  console.log('result', result)
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await JobPostService.updateOneFromDB(id, req.body);
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

  const result = await JobPostService.deleteIdFromDB(id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost delete successfully!!",
      data: result
  })
})

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

  const result = await JobPostService.getAllFromDBWithoutQuery();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "JobPost data fetch!!",
      data: result
  })
})

 const JobPostController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getManageJobById,
  getAllFromDBWithoutQuery
}

module.exports = JobPostController;