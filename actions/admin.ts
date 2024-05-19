// import { NextApiRequest, NextApiResponse } from 'next';
// import { OpenAI } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAI(configuration);

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const user = req.body;

//     const prompt = `
//       Validate the user visa CV score on a scale of 1 to 10 based on the following information:
//       Name: ${user.name}
//       Phone Number: ${user.phone_number}
//       Email: ${user.email}
//       Visa to Country: ${user.visa_to_country}
//       Name Alias: ${user.name_alias}
//       Gender: ${user.gender}
//       DOB: ${user.dob}
//       POB: ${user.pob}
//       Marital Status: ${user.marital_status}
//       Husband/Wife POB: ${user.husband_wife_pob}
//       Has Kid: ${user.is_has_kid}
//       Country: ${user.country}
//       Nationality: ${user.nationality}
//       Other Nationality: ${user.other_nationality}
//       Address on Paper: ${user.address_on_paper}
//       Current Address: ${user.current_address}
//       ID Issue Date: ${user.id_issue_date}
//       ID Expire Date: ${user.id_expire_date}
//       ID Country Receive: ${user.id_country_receive}
//       ID City Receive: ${user.id_city_receive}
//       ID Lost Reason: ${user.id_lost_reason}
//       Current Job: ${user.current_job}
//       Current Job Address: ${user.current_job_address}
//       Current Job Start Date: ${user.current_job_start_date}
//       Current Company Phone Number: ${user.current_company_phone_number}
//       Current Job Title: ${user.current_job_title}
//       Current Job Salary: ${user.current_job_salary}
//       Current Job Detail: ${user.current_job_detail}
//       Old Job: ${user.old_job}
//       Old Job Title: ${user.old_job_title}
//       Old Job Start Date: ${user.old_job_start_date}
//       Old Job End Date: ${user.old_job_end_date}
//       Education Level: ${user.education_level}
//       School Name: ${user.school_name}
//       Major: ${user.major}
//       School Start Date: ${user.school_start_date}
//       School End Date: ${user.school_end_date}
//       Is Parent Live in Visiting Country: ${user.is_parent_live_in_visiting_country}
//       Stay Status: ${user.stay_status}
//       Is Relatives Living in Visiting Country: ${user.is_relatives_living_in_visiting_country}
//       Relatives Info Living in Visiting Country: ${user.relatives_info_living_in_visiting_country}
//       Relationship with Relatives: ${user.relationship_with_relatives}
//       Relatives Stay Status: ${user.relatives_stay_status}
//       Expected Start Date: ${user.expected_start_date}
//       Accompanying Person: ${user.accompanying_person}
//       Traveled Countries: ${user.traveled_countries}
//       Foreign Languages: ${user.foreign_languages}
//       Trip Purpose: ${user.trip_purpose}
//       Trip Payroll Person: ${user.trip_payroll_person}
//       Visa Type Owned: ${user.visa_type_owned}
//       Is Lived in Visa Country: ${user.is_lived_in_visa_coutry}
//       Is Lived in Visa Country Date: ${user.is_lived_in_visa_coutry_date}
//       Is Lived in Visa Country Days Stay: ${user.is_lived_in_visa_coutry_days_stay}
//       Is Denied Visa: ${user.is_denied_visa}
//       Denied Visa Reason: ${user.denied_visa_reason}
//       Denied Visa Number of Time: ${user.denied_visa_number_of_time}
//       Is Had Visa Country Not Used: ${user.is_had_visa_country_not_used}
//       Visa Country Not Used: ${user.visa_country_not_used}
//       Guarantee Documents: ${user.guarantee_documents}
//       Social Network: ${user.social_network}
//       Is Belong to Some Tribe or Party: ${user.is_belong_to_some_tribe_or_party}
//       Party Join Date: ${user.party_join_date}
//       Is Work for Some Charity Organization: ${user.is_work_for_some_charity_organization}
//       Is Weapons Trained: ${user.is_weapons_trained}
//       Is Worked on Army: ${user.is_worked_on_army}
//       Is Has Some Sick: ${user.is_has_some_sick}
//       Is Had Been Arrested by Crime: ${user.is_had_been_arrested_by_crime}
//       Is Renounce Citizenship: ${user.is_renounce_citizenship}
//       Is Done Filling: ${user.is_done_filling}
//     `;

//     try {
//       const response = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 200,
//       });

//       const validationResult = response.data.choices[0].text?.trim();
//       res.status(200).json({ score: validationResult });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export default handler;
