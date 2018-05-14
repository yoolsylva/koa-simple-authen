import User from '../models/users';
import jwt from 'jsonwebtoken'

class UsersControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Find a city
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  async findByUser(ctx){
    try {
      const user = await User.findOne({'email': ctx.request.body.email});
      if(!user){
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a city
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const user = await new User(ctx.request.body).save();
      ctx.status = 200;
      ctx.body = {
        token: jwt.sign(
          {},
          'YourKey'
        ),
        email: user.email,
        message: 'Succesfull registration'
      }
    } catch (err) {
      console.log(err);
      ctx.throw(422);
    }
  }

  /**
   * Update a city
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
      );
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Delete a city
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const user = await User.findByIdAndRemove(ctx.params.id);
      if (!user) {
        ctx.throw(404);
      }
      ctx.body = user;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new UsersControllers();
