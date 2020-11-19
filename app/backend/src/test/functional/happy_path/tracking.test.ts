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


  it('should create a new tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    let task: Task;
    try {
      task = await helper.getRepo(Task).findOneOrFail(1);
    } catch (error) { }

    createTrackingInDatabase(helper, task, done);
  });



  it('should return all trackings', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/trackings')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].description).toBe('Tracking1');
        expect(res.body.data[0].task.taskId).toBe(1);
        done();
      });
  });


  it('should return a single tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/trackings/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.trackingId).toBe(1);
        expect(res.body.data.description).toBe('Tracking1');
        expect(res.body.data.task.taskId).toBe(1);
        done();
      });
  });


  it('should delete a single tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/trackings/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id).toBe(1);
        expect(res.body.data.description).toBe('Tracking1');
        done();
      });
  });

  it('should patch a single tracking with taskId', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/trackings/1')
      .send({
        description: 'New description'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.trackingId).toBe(1);
        expect(res.body.data.description).toBe('New description');
        done();
      });
  });

  it('should patch a single tracking', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/trackings/1')
      .send({
        description: 'New description'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.trackingId).toBe(1);
        expect(res.body.data.description).toBe('New description');
        done();
      });
  });
});

/*
 * function that is called in test 'should create a new tracking' and is extracted because of its complexity
 */
function createTrackingInDatabase(helper: Helper, task: Task, done: jest.DoneCallback) {
  request(helper.app)
    .post('/api/trackings')
    .send({
      description: 'Description',
      taskId: task.taskId
    })
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect(201)
    .end((err, res) => {
      if (err)
        throw err;
      expect(res.body.data.description).toBe('Description');
      expect(res.body.data.task.taskId).toBe(task.taskId);
      done();
    });
}
