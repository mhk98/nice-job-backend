// const catchAsync = require("../../../shared/catchAsync");
// const sendResponse = require("../../../shared/sendResponse");
// const pick = require("../../../shared/pick");
// const ProfileService = require("./profile.service");
// const { ProfileFilterAbleFileds } = require("./profile.constants");








// // const insertIntoDB = catchAsync(async (req, res) => {

// //   const { 
// //     title,
// //     name,
// //     age,
// //     currentSalary,
// //     expectedSalary,
// //     employment,
// //     education,
// //     languages,
// //     skills,
// //     summary

// //   } = req.body;

// //   const data = { 
// //     title,
// //     name,
// //     age,
// //     currentSalary,
// //     expectedSalary,
// //     employment,
// //     education,
// //     languages,
// //     skills,
// //     summary,
// //   image: req.file === undefined ? undefined : req.file.path,

// //   }

// //   const result = await ProfileService.insertIntoDB(data);
 
// //   sendResponse(res, {
// //       statusCode: 200,
// //       success: true,
// //       message: "Product data created!!",
// //       data: result
// //   })
// // })


// const insertIntoDB = catchAsync(async (req, res) => {
//   try {
//     const {
//       name,
//       title,
//       age,
//       location,
//       currentSalary,
//       expectedSalary,
//       employmentHistory,
//       educationHistory,
//       skills,
//       languages,
//       summary,
//     } = req.body;

//     const jobProfileData = {
//       name,
//       title,
//       age: parseInt(age, 10),
//       location,
//       currentSalary: parseFloat(currentSalary),
//       expectedSalary: parseFloat(expectedSalary),
//       employmentHistory: JSON.parse(employmentHistory || "[]"),
//       educationHistory: JSON.parse(educationHistory || "[]"),
//       skills: JSON.parse(skills || "[]"),
//       languages: JSON.parse(languages || "[]"),
//       summary,
//       image: req.file ? req.file.path : null,
//     };

//     console.log("jobProfileData", jobProfileData)

//     const result = await ProfileService.insertIntoDB(jobProfileData);

//     sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Job profile created successfully!",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Insert Error:", error);
//     sendResponse(res, {
//       statusCode: 400,
//       success: false,
//       message: "Failed to create job profile.",
//       error: error.message,
//     });
//   }
// });



// const getAllFromDB = catchAsync(async (req, res) => {

//   const filters = pick(req.query, ProfileFilterAbleFileds);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   console.log('filters', req.query)


//   const result = await ProfileService.getAllFromDB(filters, options);
//   sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product data fetched!!",
//       meta: result.meta,
//       data: result.data
//   })
// })


// const getDataById = catchAsync(async (req, res) => {

//   const result = await ProfileService.getDataById(req.params.id);
//   sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product data fetched!!",
//       data: result
//   })
// })


// const updateOneFromDB = catchAsync(async (req, res) => {
// const {id} = req.params;
//   const result = await ProfileService.updateOneFromDB(id, req.body);
//   sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product update successfully!!",
//       data: result
//   })
// })


// const deleteIdFromDB = catchAsync(async (req, res) => {

//   const result = await ProfileService.deleteIdFromDB(req.params.id);
//   sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product delete successfully!!",
//       data: result
//   })
// })

// const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {

//   const result = await ProfileService.getAllFromDBWithoutQuery();
//   sendResponse(res, {
//       statusCode: 200,
//       success: true,
//       message: "Product data fetch!!",
//       data: result
//   })
// })

//  const ProfileController = {
//   getAllFromDB,
//   insertIntoDB,
//   getDataById,
//   updateOneFromDB,
//   deleteIdFromDB,
//   getAllFromDBWithoutQuery
// }

// module.exports = ProfileController;







const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const pick = require("../../../shared/pick");
const ProfileService = require("./profile.service");
const { ProfileFilterAbleFileds } = require("./profile.constants");
const { isMobilePhone } = require("validator");

// const insertIntoDB = catchAsync(async (req, res) => {
//   const {
//     name,
//     title,
//     age,
//     location,
//     currentSalary,
//     expectedSalary,
//     employmentHistory,
//     educationHistory,
//     skills,
//     languages,
//     summary,
//   } = req.body;

//   // Prepare job profile data
//   const jobProfileData = {
//     name,
//     title,
//     age: parseInt(age, 10),
//     location,
//     currentSalary: parseFloat(currentSalary),
//     expectedSalary: parseFloat(expectedSalary),
//     employmentHistory: employmentHistory ? JSON.parse(employmentHistory) : [],
//     educationHistory: educationHistory ? JSON.parse(educationHistory) : [],
//     skills: skills ? JSON.parse(skills) : [],
//     languages: languages ? JSON.parse(languages) : [],
//     summary,
//     image: req.file ? req.file.path : null, // Handling file upload
//   };

//   // Log data for debugging (remove in production)
//   // console.log("jobProfileData", jobProfileData);

//   // Insert job profile into DB
//   const result = await ProfileService.insertIntoDB(jobProfileData);

//   // Send response
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Job profile created successfully!",
//     data: result,
//   });
// });


const insertIntoDB = catchAsync(async (req, res) => {
  // console.log(req.body)
  const {
    name,
    title,
    location,
    currentSalary,
    expectedSalary,
    employmentHistory,
    educationHistory,
    skills,
    languages,
    summary,
    user_id,
    jobType,
    employmentType,
    phone,
    notice,
    email,
    currentAddress,
    permanentAddress,
    gender,
    maritalStatus,
    birthday,
    industry,
    city,
    headline,
    category,
  } = req.body;

 

  // Prepare job profile data
  const data = {
    name,
    title,
    location,
    currentSalary: parseFloat(currentSalary),
    expectedSalary: parseFloat(expectedSalary),
    employmentHistory: employmentHistory === "" ? undefined : JSON.parse(employmentHistory),
    educationHistory: educationHistory === "" ? undefined : JSON.parse(educationHistory),
    skills: skills === "" ? undefined : JSON.parse(skills),
    languages: languages === "" ? undefined : JSON.parse(languages),
    summary,
    image: req.file ? req.file.path : null, // Handling file upload
    user_id,
    jobType,
    employmentType,
    phone,
    notice,
    email,
    currentAddress,
    permanentAddress,
    gender,
    maritalStatus,
    birthday,
    industry,
    headline,
    city,
    category,
  };

  // Log data for debugging (remove in production)
  // console.log("jobProfileData", jobProfileData);

  // Insert job profile into DB
  const result = await ProfileService.insertIntoDB(data);

  // Send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job profile created successfully!",
    data: result,
  });
});


const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, ProfileFilterAbleFileds);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await ProfileService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job profile data fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req, res) => {
  const result = await ProfileService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job profile fetched successfully!",
    data: result,
  });
});

const updateOneFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    title,
    location,
    currentSalary,
    expectedSalary,
    employmentHistory,
    educationHistory,
    skills,
    languages,
    summary,
    user_id,
    jobType,
    employmentType,
    phone,
    notice,
    email,
    currentAddress,
    permanentAddress,
    gender,
    maritalStatus,
    birthday,
    industry,
    city,
    headline,
    category,
  } = req.body;

 

  // Prepare job profile data
  const data = {
    name,
    title,
    location,
    currentSalary: parseFloat(currentSalary),
    expectedSalary: parseFloat(expectedSalary),
    employmentHistory: employmentHistory === "" ? undefined : JSON.parse(employmentHistory),
    educationHistory: educationHistory === "" ? undefined : JSON.parse(educationHistory),
    skills: skills === "" ? undefined : JSON.parse(skills),
    languages: languages === "" ? undefined : JSON.parse(languages),
    summary,
    image: req.file ? req.file.path : null, // Handling file upload
    user_id,
    jobType,
    employmentType,
    phone,
    notice,
    email,
    currentAddress,
    permanentAddress,
    gender,
    maritalStatus,
    birthday,
    industry,
    headline,
    city,
    category,
  };

  console.log("data", data)
  
  const result = await ProfileService.updateOneFromDB(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job profile updated successfully!",
    data: result,
  });
});

const deleteIdFromDB = catchAsync(async (req, res) => {
  const result = await ProfileService.deleteIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job profile deleted successfully!",
    data: result,
  });
});

const getAllFromDBWithoutQuery = catchAsync(async (req, res) => {
  const result = await ProfileService.getAllFromDBWithoutQuery();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All job profiles fetched successfully!",
    data: result,
  });
});

const ProfileController = {
  getAllFromDB,
  insertIntoDB,
  getDataById,
  updateOneFromDB,
  deleteIdFromDB,
  getAllFromDBWithoutQuery,
};

module.exports = ProfileController;
