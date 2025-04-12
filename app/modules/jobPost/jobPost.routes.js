const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { uploadSingle } = require("../../middlewares/upload");
const JobPostController = require("./jobPost.controller");
const router = require("express").Router();

router.post("/create", uploadSingle,  JobPostController.insertIntoDB);
router.get("/", JobPostController.getAllFromDB);
router.get("/all", JobPostController.getAllFromDBWithoutQuery);
router.get("/:id", JobPostController.getDataById);
router.get("/manage/:userId", JobPostController.getManageJobById);

router.delete("/:id", JobPostController.deleteIdFromDB);
router.patch("/:id", JobPostController.updateOneFromDB);

const JobPostRoutes = router;
module.exports =  JobPostRoutes ;
