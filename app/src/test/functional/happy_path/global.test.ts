import { Helper } from "../../helper";
import request from 'supertest';

describe('label', () => {
    const helper = new Helper();
  
    beforeAll(async () => {
      await helper.init();
    });
  
    afterAll(async () => {
      await helper.shutdown();
    });
    
    it('should return hello from api', async (done) => {
        await helper.resetDatabase();
    
        request(helper.app)
          .get('/api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.message).toBe('Hello from api');
            done();
          });
      });
});