export const countUsers = (allUsers, value) => {
  const users = allUsers ? allUsers.map((item) => item.workPlace._id) : "";

  return users.filter((x) => x === value).length;
};

export const countObs = (tasks, value) => {
  const obs = tasks ? tasks.map((item) => item.place._id) : "";
  return obs.filter((x) => x === value).length;
};

export const countObsTypes = (tasks, value) => {
  const obs = tasks ? tasks.map((item) => item.observationtype._id) : "";
  return obs.filter((x) => x === value).length;
};

export const countTasks = (tasks, value) => {
  const obs = tasks ? tasks.map((item) => item.responsible._id) : "";
  return obs.filter((x) => x === value).length;
};
