let chitters

export default class ChittersDAO {
  static async injectDB(conn) {
    if (chitters) {
      return
    }
    try {
      chitters = await conn.db(process.env.CHITTERS_NS).collection("planets")
    } catch (e) {
      console.error(
        `unable to establish a collection handle in chittersDAO: ${e}`,
      )
    }
  }

  static async getChitters({
    filters = null,
    page = 0,
    chittersPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("cuisine" in filters) {
        query = { "cuisine": { $eq: filters["cuisine"] } }
      } else if ("zipcode" in filters) {
        query = { "address.zipcode": { $eq: filters["zipcode"] } }
      }
    }

    let cursor

    try{
      cursor = await chitters
      .find(query)
    } catch (e) {
      console.error(`Unable to issue find command ${e}`)
      return { chittersList: [], totalNumChitters: 0}
    }

    const displayCursor = cursor.limit(chittersPerPage).skip(chittersPerPage * page)
  

    try {
      const chittersList = await displayCursor.toArray()
      const totalNumChitters = await chitters.countDocuments(query)
    
      return { chittersList, totalNumChitters}
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      )
      return {chittersList: [], totalNumChitters: 0}
    }
  }

}