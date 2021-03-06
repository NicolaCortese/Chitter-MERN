import express from "express"
import RestController from "./rest.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestController.apiGetRestaurants)

router.route("/id/:id").get(RestController.apiGetRestaurantsById)
router.route("/cuisines").get(RestController.apiGetRestaurantsCuisines)

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview)

export default router