const pool = require('../utils/pool');

module.exports = class Announcement {
  id;
  side;
  title;
  body;

  constructor(row) {
    this.id = row.id;
    this.side = row.side;
    this.title = row.title;
    this.body = row.body;
  }

  static async insert(announcement) {
    const { rows } = await pool.query(
      `INSERT INTO announcements (side, title, body)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [announcement.side, announcement.title, announcement.body]
    );
    return new Announcement(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM announcements',
    );
    return rows.map(row => new Announcement(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM announcements WHERE id=$1',
      [id]
    );
    if(rows[0]) return null;
    else return new Announcement(rows[0]);
  }

  static async update(id, announcement) {
    const { rows } = await pool.query(
      `UPDATE announcements
      SET side=$1,
          title=$2,
          body=$3
      WHERE id=$4
      RETURNING *
      `,
      [announcement.side, announcement.title, announcement.body, id]
    );
    return new Announcement(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM announcements WHERE id=$1 RETURNING *',
      [id]
    );
    return new Announcement(rows[0]);
  }
};
