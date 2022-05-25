import express from "express"
import RestController from "./rest.controller.js"

const router = express.Router()

router.route("/").get(RestController.apiGetRestaurants)

// router
//   .route("/review")
//   .post(ReviewsController.apiPostReview)
//   .put(ReviewsController.apiUpdateReview)
//   .delete(ReviewsController.apiDeleteReview)

export default router