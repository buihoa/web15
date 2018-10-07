const axios = require('axios');

axios.get('https://btvn-web15s.herokuapp.com/api/web15', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
});

axios.get('https://btvn-web15s.herokuapp.com/api/web14', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
});

axios.get('https://btvn-web15s.herokuapp.com/api/web13', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
});

axios.get('https://btvn-web15s.herokuapp.com/api/web12', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
});

axios.get('https://btvn-web15s.herokuapp.com/api/web11', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
});

axios.get('https://btvn-web15s.herokuapp.com/api/web10', (req, res) => {
    res.sendFile('/web15', JSON.stringify(res))
})