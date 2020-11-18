import 'jest';
import request from 'supertest';
import { Label } from '../../../entity/Label';
import { Helper } from "../../helper";

describe('label', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });


  it('should fail by trying to create a new label', async (done) => {
    request(helper.app)
      .post('/api/labels')
      .send({})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('parameter is missing');
        done();
      });
  });

  
  it('should fail by trying to return a single label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/labels/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('label not found');
        done();
      });
  });


  it('should fail by trying to delete a single label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/labels/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('label not found');
        done();
      });
  });

  
  it('should fail by trying to patch a single label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();
    
    request(helper.app)
      .patch('/api/labels/1000')
      .send({
        name: 'New name',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('label not found');
        done();
      });
  });

  it('should return all tasks from a label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/labels/1000/tasks')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('label not found');
        done();
      });
  });
});