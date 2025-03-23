const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const JobPostController = require("./jobPost.controller");
const router = require("express").Router();

router.post("/create",  JobPostController.insertIntoDB);
router.get("/", JobPostController.getAllFromDB);
router.get("/:id", JobPostController.getDataById);
router.delete("/:id", JobPostController.deleteIdFromDB);
router.patch("/:id", JobPostController.updateOneFromDB);

const JobPostRoutes = router;
module.exports =  JobPostRoutes ;
