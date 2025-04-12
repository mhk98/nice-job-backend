const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { uploadSingle } = require("../../middlewares/upload");
const AppliedJobController = require("./appliedJob.controller");
const router = require("express").Router();

router.post("/create",  AppliedJobController.insertIntoDB);
router.get("/", AppliedJobController.getAllFromDB);
router.get("/:id", AppliedJobController.getDataById);
router.get("/appliedProfile/:jobPost_id", AppliedJobController.getAppliedJobProfleById);
router.delete("/:id", AppliedJobController.deleteIdFromDB);
router.patch("/:id", AppliedJobController.updateOneFromDB);

const AppliedJobRoutes = router;
module.exports =  AppliedJobRoutes ;
