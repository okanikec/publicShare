const request = require('request')


const date1 = (date, code, callback) => {
    

    const url = 'https://www.quandl.com/api/v3/datatables/SCF/PRICES?date=' + encodeURIComponent(date) + '&quandl_code='+ encodeURIComponent(code) +'&api_key=EF4Sq_oX-KkpWoVmctNt'

    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to url', undefined)
        }else if (body.error){
            callback('unable to find data', undefined)
        }else {
            callback(undefined,  body.datatable.data[0][11] )
              
        }

    })
}

module.exports = date1