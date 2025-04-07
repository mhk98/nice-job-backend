const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { uploadSingle } = require("../../middlewares/upload");
const JobCategoryController = require("./jobCategory.controller");
const router = require("express").Router();

router.post("/create",  JobCategoryController.insertIntoDB);
router.get("/", JobCategoryController.getAllFromDB);
router.delete("/:id", JobCategoryController.deleteIdFromDB);
router.patch("/:id", JobCategoryController.updateOneFromDB);

const JobCategoryRoutes = router;
module.exports =  JobCategoryRoutes ;
