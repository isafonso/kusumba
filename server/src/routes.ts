import { Request, Response, Router } from "express";
import ProductController from "./controllers/ProductController";
import UserController from "./controllers/UserController";
import multer from "multer";
import { storage } from "./config/multer";
import auth from "./middlewares/auth";

const router = Router();
const upload = multer({ storage });

router.get("/", async (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      "<h1 style='text-align:center; color:rgb(0, 135, 255)'>Kusumba Server Side App</h1>"
    );
});

//Users && Products Routes
router.get("/feed", auth, UserController.index);
router.get("/profile", auth, UserController.index);

//Products Routes
router.post("/search", auth, ProductController.index);
router.post(
  "/addPost",
  auth,
  upload.single("picture"),
  ProductController.store
);
router.get("/product/:id", auth, ProductController.show);
router.post(
  "/edit-product/:id",
  auth,
  upload.single("picture"),
  ProductController.update
);

//Users Routes
router.post("/register", UserController.store);
router.post("/login", UserController.show);
router.get("/user/:id", auth, UserController.show);

export default router;
