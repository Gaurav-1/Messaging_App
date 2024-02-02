const UserSchema = require('../model/UserSchema')
const nodemailer = require("nodemailer");
const { generateToken } = require('../utils/TokenHandler')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kohligaurav845@gmail.com",
        pass: "rcrg amgd kjwk fifw"
    },
});

async function loginUser(req, res) {
    const data = await UserSchema.findOne({ mail: req.body.mail }).exec();
    // console.log(data);
    if (data) {
        if (!data.isVerified) {
            res.status(200).json({ message: "Please verify your account first" })
            return
        }
        if (data.password === req.body.password) {
            const obj = {
                id: data._id,
                name: data.name,
                region: data.region,
            }
            const token = generateToken(obj);
            res.status(200).json({ currentUser: data.name, token: token, message: null })
        }
        else {
            res.status(301).json({ message: 'Invalid Mail/Password' })
        }
    }
    else {
        res.status(404).json({ message: 'User Not Exists' })
    }
}

async function jwtLogin(req, res) {
    const data = await UserSchema.findOne({ _id: req.body.id }).exec();
    // console.log(data);
    if (data) {
        if (!data.isVerified) {
            res.status(200).json({ message: "Please verify your account first" })
            return
        }
        const obj = {
            id: data._id,
            name: data.name
        }
        const token = generateToken(obj);
        res.status(200).json({ currentUser: data.name, token: token })
    }
    else {
        res.status(404).json({ message: 'User Not Exists' })
    }
}

async function signupUser(req, res) {
    const data = await UserSchema.findOne({ $or: [{ mail: req.body.mail }, { name: req.body.name }] }, { _id: 0, mail: 1, name: 1 });
    // console.log(data);
    if (data) {
        let msg = ''
        if (data.mail == req.body.mail) { msg += 'Mail |' }
        if (data.name == req.body.name) {
            msg += ' Name'
        }
        res.json({ message: `User ${msg} already exists` })
        return;
    }

    const newuser = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        region: req.body.region,
    }
    UserSchema.create(newuser)
        .then((ress) => {
            try {
                sendMail(newuser.mail);
                res.status(200).json({ message: 'A verification link has been mailed' });
            } catch (err) {
                console.log("Mail Error: ", err);
                res.status(301).send("An error occured verification Mail can't be send")
            }
        }).catch(err => {
            console.log("Signup Error: ", err)
            res.json({ message: 'Signup Failed' })
            return;
        })
}

async function sendMail(mail) {
    const data = await UserSchema.findOne({ mail: mail }).exec();
    const msg = `<p> Please verify your mail</p>`;

    const mail_content = {
        from: 'kohligaurav845@gmail.com', // sender address
        to: mail, // list of receivers
        subject: "Verification mail", // Subject line
        text: "Verify your mail", // plain text body
        html: `Hello ${data.name},\n ${msg} ---- <a href='http://localhost:3000/verify/${data._id}'>Verify Now</a> \n Thanks for joining us.`, // html body
    }
    try {
        transporter.sendMail(mail_content, (err) => {
            if (err) {
                console.log("SendMail Error: ", err);
                throw new Error(err);
            }
            console.log('Mail send successfully');
        });
    } catch (err) {
        console.log("Mail Sending Error: ",err)
    }
}

async function verifyMail(req, res) {
    await UserSchema.findByIdAndUpdate({ _id: req.params.id }, { isVerified: true }, { new: true })
    .then(async () => {
        const data = await UserSchema.findOne({ _id: req.params.id }).exec();
        res.status(200).json({message: 'Verification Cmpleted'});
    }).catch(() => {
        res.status(301).json({ message: 'Verification failed' });
    })
}


module.exports = { loginUser, signupUser, verifyMail, jwtLogin }