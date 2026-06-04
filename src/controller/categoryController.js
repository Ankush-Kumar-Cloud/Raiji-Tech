import Category from "../model/Category.js"

export const createCategory = async(req, res) =>{
  try {
    const category = await Category.create(req.body)
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getCategory = async(req, res) =>{
  try {
    const categories = await Category.find()

    res.status(201).json(categories)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
  
}

