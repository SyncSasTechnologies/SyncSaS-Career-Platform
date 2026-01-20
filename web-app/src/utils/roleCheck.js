export const hasRole = (userRoles, role) => {
  return userRoles?.[role] === true
}
