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


  it('should create a new label', async (done) => {
    request(helper.app)
      .post('/api/labels')
      .send({
        name: 'Demolabel',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.name).toBe('Demolabel');
        done();
      });
  });



  it('should return all labels', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/labels')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(4);
        expect(res.body.data[0].name).toBe('Label1');
        done();
      });
  });

  
  it('should return a single label', async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = 'Demolabel';
    const savedLabel = await helper.getRepo(Label).save(label);

    request(helper.app)
      .get('/api/labels/' + savedLabel.labelId)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.labelId).toBe(savedLabel.labelId);
        expect(res.body.data.name).toBe(savedLabel.name);
        done();
      });
  });


  it('should delete a single label', async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = 'Demolabel';
    const savedLabel = await helper.getRepo(Label).save(label);

    request(helper.app)
      .delete('/api/labels/' + savedLabel.labelId)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.id).toBe(savedLabel.labelId);
        expect(res.body.data.name).toBe(savedLabel.name);
        done();
      });
  });

  
  it('should patch a single label', async (done) => {
    await helper.resetDatabase();

    const label = new Label();
    label.name = 'Demolabel';
    const savedLabel = await helper.getRepo(Label).save(label);
    
    request(helper.app)
      .patch('/api/labels/' + savedLabel.labelId)
      .send({
        name: 'New name',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.labelId).toBe(savedLabel.labelId);
        expect(res.body.data.name).toBe('New name');
        done();
      });
  });

  it('should return all tasks from a label', async (done) => {
    await helper.resetDatabase();
    await helper.loadFixtures();

    request(helper.app)
      .get('/api/labels/1/tasks')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.data.length).toBe(2);
        expect(res.body.data[0].name).toBe('Task1');
        expect(res.body.data[1].name).toBe('Task3');
        done();
      });
  });
});