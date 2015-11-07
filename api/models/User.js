/**
 * User
 * @description :: Model for storing users
 */

module.exports = {
    schema: true,

    attributes: {
        username: {
            type: 'string',
            required: true,
            unique: true,
            alphanumericdashed: true
        },

        password: {
            type: 'string'
        },

        email: {
            type: 'string',
            email: {},
 
            required: true,
            unique: true
        },

        role: {
            type: 'string',
            defaultsTo: 'user'
        },

        job: {
            type: 'string',
            defaultsTo: ''
        },
        level: {
            type: 'string',
            defaultsTo: ''
        },
        department_id: {
            type: 'integer',
            defaultsTo: ''
        },
        parent_user_id: {
            type: 'integer',
            defaultsTo: ''
        },

        photo: {
            type: 'string',
            defaultsTo: '',
            url: true
        },

        socialProfiles: {
            type: 'object',
            defaultsTo: {}
        },

        toJSON: function () {
            var obj = this.toObject();

            delete obj.password;
            delete obj.socialProfiles;

            return obj;
        }
    },

    beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },

    beforeCreate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    }
};
