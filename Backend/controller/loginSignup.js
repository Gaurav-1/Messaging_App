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
    if (data) {
        if (data.password === req.body.password) {
            res.status(200).json({ id: data.name, url: '/dashboard', message: null })
        }
        else {
            res.status(301).json({ message: 'Invalid Mail/Password', url: null })
        }
    }
    else {
        res.status(404).json({ message: 'User Not Exists', url: null })
    }
}

async function signupUser(req, res) {
    const data = await UserSchema.findOne({ mail: req.body.mail });
    console.log(data);
    if (data) {
        res.json({ message: 'User already exist', url: null })
        return;
    }

    const newuser = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password,
        region: 'INDIA',
        groupsJoined: [],
    }
    UserSchema.create(newuser)
        .then((ress) => {
            try {
                sendMail(newuser.mail);
                res.status(200).json({ url: '/dashboard', message: 'A verification link has been send sucessfully' });
            } catch (err) {
                console.log("Mail Error: ",err);
                res.status(301).send("An error occured Mail can't be send")
            }
        }).catch(err => {
            res.json({ message: 'Signup Failed', url: null })
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
        html: `Hello ${data.name},\n ${msg} ----  http://localhost:3000/user/verify/${data._id} \n Thanks for joining us.`, // html body
    }
    transporter.sendMail(mail_content, (err) => {
        if (err)
            throw new Error(err);
        console.log('Mail send successfully');
    });
}

async function verifyMail(req, res) {
    await UserSchema.findByIdAndUpdate({ _id: req.params.id }, { isVerified: true }, { new: true }).then(async () => {
        const data = await UserSchema.findOne({ _id: req.params.id }).exec();

        res.redirect('/dashboard');
    }).catch(() => {
        res.status(301).json({ message: 'Verification failed' });
    })
}


module.exports = { loginUser, signupUser, verifyMail }