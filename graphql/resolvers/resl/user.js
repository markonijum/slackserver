import bcrypt from 'bcrypt';
import _ from 'lodash';

const formatError = (e, models) => {
    if(e instanceof models.sequelize.ValidationError ){
        return e.errors.map(x => {
           return  _.pick(x, ["path", "message", "validatorName"])
        })
    }
    return [{path:"name", message: "Someting went wrong!", validatorName:"something"}]
}

export default {
    Query: {
        users: async (parent, args, { models }) => {
            try {
                const users = await models.User.findAll({});
                return users;
            }catch(err) {
                console.log(err);
            }
        },
        user: async (parent, { id }, { models }) => {
            try {
                const user = await models.User.findOne({
                    where: {
                        id
                    }
                });
                return user;
            }catch(err){
                console.log(err);
            }
        }
    },
    Mutation: {
        registerUser: async (parent, { username, email, password }, { models }) => {
            try {
                if(password.length < 5 || password.length > 35 ){
                    return {
                        ok: false,
                        error:[{path:"password", message: "Password must be between 5 and 35 characters",
                    validatorName: "len"}]
                    }
                }
                const hashedPassword = await bcrypt.hash(password, 12)
                const user = await models.User.create({username, email, password: hashedPassword});
                return {
                    ok: true,
                    user
                };
            }catch(err){
                console.log(err)
                return {
                    ok: false,
                    error: formatError(err,models)
                }
            }
        }
    }
    
}