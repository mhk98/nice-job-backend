const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const { JobPostSearchableFields } = require("./jobPost.constants");
const JobPost = db.jobPost;
const JobCategory = db.jobCategory;


const insertIntoDB = async (data) => {

  console.log(data)
  const {image} = data;
  if (!image) {
    throw new ApiError(400, "Image required")
  }
  const categoryData = await JobCategory.findOne({
    where: { id: data.category_id }
  });

  if (!categoryData) {
    throw new ApiError(404, "Category not found for this user.");
  }

  console.log("categoryData", categoryData)

  const categoryInfo = {
    ...data, // Spread the original input fields
    category: categoryData.category,
    
  };

  console.log("categoryInfo", categoryInfo)
  const result = await JobPost.create(categoryInfo);
  return result
};


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  // // Handle search terms (case-insensitive match on multiple fields)
  if (searchTerm) {
    andConditions.push({
      [Op.or]: JobPostSearchableFields.map((field) => ({
        [field]: {
          [Op.iLike]: `%${searchTerm}%`, // Case-insensitive partial match
        },
      })),
    });
  }

  // Handle filters (exact match for provided keys)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: {
          [Op.eq]: value, // Exact match
        },
      })),
    });
  }

  // Combine conditions
  let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Fetch data with conditions, pagination, and sorting
 
    // Try to find products matching `title`
    let result = await JobPost.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['createdAt', 'ASC']],
    });
  
    // If no products are found with `title`, fallback to `tag`
    if (result.length === 0 && searchTerm) {
      andConditions = [];
      // andConditions.push({
      //   tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
      // });
  
      if (Object.keys(filterData).length > 0) {
        andConditions.push({
          [Op.and]: Object.entries(filterData).map(([key, value]) => ({
            [key]: { [Op.eq]: value },
          })),
        });
      }
  
      whereConditions = { [Op.and]: andConditions };
  
      result = await Product.findAll({
        where: whereConditions,
        offset: skip,
        limit,
        order: options.sortBy && options.sortOrder
          ? [[options.sortBy, options.sortOrder.toUpperCase()]]
          : [['createdAt', 'ASC']],
      });
    }
  
    const total = await JobPost.count({ where: whereConditions });
  
    // If no products are found in both `title` and `tag`
    if (result.length === 0) {
      throw new ApiError(404, "Job not found");
    }
  
    return {
      meta: { total, page, limit },
      data: result,
    };
};

// const getAllFromDB = async (filters, options) => {
//   const { page, limit, skip } = paginationHelpers.calculatePagination(options);
//   const { searchTerm, ...filterData } = filters;

//   let andConditions = [];

//   // Match `title` starting from the search term
//   if (searchTerm) {
//     andConditions.push({
//       title: { [Op.like]: `${searchTerm}%` },
//     });
//   }

//   if (Object.keys(filterData).length > 0) {
//     andConditions.push({
//       [Op.and]: Object.entries(filterData).map(([key, value]) => ({
//         [key]: { [Op.eq]: value },
//       })),
//     });
//   }

//   let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

//   // Try to find Job matching `title`
//   let result = await JobPost.findAll({
//     where: whereConditions,
//     offset: skip,
//     limit,
//     order: options.sortBy && options.sortOrder
//       ? [[options.sortBy, options.sortOrder.toUpperCase()]]
//       : [['createdAt', 'ASC']],
//   });

//   // If no Job are found with `title`, fallback to `tag`
//   if (result.length === 0 && searchTerm) {
//     andConditions = [];
//     // andConditions.push({
//     //   tag: { [Op.like]: `%${searchTerm}%` }, // Matches anywhere in `tag`
//     // });

//     if (Object.keys(filterData).length > 0) {
//       andConditions.push({
//         [Op.and]: Object.entries(filterData).map(([key, value]) => ({
//           [key]: { [Op.eq]: value },
//         })),
//       });
//     }

//     whereConditions = { [Op.and]: andConditions };

//     result = await JobPost.findAll({
//       where: whereConditions,
//       offset: skip,
//       limit,
//       order: options.sortBy && options.sortOrder
//         ? [[options.sortBy, options.sortOrder.toUpperCase()]]
//         : [['createdAt', 'ASC']],
//     });
//   }

//   const total = await JobPost.count({ where: whereConditions });

//   // If no Job are found in both `title` and `tag`
//   if (result.length === 0) {
//     throw new ApiError(404, "Job not found");
//   }

//   return {
//     meta: { total, page, limit },
//     data: result,
//   };
// };



const getAllFromDBWithoutQuery = async () => {
  
  const result = await JobPost.findAll()

  return result
};
const getDataById = async (id) => {
  
  const result = await JobPost.findOne({
    where:{
      id:id
    }
  })

  return result
};

const getManageJobById = async (userId) => {
  
  const result = await JobPost.findAll({
    where:{
      user_id:userId
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {

  const result = await JobPost.destroy(
    {
      where:{
        id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await JobPost.update(payload,{
    where:{
      product_id:id
    }
  })


  return result

};

const JobPostService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getDataById,
  getManageJobById,
  getAllFromDBWithoutQuery
};

module.exports = JobPostService;