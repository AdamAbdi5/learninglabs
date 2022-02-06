let accessToken = ""

const setAccessToken = (token) =>{
    accessToken = token
}

const getAccessToken= () =>{
    return accessToken
}

module.exports = {setAccessToken, getAccessToken}