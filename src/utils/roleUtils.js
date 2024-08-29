// src/utils/roleUtils.js

export const capitalizeRole = (role) => {
  if (!role) return '';
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
};

export const lowercaseRole = (role) => {
  if (!role) return '';
  return role.toLowerCase();
};
