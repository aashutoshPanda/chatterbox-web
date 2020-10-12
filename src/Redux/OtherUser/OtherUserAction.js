export const setOtherUser = (otherUser) => {
  return {
    type: "OTHER_USER",
    payload: otherUser,
  };
};
export const resetOtherUser = () => {
  return {
    type: "RESET_OTHER_USER",
  };
};
