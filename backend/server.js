import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)

// any other route that is not contained in the above
app.use("*", (req, res) => res.status(404).json({ error: "not found a page"}))

export default app