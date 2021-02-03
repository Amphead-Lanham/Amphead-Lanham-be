const pool = require('../utils/pool');

module.exports = class Image {
  id;
  name;
  imageUrl;
  caption;
  side;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.imageUrl = row.image_url;
    this.caption = row.caption;
    this.side = row.side;
  }

  static async insert(image) {
    const { rows } = await pool.query(
      `INSERT INTO images (name, image_url, caption, side)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [image.name, image.imageUrl, image.caption, image.side]
    );
    return new Image(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM images',
    );
    return rows.map(row => new Image(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM images WHERE id=$1',
      [id]
    );
    if(!rows[0]) return null;
    else return new Image(rows[0]);
  }

  static async update(id, image) {
    const { rows } = await pool.query(
      `UPDATE images
      SET name=$1,
          image_url=$2,
          caption=$3,
          side=$4
      WHERE id=$5
      RETURNING *
      `,
      [image.name, image.imageUrl, image.caption, image.side, id]
    );
    return new Image(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM images WHERE id=$1 RETURNING *',
      [id]
    );
    return new Image(rows[0]);
  }
};
