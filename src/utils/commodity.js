const request = require('request')

const commodity = (quandl_code, callback) => {
   

    const url = 'https://www.quandl.com/api/v3/datatables/SCF/PRICES?date=2019-06-19&quandl_code='+ encodeURIComponent(quandl_code) +'&api_key=EF4Sq_oX-KkpWoVmctNt'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to website!', undefined)
        }else if (body.datatable.data === 0){
            callback('unable to find code. Try another search. ', undefined)

        }else {
            callback(undefined, {date: body.datatable.data[0][6], code: body.datatable.data[0][0]})
            
        }       
        
    })
}

module.exports = commodity