function Validator (options) {
    //ham thực hiện validate
    
        function getParent(elment ,selector){
            while(elment.parentElement){
                if(elment.parentElement.matches(selector)){
                    return elment.parentElement
                }
                elment = elment.parentElement
            }
        }
    
    
    
        let selectorRules = {}
        function Validate (inputElm, rule) {
            let errorMessage
            let errorElm = getParent(inputElm,options.formGroupSelector).querySelector(options.errorSlector)        
            let rules = selectorRules[rule.selector]
           
          for(let i = 0;i<rules.length;++i){
            switch(inputElm.type){
                case 'checkbox':
                case 'checkbox':
                    errorMessage =  rules[i](
                        formElm.querySelector(rule.selector + ':checked')
                    )
                break
                default:
                    errorMessage =  rules[i](inputElm.value)
            }
          if(errorMessage) break;
          }
    
            if(errorMessage){
                errorElm.innerText = errorMessage
                getParent(inputElm,options.formGroupSelector).classList.add('invalid')
            }
            else{
                errorElm.innerText = '';
                 getParent(inputElm,options.formGroupSelector).classList.remove('invalid')
            }
            return !errorMessage
                
        }
    
        //lấy elm của form 
        let formElm = document.querySelector(options.form)
        if(formElm) {
            formElm.onsubmit = function(e) {
                e.preventDefault()
                let isFormValid = true
                options.rules.forEach(function (rule) {
                    let inputElm = formElm.querySelector(rule.selector)
                  let isValid =  Validate(inputElm,rule)
                  if(!isValid){
                    isFormValid = false
                  }
                })
                if(isFormValid){
                    if(typeof options.onSubmit === 'function'){
                        let enablInput = formElm.querySelectorAll('[name]')
                        let formValue = Array.from(enablInput).reduce(function(values,input){
                             values[input.name] = input.value
                             return values
                        },{})
                        options.onSubmit(formValue)
                        
                    }
                    else{
                        formElm.submit()
                    }
                }
            }
    
            //lập qua mỗi rule và xử lý (lắng nghe,...)
            options.rules.forEach (function (rule) {
                //lưu lại các rules cho mỗi input
                if(Array.isArray(selectorRules[rule.selector])){
                    selectorRules[rule.selector].push(rule.test);
                }else {
                    selectorRules[rule.selector] = [rule.test]
                }
    
                let inputElm = formElm.querySelector(rule.selector)
                //xử lý trường hợp blur khỏi input
                if(inputElm) {
                   inputElm.onblur = function () {
                    Validate(inputElm, rule);
                   }
                   //xử lý khi người dùng nhập input
                   inputElm.oninput = function () {
                    let errorElm = getParent(inputElm,options.formGroupSelector).querySelector(options.errorSlector)
                    errorElm.innerText = '';
                    getParent(inputElm,options.formGroupSelector).classList.remove('invalid')
                   }
                }
            })
        }
    
    
    }
    
    //dinh nghia cac rules
    
    Validator.isRequired = function (selector,message) {
     return {
        selector: selector,
        test: function (value) {
            return value ? undefined :message || 'Vui lòng nhập dữ liệu vào '
        }
     }
    }
    
    
    Validator.isEmail = function (selector,message) {
        return {
           selector: selector,
           test: function (value) {
              let regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              return regex.test(value)? undefined :message || 'Vui lòng nhập email vào';
           }
        }
       }
    
       Validator.isPass = function (selector,min,message) {
        return {
           selector: selector,
           test: function (value) {
               return value.length >= min ? undefined :message || `Vui lòng nhập tối thiểu ${min} kí tự  `
           }
        }
       }
       Validator.isPassConfirmation = function (selector,getConfirmValue,message) {
        return {
           selector: selector,
           test: function (value) {
               return value === getConfirmValue() ? undefined :message ||`Giá trị nhập vào không chính xác`
           }
        }
       }