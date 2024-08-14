// Define the mapping of user roles to their corresponding integer values
export const roleMapping = {
  ADMIN: 1,
  LABASSISTANT: 2,
  PATIENT: 3,
};

// Function to get integer value from string role
export const getRoleValue = (role) => roleMapping[role] || null;
