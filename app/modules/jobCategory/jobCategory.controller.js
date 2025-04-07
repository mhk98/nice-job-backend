const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const JobCategoryService = require("./jobCategory.service");


const insertIntoDB = catchAsync(async (req, res) => {


  const result = await JobCategoryService.insertIntoDB(req.body);
 
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully created category!!",
      data: result
  })
})


const getAllFromDB = catchAsync(async (req, res) => {

  const result = await JobCategoryService.getAllFromDB();
  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category data fetch!!",
      data: result
  })
})


const updateOneFromDB = catchAsync(async (req, res) => {
    const {id} = req.params;
      const result = await JobCategoryService.updateOneFromDB(id, req.body);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Category update successfully!!",
          data: result
      })
    })
    
    
    const deleteIdFromDB = catchAsync(async (req, res) => {
        const {id} = req.params;
        console.log('deleteId',id)
    
      const result = await JobCategoryService.deleteIdFromDB(id);
      sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Category delete successfully!!",
          data: result
      })
    })

 const JobCategoryController = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB
}

module.exports = JobCategoryController;