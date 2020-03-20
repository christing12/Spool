import { colors } from '@atlaskit/theme';
// File where all the data for the app is stored with helper functions to help access and organize the data


const categories = ["Not Started", "In Progress", "Completed"];

const tasks = [
  {
    id: '1',
    taskName: 'Getting Started',
    content: "The first task in a line of very many tasks. This is the most important task, you must be sure to complete it!",
    category: "Completed",
    assignees: ["Christopher Ting"],
    tags: ["react"],
    colors: {
      soft: colors.G50,
      hard: colors.N400A,
    },
  },
  {
    id: '2',
    taskName: 'Get Started With Unity',
    content: "Download the Unity Editor and proceed to mess around",
    category: "Completed",
    assignees: ["Christopher Ting"],
    tags: ["unity"],
    colors: {
      soft: colors.P50,
      hard: colors.N400A,
    },
  },
  {
    id: '3',
    taskName: 'Unreal + Maya',
    content: "Setup Unreal Engine + Maya pipeline!",
    category: "Not Started",
    assignees: ["Christopher Ting", "Bob the Builder"],
    tags: ["unreal engine", "autodesk maya"],
    colors: {
      soft: colors.B50,
      hard: colors.N400A,
    },
  },
  {
    id: '4',
    taskName: 'Eat Milk & Cookies',
    content: "This task is a forever kind of task. You can never eat too many cookies with milk!",
    category: "In Progress",
    assignees: ["Christopher Ting", "Olaf the Snowman"],
    tags: ["cookies", "milk"],
    colors: {
      soft: colors.Y50,
      hard: colors.N400A,
    },
  }
];

const tags = [
  {
    name: "unreal engine",
    softColor: colors.G50,
    hardColor: colors.N400A
  },
  {
    name: "unity",
    softColor: colors.P50,
    hardColor: colors.N400A,
  },
  {
    name: "autdoesk maya",
    softColor: colors.B50,
    hardColor: colors.N400A
  },
  {
    name: "blender",
    softColor: colors.Y50,
    hardColor: colors.N400A,
  }
]

const getByCategory = (category, items) =>
        items.filter((tasks) => tasks.category === category);

export const taskMap = categories.reduce(
  (previous, category) => ({
    ...previous,
    [category]: getByCategory(category, tasks),
  }),
  {},
);
