const { ENUM_USER_ROLE } = require("../../enums/user");
const auth = require("../../middlewares/auth");
const { uploadSingle } = require("../../middlewares/upload");
const  ProfileController = require("./profile.controller");
const router = require("express").Router();

router.post("/create",  uploadSingle, ProfileController.insertIntoDB);
router.get("/", ProfileController.getAllFromDB);
router.get("/all", ProfileController.getAllFromDBWithoutQuery);
router.get("/:id", ProfileController.getDataById);
router.delete("/:id",  ProfileController.deleteIdFromDB);
router.patch("/:id", uploadSingle, ProfileController.updateOneFromDB);

const ProfileRoutes = router;
module.exports =  ProfileRoutes;
