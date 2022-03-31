function Validator(selector){
    var formRules = {};
    var $inputs = $('input.form-control');
    var validatorRules = {
        required : function(value){
            return value ? undefined : `Vui lòng nhập trường này`
        },

        space : function(formInput){
            return function(value){
                return value.includes(' ') ? `${formInput} chứa khoảng trắng` : undefined
            }
        },
        min : function(min){
            return function(value){
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
            }
        }
    }

    
    addRules();
    $(document).ready(function(){
        if($(selector)){   
            $inputs.blur(function(){          
                    var rulesTest = formRules[this.name];
                    for(var i=0 ; i<rulesTest.length;i++){
                        var errorMessage = rulesTest[i](this.value);
                        if(errorMessage){
                            var $formGroup = $(this).parent();
                            if($formGroup){
                                $formGroup.addClass('invalid');
                                var $formMessage = $formGroup.children('span');
                                if($formMessage){
                                    $formMessage.text(errorMessage);
                                }
                            }
                            break;
                        }   
                    }
                    
                }
            )      
            $inputs.on('input', function() {  
                    var text = $(this).val();
                    if(text){
                        var $formGroup = $(this).parent();
                        if($formGroup.hasClass('invalid')){
                            $formGroup.removeClass('invalid');
                            var $formMessage = $formGroup.children('span');
                            if($formMessage){
                                $formMessage.text('');
                            }
                        }
                    }
                
              });

              $(selector).submit(function(event){
                event.preventDefault();
                var isValid = true;
                for(var $input of $inputs){
                    var rulesFunc = formRules[$input.name];
                    for(var i=0 ; i<rulesFunc.length;i++){
                        var errorMessage = rulesFunc[i]($input.value);
                        if(errorMessage){
                            isValid = false;
                            var $formGroup = $($input).parent();
                            if($formGroup){
                                $formGroup.addClass('invalid');
                                var $formMessage = $formGroup.children('span');
                                if($formMessage){
                                    $formMessage.text(errorMessage);
                                }
                            }
                            break;
                        }   
                    }
                }
                if(isValid){
                    var formValues = (Array.from($inputs)).reduce(function(values,input,index){     
                        values[input.name] = input.value;     
                       return values;
                    },{})
                    var dataForm = {
                        username:formValues.username,
                        password:formValues.password
                    }
                    postData(dataForm);     
                }

            })
        };
           
    })



    function addRules(){
        for(var $input of $inputs){
            var $rules = $($input).attr('rules').split('|');
            for (var $rule of $rules){
                var $ruleHasValue = $rule.includes(':');
                var $ruleInfor;
                if($ruleHasValue){
                    $ruleInfor = $rule.split(':');
                    $rule = $ruleInfor[0];
                }
                var $ruleFunc = validatorRules[$rule];
                if($ruleHasValue){
                    $ruleFunc = $ruleFunc($ruleInfor[1]);
                }

                if(!Array.isArray(formRules[$input.name])){
                    formRules[$input.name] = [$ruleFunc];
                }else{
                    formRules[$input.name].push($ruleFunc);
                }
            }
        }
        
    }

}
function postData(data){
    var $formLogin = $('#form-login');
    var $failLoginMessage = $formLogin.children('span');
    var $formGroup = $('.form-group') 
    var urlLogin = 'http://localhost:1337/api/login';
    var options = {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'X-Parse-Application-Id':'myAppId',
                  'X-Parse-REST-API-Key':'myRestApiKey',
                  'X-Parse-Revocable-Session':'1'
              
                },
                body: JSON.stringify(data),
            };
    fetch(urlLogin,options)
        .then(response => response.json())
        .then(data => {
            if(data.code === 101){
                if($failLoginMessage){
                    $formLogin.addClass('invalid');
                    $failLoginMessage.text(data.error);
                    for(var formGroup of $formGroup){
                        $(formGroup).addClass('invalid');
                    }
                }
                return;
            }

        document.cookie = (data.sessionToken);
        console.log(data);
        window.location.replace("http://localhost:1337/admin/dashbroad");
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}