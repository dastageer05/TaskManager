const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Complete', "Incomplete"],
        default: "Incomplete"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:'user',
    },
    typeoftask: {
        type: String,
        enum: ['normaltask', 'dailytask', 'weeklytask', 'monthlytask'],
        default: 'normaltask',
    },
    duedate: {
        type: Date,
        default: null,
    },
}, {timestamps: true});


const Task = model('task', taskSchema);

module.exports = Task;