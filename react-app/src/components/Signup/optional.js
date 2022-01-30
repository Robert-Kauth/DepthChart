import * as Yup from "yup";


Yup.addMethod( Yup.object, 'optional', function (isOptional=true, defaultValue=undefined){
    return(this.transform(function(value){
        if (!isOptional) return value;

        if (value && Object.values(value).some(v => !(v===null|| v === undefined || v === ""))){
            return value;
        }
        return defaultValue;
    }).default(defaultValue)
    );
});
