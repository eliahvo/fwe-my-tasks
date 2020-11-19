import 'jest';
import request from 'supertest';
import { Task } from '../../../entity/Task';
import { Helper } from "../../helper";

describe('task', () => {
  const helper = new Helper();

  beforeAll(async () => {
    await helper.init();
  });

  afterAll(async () => {
    await helper.shutdown();
  });


  it('should fail by trying to create a new task', async (done) => {
    request(helper.app)
      .post('/api/tasks')
      .send({
        name: 'Demotask'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('parameter is missing');
        done();
      });
  });

  it('should fail by trying to return a single task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('task not found');
        done();
      });
  });


  it('should fail by trying to delete a single task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/tasks/1000')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('task not found');
        done();
      });
  });


  it('should fail by trying to patch a single task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .patch('/api/tasks/1000')
      .send({
        name: 'newName',
        description: 'newDescription'
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


  it('should fail by trying to add labels to a task through incorrect parameter', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/tasks/1/labels')
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

  it('should fail by trying to add labels to a task through task not found', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/tasks/1000/labels')
      .send({
        labelIdList: [2, 4]
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

  it('should fail by trying to delete labels to a task through incorrect parameter', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/tasks/1/labels')
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

  it('should fail by trying to delete labels to a task through task not found', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/tasks/1000/labels')
      .send({
        labelIdList: [2, 4]
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


  it('should fail by trying to return all labels from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks/1000/labels')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('task not found');
        done();
      });
  });


  it('should fail by trying to return all trackings from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks/1000/trackings')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('task not found');
        done();
      });
  });
});