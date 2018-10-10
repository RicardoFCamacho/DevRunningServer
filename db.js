const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite'
  }
})



const initDB = async() => {
  const usersExist = await knex.schema.hasTable('users')
  if (!usersExist) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('email')
      table.string('passwd')
      table.string('role')
      table.string('unit') // metric // imperial
      table.string('timezone')
    })
  }
  const runsExist = await knex.schema.hasTable('runs')
  if (!runsExist) {
    await knex.schema.createTable('runs', table => {
      table.increments('id').primary()
      table.integer('user_id')
      table.string('friendly_name')
      table.integer('duration') // in seconds
      table.timestamp('created') // utc
      table.integer('distance') // meters
    })
  }
  const categoriesExist = await knex.schema.hasTable('categories')
  if (!categoriesExist) {
    await knex.schema.createTable('categories', table => {
      table.increments('id').primary()
      table.string('descricao')
      table.timestamp('created') // utc
      
    })
  }
  
  const totalUsers = await knex('users').select(knex.raw('count(*) as total'))
  console.log(totalUsers[0].total)
  if (totalUsers[0].total === 0) {
    await knex.insert({
      name: 'Tulio Faria',
      email: 'tuliofaria@devpleno.com',
      passwd: 'abc123',
      role: 'admin',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
    await knex.insert({
      name: 'Zé da Silva',
      email: 'ze@dominio.com',
      passwd: 'abc123',
      role: 'user',
      unit: 'metric',
      timezone: 'America/Sao_Paulo'
    }).into('users')
  }
}

initDB()



module.exports = knex
