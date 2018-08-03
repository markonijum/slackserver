export default {
    Mutation: {
        createMessage: async (parent, args, { models, user }) => {
            try {
                const message = await models.Message.create({...args,user_id: user.id});
                return true;
            }catch(err){
                console.log(err);
                return false;
            }
        }
    }
}