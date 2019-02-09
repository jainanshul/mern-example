import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/server';
import User from '../server/models/user';


chai.should();
chai.use(chaiHttp);

suite('Test /GET /user API', () => {
  setup(async () => {
    // Before each test we empty the database
    await User.remove({});
  });

  /**
   * Get user with no auth token
   */
  test('GET /user no auth token', async () => {
    const res = await chai.request(server).get('/user');

    res.should.have.status(401);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').eql('Authentication token required');
  });

  /**
   * Get user with malformed auth token
   */
  test('GET /user malformed auth token', async () => {
    const res = await chai.request(server)
    .get('/user')
    .set('Authorization', `Bearer 1234`);

    res.should.have.status(401);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').eql('Authentication error. jwt malformed');
  });

  /**
   * Get user with invalid auth token
   */
  test('GET /user malformed auth token', async () => {
    const res = await chai.request(server)
    .get('/user')
    .set('Authorization', `Bearer fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdDFAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NDk1MTI1MzksImV4cCI6MTU0OTY4NTMzOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCJ9.huDjfUF_N1guPAzvZrA62EQ6DBgTyXM0M5r8MC0dqMI`);

    res.should.have.status(401);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').eql('Authentication error. invalid token');
  });

  /**
   * Get user successfully
   */
  test('GET /user', async () => {
    // Register a new user
    const user = {
      email: 'test@test.com',
      password: '12345678',
      role: 'user',
    };

    let res = await chai.request(server).post('/user').send(user);
    const token = res.body.token;

    // Get the registered user
    res = await chai.request(server)
    .get('/user')
    .set('Authorization', `Bearer ${token}`);

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('user');

    chai.assert.equal(res.body.user.email, user.email);
    chai.assert.equal(res.body.user.role.name, user.role);
    chai.assert.notEqual(res.body.user.password, user.password);
  });
});
