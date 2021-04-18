import axios from 'axios';


export function getSpotsFromMotc(city, skip) {
    const url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?$top=30&$skip=${skip}&$format=JSON`;
    console.log(`Making request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.data.Message)
            throw new Error(res.data.Message);
        const spots = res.data.map((data) => {
            return {
                name: data.Name,
                description: data.DescriptionDetail
            };
        });
        return spots;
    }).catch(function(err) {
        throw err;
    });
}