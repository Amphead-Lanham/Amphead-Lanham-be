const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Announcement = require('../lib/models/anouncement');

describe('amphead-lanham-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates an announcement', () => {
    return request(app)
      .post('/api/v1/announcements')
      .send({
        side: 'Amphead',
        title: 'Hours',
        body: 'm-f, 12-6',

      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          side: 'Amphead',
          title: 'Hours',
          body: 'm-f, 12-6',
        });
    
      });
  });

  it('gets all announcements', async() => {
    const announcements = await Promise.all([
      { side: 'Amphead', Title: 'Hours', body: 'M-F, 12-6' },
      { side: 'Lanham', Title: 'new amp model', body: 'introducing THE HYDRA!' },
      { side: 'Amphead', Title: 'Holiday Hours', body: 'M-F, 12-6, closed DEC. 25th' }
    ].map(announcement => Announcement.insert(announcement)));

    return request(app)
      .get('/api/v1/announcements')
      .then(res => {
        announcements.forEach(announcement => {
          expect(res.body).toContainEqual(announcement);
        });
      });
  });

  it('updates a announcement by id', async() => {
    const announcement = await Announcement.insert({
      side: 'Amphead',
      title: 'Hours',
      body: 'm-f, 12-6'
    });

    return request(app)
      .put(`/api/v1/announcements/${announcement.id}`)
      .send({
        side: 'Lanham',
        title: 'Holiday Hours',
        body: 'm-f, 12-6'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          side: 'Lanham',
          title: 'Holiday Hours',
          body: 'm-f, 12-6'
        });
      });
  });

  
});
