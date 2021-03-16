const nodemailer = require('nodemailer');

require('dotenv').config();

const mapping = require('./mapping.json');
const mappingObject = mapping[0];

//console.log('Mapping object',mappingObject);

//Step1
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

//Step2
//For each item in the json object, take the first one as to field
//Take the second one as filename property of the attachments array object 
//call sendmail each time


async function sendEmails() {
	var i = 0;

	for (email in mappingObject) {
		//console.log(email, mappingObject[email]);
		fileName = mappingObject[email];

		let mailOptions = {
			from: 'amit1235813@gmail.com',
			to: email,
			subject: 'New Subject',
			text: 'It works!',
			attachments: [
				{
					filename: fileName,
					path: './'.concat(fileName)
				}
			]
		}

		i++;

		try {
			let emailSent = await transporter.sendMail(mailOptions);	
			console.log('Email sent', emailSent['accepted'], i);
		} catch (error) {
				console.log('Error occured', error);
		}

		if (i===450) {break;}

	}
}

sendEmails();