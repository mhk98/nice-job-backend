const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const ProfileService = require("./profile.service");
const { ProfileFilterAbleFileds } = require("./profile.constants");








const insertIntoDB = catchAsync(async (req, res) => {

  const { 
    title,
    name,
    age,
    currentSalary,
    expectedSalary,
    employmentFields,
    educationFields,
    languages,
    skills,

  } = req.body;

  const data = { 
    title,
    name,
    age,
    currentSalary,
    expectedSalary,
    employmentFields,
    educationFields,
    languages,
    skills,
  image: req.file === undefined ? undefined : req.file.path,

  }

  const result = await ProfileService.insertIntoDB(data);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product data created!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const filters = pick(req.query, ProfileFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  console.log('filters', req.query)


  const result = await ProfileService.getAllFromDB(filters, options);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product data fetched!!",
      meta: result.meta,
      data: result.data
  })
})


const getDataById = catchAsync(async (req, res) => {

  const result = await ProfileService.getDataById(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product data fetched!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
const {id} = req.params;
  const result = await ProfileService.updateOneFromDB(id, req.body);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product update successfully!!",
      data: result
  })
})


const deleteIdFromDB = catchAsync(async (req, res) => {

  const result = await ProfileService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product delete successfully!!",
      data: result
  })
})

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

  const result = await ProfileService.getAllFromDBWithoutQuery();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product data fetch!!",
      data: result
  })
})

 const ProfileController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery
}

module.exports = ProfileController;