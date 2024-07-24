let users = [];

export async function findByUserName(userName) {
  return users.find((user) => user.userName === userName);
}

export async function findById(id) {
  return users.find((user) => userId === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
