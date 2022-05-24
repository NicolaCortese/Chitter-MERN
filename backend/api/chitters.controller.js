import ChittersDAO from "../dao/chittersDAO";

export default class ChittersController {
  static async apiGetChitters (req,res, next) {
    const chittersPerPage = re.query.chittersPerPage ? parseInt(req.query.chittersPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    
    let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    const {chittersList, totalNumChitters} = await ChittersDAO.getChitters({
      filters,
      page,
      chittersPerPage
    })

    let response = {
      chitters: chittersList,
      page: page,
      filters: filters,
      entries_per_page: chittersPerPage,
      total_results: totalNumChitters,
    }

    res.json(response)
  }
}