function MoneyAlgorithm(task_event,totalMoney,add_money,idmoney){
          //config/MoneyAlgorithm.js
          //component/MoneyAlgorithm.js
          totalMoney =  parseFloat(totalMoney).toFixed(2)
          totalMoney =  parseFloat(totalMoney)
          add_money =  parseFloat(add_money).toFixed(2)
          add_money =  parseFloat(add_money)
          idmoney =  parseFloat(idmoney).toFixed(2)
          idmoney =  parseFloat(idmoney)
          if(task_event===1){
            var gbsm_s = totalMoney + parseInt(totalMoney*0.01) + 9 + add_money+ idmoney
            var gbsm_b = totalMoney + (parseInt(totalMoney*0.01)*0.5) + 5 + add_money*0.5 + idmoney*0.5
          }else if(task_event===2){
            var gbsm_s = totalMoney + add_money + 3
            var gbsm_b = totalMoney
          }
          return [gbsm_s,gbsm_b]
        }

module.exports = MoneyAlgorithm