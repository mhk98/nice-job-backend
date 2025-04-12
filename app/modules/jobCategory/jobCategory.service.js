const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const JobCategory = db.jobCategory;


const insertIntoDB = async (data) => {

  const result = await JobCategory.create(data);

  // console.log('result', result)
  return result
};



const getAllFromDB = async () => {
  
    const result = await JobCategory.findAll()
  
    return result
  };


  const deleteIdFromDB = async (id) => {
  
    const result = await JobCategory.destroy(
      {
        where:{
          id:id
        }
      }
    )
  
    return result
  };
  
  
  const updateOneFromDB = async (id, payload) => {
   
    const result = await JobCategory.update(payload,{
      where:{
        product_id:id
      }
    })
  
  
    return result
  
  };


const JobCategoryService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB
};

module.exports = JobCategoryService;