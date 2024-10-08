const createCollege = ({
  collegeName,
  course,
  startDate,
  endDate,
  scoreType,
  score,
}) => {
  return [
    {
      columns: [
        {
          stack: [
            {
              text: collegeName,
              style: "leftTableHeading",
            },
            {
              text: course,
              style: "leftTableSub",
            },
          ],
          style: "leftTableSection",
        },
      ],
    },
    {
      columns: [
        {
          stack: [
            {
              text: `${startDate} - ${endDate}`,
              style: "rightTableHeading",
            },
            {
              text: score && `${scoreType}: ${score}`,
              style: "rightTableSub",
            },
          ],
          style: "rightTableSection",
        },
      ],
    },
  ];
};
const createDescription = (description) => {
  console.log(description);
  return description.split("\n").map((point) => {
    if (point.trim().length > 0)
      return {
        text: point,
        style: "listStyle",
      };
  });
};
const createJob = ({
  companyName,
  position,
  startDate,
  endDate,
  description,
}) => {
  return [
    [
      {
        columns: [
          {
            stack: [
              {
                text: position,
                style: "leftTableHeading",
              },
              {
                text: companyName,
                style: "leftTableSub",
              },
            ],
            style: "leftTableSection",
          },
        ],
      },

      {
        columns: [
          {
            stack: [
              {
                text: `${startDate} - ${endDate}`,
                style: "rightTableHeading",
              },
            ],
            style: "rightTableSection",
          },
        ],
      },
    ],
    [
      {
        columns: [
          {
            stack: [
              {
                ul: createDescription(description),
              },
            ],
            style: "",
          },
        ],
        colSpan: 2,
      },
      {},
    ],
  ];
};
const createProject = ({
  projectName,
  techUsed,
  startDate,
  endDate,
  description,
  githubLink,
  liveLink,
}) => {
  return [
    [
      {
        columns: [
          {
            stack: [
              {
                text: [
                  projectName,
                  " | ",
                  {
                    text: techUsed,
                    style: "techUsed",
                  },
                ],
                style: "leftTableHeading",
              },
            ],
            style: "leftTableSection",
          },
        ],
      },

      {
        columns: [
          {
            stack: [
              {
                text: startDate && `${startDate} - ${endDate}`,
                style: "rightTableHeading",
              },
            ],
            style: "rightTableSection",
          },
        ],
      },
    ],
    [
      {
        columns: [
          {
            stack: [
              {
                ul: createDescription(description),
              },
              {
                text: [
                  {
                    text: githubLink && "Github",
                    link: githubLink,
                    color: "blue",
                  },
                  { text: "     " },
                  {
                    text: liveLink && "Live link",
                    link: liveLink,
                    color: "blue",
                  },
                ],
                style: "projectLinks",
              },
            ],
            style: "",
          },
        ],
        colSpan: 2,
      },
      {},
    ],
  ];
};
const createSkill = ({ type, desc }) => {
  return {
    text: [
      { text: `${type}: `, style: "skillTitle" },
      {
        text: desc,
        style: "skillList",
      },
    ],
    style: "skill",
  };
};
const getDocDefinition = (
  personalDetails,
  education,
  experience,
  projects,
  skills,
  achievements,
  fontType,
) => {
  const educationArr = education.map((college) => {
    return createCollege(college);
  });
  const jobArr = [];
  for (let job of experience) {
    const temp = createJob(job);
    jobArr.push(...temp);
  }
  const projectArr = [];
  for (let project of projects) {
    const temp = createProject(project);
    projectArr.push(...temp);
  }
  const skillArr = skills.map((skill) => {
    return createSkill(skill);
  });
  const docDefinition = {
    pageSize: "A4",
    pageMargins: [43.2, 43.2, 43.2, 43.2],
    defaultStyle: {
      font: fontType ? "Roboto" : "heuristica",
    },
    content: [
      { text: personalDetails.fullName || "", style: "fullName" },
      {
        text: [
          personalDetails.phoneNumber || "",
          " | ",
          personalDetails.email || "",
          personalDetails.linkedin ? " | " : "",
          personalDetails.linkedin
            ? {
                text: "Linkedin",
                link: `https://${personalDetails.linkedin}`,
                color: "blue",
              }
            : "",
          personalDetails.github ? " | " : "",
          personalDetails.github
            ? {
                text: "Github",
                link: `https://${personalDetails.github}`,
                color: "blue",
              }
            : "",
          personalDetails.portfolio ? " | " : "",
          personalDetails.portfolio
            ? {
                text: personalDetails.portfolio,
                link: `https://${personalDetails.portfolio}`,
                color: "blue",
              }
            : "",
        ],
        style: "personalDetails",
      },
      education.length > 0
        ? {
            text: "Education",
            style: "sectionHeading",
          }
        : null,
      education.length > 0
        ? {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 508.6,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          }
        : null,
      // education
      education.length > 0
        ? {
            layout: "noBorders",
            table: {
              widths: ["70%", "*"],

              body: educationArr,
              style: "table",
            },
            style: "sectionBody",
          }
        : null,
      experience.length > 0
        ? {
            text: "Experience",
            style: "sectionHeading",
          }
        : null,
      experience.length > 0
        ? {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 508.6,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          }
        : null,
      // Work
      experience.length > 0
        ? {
            layout: "noBorders",
            table: {
              widths: ["70%", "*"],

              body: jobArr,
              style: "table",
            },
            style: "sectionBody",
          }
        : null,
      projects.length > 0
        ? {
            text: "Projects",
            style: "sectionHeading",
          }
        : null,
      projects.length > 0
        ? {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 508.6,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          }
        : null,
      // projects
      projects.length > 0
        ? {
            layout: "noBorders",
            table: {
              widths: ["70%", "*"],

              body: projectArr,
              style: "table",
            },
            style: "sectionBody",
          }
        : null,
      // skills
      skills.length > 0 ? { text: "Skills", style: "sectionHeading" } : null,
      skills.length > 0
        ? {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 508.6,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          }
        : null,
      skills.length > 0 ? { text: "", style: "spacer" } : null,

      skills.length > 0
        ? {
            stack: skillArr,
          }
        : null,
      achievements ? { text: "Achievements", style: "sectionHeading" } : null,
      achievements
        ? {
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 508.6,
                y2: 0,
                lineWidth: 0.5,
              },
            ],
          }
        : null,
      achievements ? { text: "", style: "spacer" } : null,
      achievements
        ? {
            ul: createDescription(achievements),
          }
        : null,
    ],
    styles: {
      fullName: {
        fontSize: 22,
        bold: true,
        alignment: "center",
        margin: 0,
      },
      personalDetails: {
        fontSize: 11,
        alignment: "center",
        margin: [0, 5],
      },
      sectionHeading: {
        fontSize: 14,
        bold: true,
        margin: [0, 8, 0, 0],
      },
      sectionBody: {
        margin: [0, 0],
      },
      leftTableSection: {
        margin: [0, 5, 0, 0],
      },
      rightTableSection: {
        fontSize: 11,
        alignment: "right",
        margin: [0, 5, 0, 0],
      },
      leftTableHeading: {
        fontSize: 11,
        bold: true,
        lineHeight: 1.1,
      },
      rightTableHeading: {
        lineHeight: 1.1,
      },
      leftTableSub: {
        italics: true,
      },
      listStyle: {
        margin: [10, 0, 0, 0],
        fontSize: 11,
      },
      techUsed: {
        fontSize: 10,
        bold: false,
        italics: true,
      },
      spacer: {
        margin: [0, 5, 0, 0],
      },
      skill: {
        lineHeight: 1.1,
        fontSize: 11,
      },
      skillTitle: {
        bold: true,
        fontSize: 11,
      },
      projectLinks: {
        margin: [10, 4, 0, 0],
        fontSize: 10,
      },
    },
  };
  return docDefinition;
};
export default getDocDefinition;
