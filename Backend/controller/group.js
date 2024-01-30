const GroupSchema = require('../model/GroupSchema')
const UserSchema = require('../model/UserSchema')
const GroupMembers = require('../model/GroupMembers')
const MessageSchema = require('../model/MessageSchema')

async function createGroup(req, res) {
    const newGroup = {
        name: req.body.name,
        description: req.body.description,
        adminId: req.body.id,
    }
    try {
        const data = await GroupSchema.create(newGroup)

        await GroupMembers.create({ groupId: data._id, userId: data.adminId })
        await req?.body?.member.map(ele => { GroupMembers.create({ groupId: data._id, userId: ele }) })
        const groupData = { _id: data._id, name: data.name }
        
        await MessageSchema.create({groupId: data._id   , msg: [], msgCount: 0})
        res.status(200).json({ message: "Group created successfully", group: groupData })
    } catch (err) {
        console.log("Group Creation Error: ", err);
        res.status(401).json({ message: 'Failed to create the group' })
    }
}

async function searchUser(req, res) {
    console.log(req.query.search)
    const pattern = new RegExp(req.query.search, 'i')
    const data = await UserSchema.find({ $and: [{ name: { $regex: pattern } }, { _id: { $ne: req.body.id } }] }, { _id: 1, name: 1, mail: 1 }).exec();
    if (!data || data.length < 1) {
        res.status(404).json({ message: 'User not found' })
        return;
    }
    console.log(data)
    res.status(200).json({ user: data })
}

async function addMembers(req, res) {

}


async function myGroups(req, res) {
    try {
        const data = await GroupMembers.find({ userId: req.body.id }, { _id: 1 }).populate({ path: 'groupId', select: 'name' }).exec();
        // console.log(data)
        if (!data) {
            res.status(404).json({ message: 'You are not a member of any group yet' })
            return
        }
        res.status(200).json({ groups: data })
    } catch (err) {
        console.log("My Group Error: ", err);
        res.status(401).json({ error: err.message })
    }
}


module.exports = { createGroup, searchUser, myGroups }