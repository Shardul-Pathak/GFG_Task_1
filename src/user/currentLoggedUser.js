let currentUser = null;
function setUser(user) {
    currentUser = user;
}

function getUser() {
  return currentUser;
}

export { setUser, getUser };