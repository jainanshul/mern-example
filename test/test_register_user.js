import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/server';
import User from '../server/models/user';


chai.should();
chai.use(chaiHttp);

suite('Test POST /user', () => {
  setup(async () => {
    // Before each test we empty the database
    await User.remove({});
  });

  /**
   * Register user with missing email
   */
  test('POST /user missing email', async () => {
    const user = {
      password: '12345678',
      role: 'user',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').to.not.be.null;
  });

  /**
   * Register user with missing password
   */
  test('POST /user missing password', async () => {
    const user = {
      email: 'test@test.com',
      role: 'user',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').to.not.be.null;
  });

  /**
   * Register user with missing role
   */
  test('POST /user missing role', async () => {
    const user = {
      email: 'test@test.com',
      password: '12345678',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').to.not.be.null;
  });

  /**
   * Register user with invalid email
   */
  test('POST /user invalid email', async () => {
    const user = {
      email: 'test@',
      password: '12345678',
      role: 'user',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').to.not.be.null;
  });

  /**
   * Register user with invalid role
   */
  test('POST /user invalid role', async () => {
    const user = {
      email: 'test@test.com',
      password: '12345678',
      role: 'invalid',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage').to.not.be.null;
  });

  /**
   * Register user successfully
   */
  test('POST /user', async () => {
    const user = {
      email: 'test@test.com',
      password: '12345678',
      role: 'user',
    };

    const res = await chai.request(server).post('/user').send(user);

    res.should.have.status(201);
    res.should.have.header('location');
  });
});
