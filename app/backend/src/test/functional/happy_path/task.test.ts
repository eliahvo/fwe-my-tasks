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


  it('should create a new task', async (done) => {
    request(helper.app)
      .post('/api/tasks')
      .send({
        name: 'Demotask',
        description: 'Description',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe('Demotask');
        expect(res.body.data.description).toBe('Description');
        done();
      });
  });



  it('should return all tasks', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(3);
        expect(res.body.data[0].name).toBe('Task1');
        expect(res.body.data[0].description).toBe('Test description');
        done();
      });
  });

  
  it('should return a single task', async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = 'Demotask';
    task.description = 'Description';
    const savedTask = await helper.getRepo(Task).save(task);

    request(helper.app)
      .get('/api/tasks/' + savedTask.taskId)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.taskId).toBe(savedTask.taskId);
        expect(res.body.data.name).toBe(savedTask.name);
        expect(res.body.data.description).toBe(savedTask.description);
        done();
      });
  });


  it('should delete a single task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/tasks/1')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id).toBe(1);
        expect(res.body.data.name).toBe('Task1');
        expect(res.body.data.description).toBe('Test description');
        done();
      });
  });

  
  it('should patch a single task', async (done) => {
    await helper.resetDatabase();

    const task = new Task();
    task.name = 'Demotask';
    task.description = 'Description';
    const savedTask = await helper.getRepo(Task).save(task);

    const newName = 'New name';
    const newDescription = 'New description';

    request(helper.app)
      .patch('/api/tasks/' + savedTask.taskId)
      .send({
        name: newName,
        description: newDescription
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.taskId).toBe(savedTask.taskId);
        expect(res.body.data.name).toBe(newName);
        expect(res.body.data.description).toBe(newDescription);
        done();
      });
  });


  it('should add labels to a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .post('/api/tasks/1/labels')
      .send({
        labelIdList: [2, 4]
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('labels added');
        done();
      });
  });

  it('should delete labels from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .delete('/api/tasks/2/labels')
      .send({
        labelIdList: [2, 3]
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.status).toBe('labels deleted');
        done();
      });
  });


  it('should return all labels from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks/2/labels')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe('Label2');
        expect(res.body.data[1].name).toBe('Label3');
        done();
      });
  });


  it('should return all trackings from a task', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks/2/trackings')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].description).toBe('Tracking2');
        done();
      });
  });

  it('should return all tasks by a filter', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/tasks?labelFilter=Label1&taskNameFilter=Task1&taskDescriptionFilter=Test')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].name).toBe('Task1');
        expect(res.body.data[0].description).toBe('Test description');
        done();
      });
  });

});