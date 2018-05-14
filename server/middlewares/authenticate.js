import jwt from 'jsonwebtoken';
import User from '../models/users'
import bcrypt from 'bcrypt'

export default async ctx => {
    try {
        const user = await User.findOne({email: ctx.request.body.email});
        const result = bcrypt.compareSync(ctx.request.body.password, user.password);
        if (result === true) {
            ctx.status = 200;
            ctx.body = {
                token: jwt.sign(
                    {},
                    'YourKey'
                ), // Store this key in an environment variable
                message: 'Successful Authentication'
            };
        } else {
            ctx.status = 401;
            ctx.body = {
                message: 'Authentication Failed'
            };
        }

    } catch (err) {
        console.log(err);
        ctx.status = 404;
        ctx.body = {
            message: 'User not found',
            err: err
        };
    }
    return ctx;
};
