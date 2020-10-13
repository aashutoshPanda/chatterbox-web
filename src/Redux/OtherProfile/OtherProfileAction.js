export const setOtherProfile = (otherProfile) => {
  return {
    type: "OTHER_PROFILE",
    payload: otherProfile,
  };
};
export const resetOtherUser = () => {
  return {
    type: "RESET_OTHER_PROFILE",
  };
};
