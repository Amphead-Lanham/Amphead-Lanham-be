const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  passwordHash;
  firstName;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.passwordHash = row.password_hash;
    this.firstName = row.first_name;
  }

  static async insert(user) {
    const { rows } = await pool.query(
      `INSERT INTO users (
        email, 
        password_hash, 
        first_name
        ) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [user.email, user.passwordHash, user.firstName]
    );

    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  toJSON() {
    const obj = { ...this };
    delete obj.passwordHash;

    return obj;
  }

};
