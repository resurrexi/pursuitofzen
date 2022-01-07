import Layout from "../components/layout";
import ExperienceList from "../components/experience-list";

const workExperience = [
  {
    role: "Lead Engineer",
    company: "Sunlight Medical",
    location: "Jacksonville, FL USA",
    dates: "2019/07 - present",
    descriptionList: [
      "Designed and developed a home-grown ERP mobile-friendly application that was received well by stakeholders. It reduced administrative costs by 90%. Used ReactJS, Django, PostgreSQL, Neo4j, and deployed onto Linux server using Docker.",
      "Developed a data submission application that automatically filled and submitted forms on the FDA GUDID website. It completely eliminated the need for a human to submit data through the website. Used Python and Selenium.",
      "Designed and developed an image grading application to process and rate microscope images of pipette tips. Responsible for data collection, data labeling, data pre-processing, and building the machine learning algorithm. Used Python, scikit-image, scikit-learn, OpenCV, and LabelBox.",
      "Helped troubleshoot and resolve networking issues within the manufacturing facility by working with a telecom provider, with an average turnaround time of 1 hour.",
      "Manage and maintain server, in-house software, and IoT hardware.",
      "Provide solutions and decisions to leadership regarding IT security and hardware provisioning.",
    ],
  },
  {
    role: "Freelance Developer/Data Scientist",
    company: "Self-employed",
    location: "Remote",
    dates: "2019/04 - present",
    descriptionList: [
      "Developed an app for applying mosaic censorship to facial features in videos. It utilized multi-threading for applying frame-by-frame censorship, resulting in quicker processing times. Used Python, numpy, and OpenCV.",
      "Developed multiple Python-based ETL scripts for a banking entity. Script reduced execution time of ETL processes by 15-25%.",
      "Designed and developed a customer-facing website for a fertility company. Used PHP, Bootstrap, and OctoberCMS.",
      "Contributed to a Django project that has 400+ GitHub stars. Wrote documentation, identified bugs, and suggested fixes for bugs.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Ubisoft Massive",
    location: "Malmo, Sweden",
    dates: "2017/11 - 2019/03",
    descriptionList: [
      "Developed a forecasting app in R Shiny that provides acquisition, activity, and concurrency forecasts for live producers. It reduced the time to generate forecasts from 40 hours to 1 minute. Responsible for entire app development. I talked about the app during the 2018 Nordic Data Science & Machine Learning Summit.",
      "Designed and developed a recommendation engine for a live game. Worked closely with game developers to gather data and build a data pipeline for providing the recommendations.",
      "Optimized a report generation tool for a live game in Python that reduced generation time by 50%.",
      "Optimized and improved the monetization data pipeline for a live game, cutting ETL runtime by 98%.",
      "Hosted a teaching session with a colleague to inspire high school students to join the video game industry as a data scientist. The session was so well received that they requested to do it again the following year.",
      "Mentored other analysts by reviewing their code, providing learning materials for their self-development goals, and helping them with their projects.",
    ],
  },
  {
    role: "Data Analyst, Data Scientist",
    company: "Florida Blue",
    location: "Jacksonville, FL USA",
    dates: "2012/03 - 2017/09",
    descriptionList: [
      "Developed and deployed 3 models for identifying real-time events that contributed to rising cost and risk. Used Python and scikit-learn. Models helped nurses identify members who were within 1-3 months of becoming high risk.",
      "Developed a survey application that records audience answers from their mobile phones. It received recognition from leadership for its innovative concept of testing audience knowledge. Used Flask and Plivo API.",
      "Developed an online report platform in Flask that automatically generates reports and dashboards for stakeholders.",
      "Developed a database crawler in SAS that provided recommendations of tables and fields based on analysts’ queries. It reduced IT support tickets by 20%.",
      "Helped design and develop an A/B test for evaluating care programs. Used propensity score matching and written in SAS.",
      "Mentored and trained other analysts in Python data analysis.",
      "Acted as SAS programming coach for my team by providing efficient coding techniques, solutions to complex queries, and macro code for automation.",
    ],
  },
];

function Heading({ children }) {
  return (
    <h2 className="mb-4 text-lg text-primary-600 tracking-tight font-bold sm:text-xl dark:text-primary-500">
      {children}
    </h2>
  );
}

function TRow({ children, striped }) {
  return (
    <tr
      className={`${
        striped ? "bg-gray-50 dark:bg-gray-800" : "bg-transparent"
      }`}
    >
      {children}
    </tr>
  );
}

function LeadCell({ children }) {
  return (
    <td className="px-4 py-1 text-sm font-medium text-gray-900 sm:text-base dark:text-gray-100">
      {children}
    </td>
  );
}

function Cell({ children }) {
  return (
    <td className="px-4 py-1 text-sm text-gray-500 sm:text-base dark:text-gray-400">
      {children}
    </td>
  );
}

export default function Resume() {
  return (
    <Layout pageTitle="Liquan's resume">
      <main className="block w-full space-y-8">
        <section>
          <Heading>Skills</Heading>
          <table className="min-w-full">
            <tbody>
              <TRow>
                <LeadCell>Languages</LeadCell>
                <Cell>Python, JavaScript, HTML/CSS, SQL, CypherQL, PHP</Cell>
              </TRow>
              <TRow>
                <LeadCell>Technologies</LeadCell>
                <Cell>
                  Docker, Hadoop, Tableau, Django, Flask, FastAPI, React, AWS,
                  GCP
                </Cell>
              </TRow>
              <TRow>
                <LeadCell>Other</LeadCell>
                <Cell>
                  Relational & NoSQL databases, ML, Big data, API design, CI/CD
                </Cell>
              </TRow>
            </tbody>
          </table>
        </section>
        <section>
          <Heading>Work Experience</Heading>
          <div className="pl-4">
            <ExperienceList>
              {workExperience.map((job, idx) => (
                <ExperienceList.Item
                  key={idx}
                  primary={job.role}
                  secondary={job.company}
                  tertiary={job.location}
                  dates={job.dates}
                  descriptionList={job.descriptionList}
                />
              ))}
            </ExperienceList>
          </div>
        </section>
        <section>
          <Heading>Talks</Heading>
          <div className="pl-4">
            <ExperienceList>
              <ExperienceList.Item
                primary="Shiny, Prophet, and Video Game KPIs"
                secondary="Nordic DS & ML Summit"
                dates="2018/10"
              />
            </ExperienceList>
          </div>
        </section>
        <section>
          <Heading>Education & Training</Heading>
          <div className="pl-4">
            <ExperienceList>
              <ExperienceList.Item
                primary="React - The Complete Guide"
                secondary="Udemy"
                dates="2020/02"
              />
              <ExperienceList.Item
                primary="PyImageSearch Gurus"
                tertiary={
                  <a href="https://gurus.pyimagesearch.com/certificates/?id=15185346">
                    View certificate
                  </a>
                }
                dates="2018/06"
              />
              <ExperienceList.Item
                primary="Full Stack Web Development"
                tertiary={
                  <a href="https://www.coursera.org/account/accomplishments/specialization/ZQKJFGAZV64W">
                    View certificate
                  </a>
                }
                dates="2016/06"
              />
              <ExperienceList.Item
                primary="BS in Statistics"
                secondary="University of Florida"
                dates="2010/08"
              />
            </ExperienceList>
          </div>
        </section>
      </main>
    </Layout>
  );
}
