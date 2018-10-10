const getCategories = ({ db }) => async(req, res) => {
  /*
  const { user } = res.locals
  if (user.role === 'admin' && req.query.admin) {
    const categories = await db.select({
      id:'categories.id',
      distance: 'categories.distance',
      duration: 'categories.duration',
      created: 'categories.created',
      friendly_name: 'categories.friendly_name',
      name: 'users.name',
      email: 'users.email'
    }).from('categories').leftJoin('users', 'users.id', 'categories.user_id')
   // console.log(categories)
    res.send({
      data: categories,
      pagination: {
        message: 'soon :)'
      }
    })
  } else {
    const categories = await db.select('*').from('categories').where('user_id', user.id)
    console.log(categories)
    res.send({
      data: categories,
      pagination: {
        message: 'soon :)'
      }
    })
  }
  */
  const categories = await db.select('*').from('categories')
  //console.log(categories)
  res.send({
    data: categories,
    pagination: {
      message: 'soon :)'
    }
  })
}

const getOne = ({ db }) => async(req, res) => {
  //const { user } = res.locals
  let id = req.params.id
  const category = await db('categories').select().where('id', id)
  console.log('PASSEI getOne - Category')
  if ((category.length === 0)) {
    res.status(401)
    return res.send({ error: true })
  }
  res.send(category[0])
}

const remove = ({ db }) => async(req, res) => {
  const { user } = res.locals
  const { id } = req.params
  const category = await db('categories').select().where('id', id)

  if ((category.length === 0) || (user.role === 'user' && category[0].user_id !== user.id)) {
    res.status(401)
    res.send({ error: true })
  } else {
    await db('categories').select().where('id', id).del()
    res.send({ success: true })
  }
}

const createCategory = ({ db }) => async(req, res) => {
  const { user } = res.locals
  const newCategory = req.body
  const categoryToInsert = {
    descricao: newCategory.descricao,
    created: newCategory.created
   
  }

  await db.insert(categoryToInsert).into('categories')
  res.send(categoryToInsert)
}

const update = ({ db }) => async(req, res) => {
  const { user } = res.locals
  const updatedCategory = req.body
  let { id } = req.params

  const run = await db('runs').select().where('id', id)
  if ((run.length === 0) || (user.role === 'user' && run[0].user_id !== user.id)) {
    res.status(401)
    return res.send({ error: true })
  }

  const categoryToUpdate = {
    friendly_name: updatedCategory.friendly_name,
    distance: updatedCategory.distance,
    duration: updatedCategory.duration,
    created: updatedCategory.created
  }

  await db('categories')
    .where('id', id)
    .update(categoryToUpdate)

  res.send(categoryToUpdate)
}

module.exports = {
  getCategories,
  getOne,
  remove,
  createCategory,
  update
}
