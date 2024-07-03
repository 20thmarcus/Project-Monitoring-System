const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "blue.300" };
const STATUS_IN_PROGRESS = { id: 2, name: "In Progress", color: "yellow.400" };
const STATUS_TESTING = { id: 3, name: "Testing", color: "pink.300" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "green.300" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const MODULE_1 = { id: 1, name: "Module 1" };
const MODULE_2 = { id: 2, name: "Module 2" };
const MODULE_3 = { id: 3, name: "Module 3" };
const MODULE_4 = { id: 4, name: "Module 4" };
export const MODULES = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
];

const PERSON_1 = { id: 1, name: "Marcus Pogi" };
const PERSON_2 = { id: 2, name: "Pretty Dani" };
export const PEOPLE = [
  PERSON_1,
  PERSON_2,
];

const DATA = [
  {
    module: MODULE_1,
    task: "Add a New Feature",
    status: STATUS_ON_DECK,
    due: new Date("2023/10/15"),
    notes: "This is a note",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Write Integration Tests",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Use Jest",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Add Instagram Integration",
    status: STATUS_DEPLOYED,
    due: null,
    notes: "",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Cleanup Database",
    status: null,
    due: new Date("2023/02/15"),
    notes: "Remove old data",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Refactor API Endpoints",
    status: STATUS_TESTING,
    due: null,
    notes: "",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Add Documentation to API",
    status: null,
    due: new Date("2023/09/12"),
    notes: "Add JS Docs to all endpoints",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Update NPM Packages",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Optimize Database Queries",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Optimize slow queries.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Implement User Authentication",
    status: STATUS_ON_DECK,
    due: new Date("2023/11/08"),
    notes: "OAuth2 and JWT auth.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Design User Interface Mockups",
    status: null,
    due: new Date("2023/09/30"),
    notes: "Create UI mockups.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Fix Cross-Browser Compatibility Issues",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Resolve browser issues.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Perform Security Audit",
    status: null,
    due: new Date("2023/10/22"),
    notes: "Security audit.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Create User Onboarding Tutorial",
    status: STATUS_ON_DECK,
    due: new Date("2023/11/15"),
    notes: "User onboarding guide.",
    incharge: PERSON_2
  },
  {
    module: MODULE_1,
    task: "Optimize Frontend Performance",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Improve performance.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Conduct Code Review",
    status: null,
    due: new Date("2023/10/05"),
    notes: "Code review meeting.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Implement Continuous Integration",
    status: STATUS_ON_DECK,
    due: new Date("2023/11/01"),
    notes: "Set up CI/CD pipelines.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Migrate to Cloud Hosting",
    status: STATUS_DEPLOYED,
    due: null,
    notes: "Cloud migration.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Create User Feedback Survey",
    status: null,
    due: new Date("2023/09/25"),
    notes: "User feedback survey.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Update User Documentation",
    status: STATUS_TESTING,
    due: null,
    notes: "Revise documentation.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Bug Fixing and QA Testing",
    status: null,
    due: new Date("2023/10/10"),
    notes: "Fix bugs and QA.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Implement Mobile App Support",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Add mobile support.",
    incharge: PERSON_1
  },
  {
    module: MODULE_1,
    task: "Refine User Permission System",
    status: null,
    due: new Date("2023/09/18"),
    notes: "Enhance permissions.",
    incharge: PERSON_1
  },
];

export default DATA;
