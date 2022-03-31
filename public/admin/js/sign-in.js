// function Validator(formSelector){   
//     var formRules = {};
//     var _this = this;
//     function getParent(element,selector){
//         while(element.parentElement){
//             if(element.parentElement.matches(selector)){
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }
//     //Define rules
//     var validatorRules = {
//         required : function(value){
//                 return value ? undefined : `Vui lòng nhập trường này`;                  
//         },

//         space : function(formInput){
//             return function(value){
//                 return value.includes(' ') ? `${formInput} chứa khoảng trắng` : undefined;
//             }     
//         },

//         min: function(min){
//             return function(value){
//                 return value.length>= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
//             }
//         }
//     }


//     var formElement = document.querySelector(formSelector);
//     if(formElement){
//         var inputs = formElement.querySelectorAll('[name],[rules]');
//         for(var input of inputs){
//             var rules = input.getAttribute('rules').split('|');
//             for(var rule of rules){
//                 var ruleInfor;
//                 var ruleHasValue = rule.includes(':');

//                 if(ruleHasValue){
//                     ruleInfor = rule.split(':');
//                     rule = ruleInfor[0];
//                 }
//                 var ruleFunction = validatorRules[rule];
//                 if(ruleHasValue){
//                     ruleFunction = ruleFunction(ruleInfor[1]);
//                 }
                
//                 if(Array.isArray(formRules[input.name])){
//                     formRules[input.name].push(ruleFunction)
//                 }else{
//                     formRules[input.name] = [ruleFunction]
//                 }
//             }
//             input.onblur = handleValidate;
//             input.oninput = handleClearError;
//         }
//     }

//     function handleValidate(event){
//         var rules = formRules[event.target.name];
//         for(var rule of rules) {
//             var errorMessage = rule(event.target.value);
//             if(errorMessage) break;
//         }

//         if(errorMessage) {
//             var formGroup = getParent(event.target,'.form-group');
//             if(formGroup){
//                 formGroup.classList.add('invalid');
//                 var formMessage = formGroup.querySelector('.form-message');
//                 if(formMessage){
//                     formMessage.innerText = errorMessage;
//                 }
//             }

//         }
//         return !errorMessage;
//     }

//     function handleClearError(event){
//         var formGroup = getParent(event.target,'.form-group');
//         if(formGroup.classList.contains('invalid')){
//             formGroup.classList.remove('invalid');
//             var formMessage = formGroup.querySelector('.form-message');
//             if(formMessage){
//                 formMessage.innerText = '';
//             }
//         }
//     }
//    formElement.onsubmit = function(event){
//        event.preventDefault();
//        var inputs = formElement.querySelectorAll('[name],[rules]');
//        var isValid = true;
//        for(var input of inputs){
//            if(!handleValidate({target : input})){
//                isValid = false;
//            }
//        }
//        if(isValid){
//         if(typeof _this.onSubmit ==='function'){
//             var enableInputs = formElement.querySelectorAll('[name]');
//             var formValues = Array.from(enableInputs).reduce(function (values,input,index) {
//                 switch(input.type){
//                     case 'checkbox':
//                         if(!input.matches(':checked')){
//                             values[input.name] = '';
//                             return values;
//                         }
//                         if(!Array.isArray(values[input.name])){
//                             values[input.name] =[];
//                         }
//                         values[input.name].push(input.value)
//                         break;
//                      default:
//                             values[input.name] = input.value;                                                                                      
//                 }
//                 return values;
//             },{});
//             dataForm = {
//                 username : formValues.username,
//                 password : formValues.password
//             }
//             postData(dataForm)
//             _this.onSubmit(formValues);
//         }
//     }
//    }
// }


// var dataForm;
// function postData(data){
//     var formElement = document.querySelector('#form-login');
//     var failLoginMessage = formElement.querySelector('.form-message');
//     var allFormGroup = formElement.querySelectorAll('.form-group');
//     var urlLogin = 'http://localhost:1337/api/login';
//     var options = {
//         method: 'POST', // or 'PUT'
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Parse-Application-Id':'myAppId',
//           'X-Parse-REST-API-Key':'myRestApiKey',
//           'X-Parse-Revocable-Session':'1'
      
//         },
//         body: JSON.stringify(data),
//     };
//     fetch(urlLogin,options)
//     .then(response => response.json())
//     .then(data => {
//        if(data.code === 101){
//            if(failLoginMessage){
//                formElement.classList.add('invalid');
//                failLoginMessage.innerText = data.error;
//                for(var formGroup of allFormGroup){
//                    formGroup.classList.add('invalid')
//                }
//            }
//            return;
//        }
//     //    formElement.classList.remove('invalid');
//     //    failLoginMessage.innerText = '';
//     //    for(var formGroup of allFormGroup){
//     //         formGroup.classList.remove('invalid')
//     //     }

//        document.cookie = (data.sessionToken);
//        window.location.replace("http://localhost:1337/admin/dashbroad");
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     })
// }




    
    
