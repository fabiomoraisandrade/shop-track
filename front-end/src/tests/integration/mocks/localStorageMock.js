const admUserInfo = require("./data/admUserInfo.json");
const userInfo = require("./data/userInfo.json");

export const admUserInfoMock = () => JSON.stringify(admUserInfo);
export const userInfoMock = () => JSON.stringify(userInfo);