const GroupSchema = require('../model/GroupSchema')
const UserSchema = require('../model/UserSchema')

async function TopGroup() {
    try {
        const topGroups = await GroupSchema.aggregate([
            {
                $lookup: {
                    from: 'message',
                    localField: '_id',
                    foreignField: 'groupId',
                    as: 'message'
                }
            },
            {
                $unwind: '$message'
            },
            {
                $sort:{'message.msgCount':-1}
            },
            {
                $limit: 5
            },
            {
                $project:{
                    _id:0,
                    name: '$name'
                }
            }
        ]).exec();
        return topGroups;
    } catch (err) {
        console.log("Top Active Group Error: ", err)
        return err
    }
}

async function TopRegion() {
    try {
        const topRegion = await GroupSchema.aggregate([
            {
                $lookup: {
                    from: 'message',
                    localField: '_id',
                    foreignField: 'groupId',
                    as: 'message'
                }
            },
            {
                $unwind: '$message'
            },
            {
                $sort: { 'message.msgCount': -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    region: '$region'
                }
            },
        ]).exec()
        return topRegion
    } catch (err) {
        console.log('Top Active Region Error: ', err)
        return err
    }
}

async function TopUsers() {
    try {
        const topUser = await UserSchema.aggregate([
            {
                $sort: { posts: -1 }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 0,
                    name: '$name'
                }
            }
        ]).exec()
        return topUser
    } catch (err) {
        console.log('Top Active User Error: ', err.message)
        return err
    }
}

async function TopActives(req, res) {
    try {
        const region = await TopRegion();
        const groups = await TopGroup();
        const user = await TopUsers();
        res.status(200).json({ TopGroups: groups, TopRegions: region, TopUsers: user })
    } catch (err) {
        console.log('Top Error: ', err)
        res.status(401).json({ error: err.message })
    }
}

module.exports = { TopActives }