const STATUS_PENDING = { id: 1, name: "Pending", color: "blue.300" };
const STATUS_IN_PROGRESS = { id: 2, name: "In-Progress", color: "yellow.400" };
const STATUS_DONE = { id: 3, name: "Done", color: "pink.300" };
export const STATUSES = [STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_DONE];

const MODULE_1 = { id: 1, name: "Module 1" };
const MODULE_2 = { id: 2, name: "Module 2" };
const MODULE_3 = { id: 3, name: "Module 3" };
const MODULE_4 = { id: 4, name: "Module 4" };
export const MODULES = [MODULE_1, MODULE_2, MODULE_3, MODULE_4];

const PERSON_1 = { id: 1, name: "Marcus Pogi", color: "blue.300"  };
const PERSON_2 = { id: 2, name: "Pretty Dani", color: "pink.300"  };
export const PEOPLE = [PERSON_1, PERSON_2];

const PROJECT_1 = { id: 1, name: "Project 1" };
const PROJECT_2 = { id: 2, name: "Project 2" };
export const PROJECTS = [PROJECT_1, PROJECT_2];

const DATA = [
    {
        project: PROJECT_1,
        module: MODULE_2,
        task: "Create sidebar",
        status: STATUS_PENDING,
        due: new Date("2024/7/4"),
        notes: "In progress",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Create Topbar",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "NA",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Make Tasktable",
        status: STATUS_DONE,
        due: null,
        notes: "",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Tasktable Validation",
        status: null,
        due: new Date("2023/02/15"),
        notes: "Remove old data",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Learn Power BI",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Connect Dani's work to mine",
        status: null,
        due: new Date("2024/09/12"),
        notes: "Use Github",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_1,
        module: MODULE_1,
        task: "Sample id 1",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Upgrade React & Chakra UI",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 1 (1)",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Optimize slow queries.",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 1 (2)",
        status: STATUS_PENDING,
        due: new Date("2023/11/08"),
        notes: "OAuth2 and JWT auth.",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2",
        status: null,
        due: new Date("2023/09/30"),
        notes: "Create UI mockups.",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (1)",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Resolve browser issues.",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (2)",
        status: null,
        due: new Date("2023/10/22"),
        notes: "Security audit.",
        incharge: PERSON_2,
      },
      
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (3)",
        status: STATUS_PENDING,
        due: new Date("2023/11/15"),
        notes: "User onboarding guide.",
        incharge: PERSON_2,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (4)",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Improve performance.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (5)",
        status: null,
        due: new Date("2023/10/05"),
        notes: "Code review meeting.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 2 (6)",
        status: STATUS_PENDING,
        due: new Date("2023/11/01"),
        notes: "Set up CI/CD pipelines.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3",
        status: STATUS_DONE,
        due: null,
        notes: "Cloud migration.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3 (1)",
        status: null,
        due: new Date("2023/09/25"),
        notes: "User feedback survey.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3 (2)",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Revise documentation.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3 (3)",
        status: null,
        due: new Date("2023/10/10"),
        notes: "Fix bugs and QA.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3 (4)",
        status: STATUS_IN_PROGRESS,
        due: null,
        notes: "Add mobile support.",
        incharge: PERSON_1,
      },
      {
        project: PROJECT_2,
        module: MODULE_1,
        task: "Sample id 3 (5)",
        status: null,
        due: new Date("2023/09/18"),
        notes: "Enhance permissions.",
        incharge: PERSON_1,
      },
];

export default DATA;
