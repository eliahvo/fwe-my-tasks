import 'jest';
import request from 'supertest';
import { Task } from '../../../entity/Task';
import { Tracking } from '../../../entity/Tracking';
import { Helper } from "../../helper";

describe('tracking', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });


  it('should fail by trying to create a new tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    let task: Task;
    try {
      task = await helper.getRepo(Task).findOneOrFail(1);
    } catch (error) { }

    createTrackingInDatabase(helper, done);
  });

  it('should fail by trying to create a new tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/trackings')
      .send({
        description: 'Description',
        taskId: 1000
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('task not found');
        done();
      });
  });

  it('should fail by trying to return a single tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/trackings/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('tracking not found');
        done();
      });
  });


  it('should fail by trying to delete a single tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/trackings/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('tracking not found');
        done();
      });
  });



  it('should fail by trying to patch a single tracking through tracking not found', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/trackings/1000')
      .send({
        description: 'New description'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('tracking not found');
        done();
      });
  });
});

/*
 * function that is called in test 'should fail by trying to create a new tracking' and is extracted because of its complexity
 */
function createTrackingInDatabase(helper: Helper, done: jest.DoneCallback) {
  request(helper.app)
    .post('/api/trackings')
    .send({})
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(400)
    .end((err, res) => {
      if (err)
        throw err;
      expect(res.body.status).toBe('parameter is missing');
      done();
    });
}
