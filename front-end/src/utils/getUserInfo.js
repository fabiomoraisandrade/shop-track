const getUserInfo = (key) => {
    const userString = localStorage.getItem("user");
    if (!userString) return null;

    const userInfo = JSON.parse(userString);
    console.log("userInfo:", userInfo);

    if (!key) return userInfo;
    return userInfo[key];
}


export default getUserInfo;