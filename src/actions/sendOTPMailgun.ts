// // utils/sendOtpEmail.ts
// import formData from 'form-data';
// import Mailgun from 'mailgun.js';

// const mailgun = new Mailgun(formData);

// const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
// const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

// if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
//   throw new Error("Mailgun credentials are missing in the environment variables.");
// }

// const mg = mailgun.client({
//   username: 'api',
//   key: MAILGUN_API_KEY,
// });

// export const sendOtpEmailMailgun = async (email: string, otp: string) => {
//   if (!email || typeof email !== "string" || email.length > 100) {
//     return { error: "Invalid email address" };
//   }

//   try {
//     const data = {
//       from: `The Skeptic Dev <mailgun@${MAILGUN_DOMAIN}>`,
//     //   from:'dev.salman1508@gmail.com',
//     //   from:MAILGUN_DOMAIN,
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP Code is ${otp}. It expires in 5 minutes.`,
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
//           <h1 style="text-align: center;">Your OTP Code</h1>
//           <p style="text-align: center; font-size: 1.5rem;"><strong>${otp}</strong></p>
//           <p style="text-align: center;">This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
//         </div>
//       `,
//     };

//     const response = await mg.messages.create(MAILGUN_DOMAIN, data);
//     return { data: response };
//   } catch (error: any) {
//     console.error(error)
//     return { error: error.message || "Failed to send OTP email." };
//   }
// };
