const { Op, where } = require("sequelize"); // Ensure Op is imported
const paginationHelpers = require("../../../helpers/paginationHelper");
const db = require("../../../models");
const ApiError = require("../../../error/ApiError");
const AppliedJob = db.appliedJob;
const Profile = db.profile;


const insertIntoDB = async (data) => {

  // console.log("data", data)

  // const profileData = await Profile.findOne({
  //   where:{
  //     user_id:data.user_id
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


  const profileData = await Profile.findOne({
    where: { user_id: data.user_id }
  });

  if (!profileData) {
    throw new ApiError(404, "Profile not found for this user.");
  }

  console.log("profileData", profileData)


  const appliedJobInfo = {
    ...data, // Spread the original input fields
    name: profileData.name,
    skills: profileData.skills,
    employmentType: profileData.employmentType,
    profileLocation: profileData.location,
  };

  console.log("appliedJobInfo", appliedJobInfo)


  const result = await AppliedJob.create(appliedJobInfo);

  // console.log('result', result)
  return result
};


const getAllFromDB = async (filters, options) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  let andConditions = [];

  // Match `title` starting from the search term
  if (searchTerm) {
    andConditions.push({
      title: { [Op.like]: `${searchTerm}%` },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      [Op.and]: Object.entries(filterData).map(([key, value]) => ({
        [key]: { [Op.eq]: value },
      })),
    });
  }

  let whereConditions = andConditions.length > 0 ? { [Op.and]: andConditions } : {};

  // Try to find products matching `title`
  let result = await AppliedJob.findAll({
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

    result = await AppliedJob.findAll({
      where: whereConditions,
      offset: skip,
      limit,
      order: options.sortBy && options.sortOrder
        ? [[options.sortBy, options.sortOrder.toUpperCase()]]
        : [['createdAt', 'ASC']],
    });
  }

  const total = await AppliedJob.count({ where: whereConditions });

  // If no products are found in both `title` and `tag`
  if (result.length === 0) {
    throw new ApiError(404, "Product not found");
  }

  return {
    meta: { total, page, limit },
    data: result,
  };
};



const getDataById = async (id) => {
  
  const result = await AppliedJob.findAll({
    where:{
      user_id:id
    }
  })

  return result
};

const getAppliedJobProfleById = async (jobPost_id) => {
  
  const result = await AppliedJob.findAll({
    where:{
      jobPost_id:jobPost_id
    }
  })

  return result
};


const deleteIdFromDB = async (id) => {

  const result = await AppliedJob.destroy(
    {
      where:{
        product_id:id
      }
    }
  )

  return result
};


const updateOneFromDB = async (id, payload) => {
 
  const result = await AppliedJob.update(payload,{
    where:{
      product_id:id
    }
  })


  return result

};

const AppliedJobService = {
  getAllFromDB,
  insertIntoDB,
  deleteIdFromDB,
  updateOneFromDB,
  getAppliedJobProfleById,
  getDataById,

};

module.exports = AppliedJobService;