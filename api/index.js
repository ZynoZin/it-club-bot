const axios = require('axios');

const api = axios.create({
	baseURL: 'https://codeforces.com/api/'
})


module.exports = {
    async getUserInfo(handle, interaction) {
        const result = await api.get(`/user.info?handles=${handle}`)
                .then(response => response)
                .catch(err => {
                    interaction.editReply('handle is not valid or semicolon ";" was not used between handles! Try again')
                    console.log(err);
                    return null
                })
        return result
       
     }
}