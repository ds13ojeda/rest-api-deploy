import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '26JamestownAvenue',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, BIN_TO_UUID(id) id FROM movie;'
    )

    return movies
  }

  static async getId({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT into movie (id, title, year, director, duration, poster, rate) values (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }


    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    return movies[0]
  }

  static async update({ id, input }) {

  }

  static async delete({ id }) {

  }
}