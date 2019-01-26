let obj = {
    "google": "yes",
    "facebook": {
        "face": "is book",
        "great": {
            "bla": 54,
            "sds": 55,
            "dfg": {
                "great": "good"
            }
        }
    }
};

function fac(obj) {
    let finalObj = {};
    for (let key in obj)
        if (typeof obj[key] !== 'object') {
            finalObj[key] = obj[key];
        } else if (typeof obj[key] === 'object') {
            finalObj = { ...finalObj, ...fac(obj[key]) }
        }
    return finalObj;
}

let res = fac(obj);
console.log(res);