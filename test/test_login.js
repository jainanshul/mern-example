import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../server/server';
import User from '../server/models/user';


chai.should();
chai.use(chaiHttp);

suite('Test /POST /user/login', () => {
  setup(async () => {
    // Before each test we empty the database
    await User.remove({});
  });

  /**
   * Login user failed
   */
  test('/POST /user/login invalid', async () => {
    const user = {
      email: 'test@test.com',
      password: '12345678',
    };

    // Login invalid user
    const res = await chai.request(server)
    .post('/user/login')
    .send(user);

    res.should.have.status(401);
    res.body.should.be.a('object');
    res.body.should.have.property('errorMessage');
  });

  /**
   * Login user successfully
   */
  test('/POST /user/login', async () => {
    const user = {
      email: 'test@test.com',
      password: '12345678',
      role: 'user',
    };

    // Register a new user
    let res = await chai.request(server).post('/user').send(user);
    const token = res.body.token;

    // Login the registered user
    res = await chai.request(server)
    .post('/user/login')
    .send(user);

    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('user');

    chai.assert.equal(res.body.user.email, user.email);
    chai.assert.equal(res.body.user.role.name, user.role);
    chai.assert.notEqual(res.body.user.password, user.password);
  });
});
