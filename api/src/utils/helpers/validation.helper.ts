import moment from "moment";
class ValidationHelper {
    static typeMap:any = {
        INTEGER: 'number',
        ARRAY : 'object',
        BOOLEAN: 'boolean',
        STRING: 'string',
        TEXT: 'string',
        ENUM: 'string',
        DATE: 'string',
        FLOAT: 'number',
        JSONTYPE: 'object',
        BIGINT: 'number',
        SMALLINT: 'number',
        DOUBLE: 'number',
    };

    static checkRequestBody(attributes: any, body: any, templates: string[]) : string[] | any{
        const errors: string[] = [];
        const reqObj:any = {};
        for(let i = 0; i < templates.length; i++){
            const key = templates[i];
            
            if ((body[key] === null || body[key] === undefined)) {
                if(attributes[key].allowNull === false){
                    errors.push(`${key} can't be null.`);
                    continue;
                }else{
                    reqObj[key] = null;
                    continue;
                }
            }

            if (attributes[key].type.constructor.name === 'INTEGER' && typeof body[key] !== 'number') {
                errors.push(`${key} must be a non-null integer.`);
                continue;
            }

            if (attributes[key].type.constructor.name === 'BOOLEAN' && typeof body[key] !== 'boolean') {
                errors.push(`${key} must be a boolean value (true | false).`);
                continue;
            }

            if (attributes[key].type.constructor.name === 'FLOAT' && typeof body[key] !== 'number') {
                errors.push(`${key} must be a non-null float(0.00).`);
                continue;
            }

            if (attributes[key].type.constructor.name === 'DOUBLE' && typeof body[key] !== 'number') {
                errors.push(`${key} must be a non-null double(0.00).`);
                continue;
            }
            
            if(attributes[key].type.constructor.name === 'DATE' && typeof body[key] !== 'string'){
                if(attributes[key].allowNull) continue;
                errors.push(`${key} must be a non-null date string`);
                continue;
            }
            else if(attributes[key].type.constructor.name === 'DATE' && typeof body[key] === 'string'){
                if(!moment(body[key]).isValid()){
                    errors.push(`${key} must be a valid date string`);
                    continue;
                }
            }

            if(attributes[key].type.constructor.name === 'ARRAY'){
                if(!Array.isArray(body[key])){
                    errors.push(`${key} is an ARRAY.`);
                    continue;
                }
            }else if(attributes[key].type.constructor.name === 'ENUM'){
                if(!body[key] && attributes[key].allowNull === true){
                    continue;
                }
                else if(typeof body[key] !== 'string'){
                    errors.push(`${key} is an string with one of the values(${attributes[key].values.join(',')})`);
                    continue;
                }else{
                    if(!attributes[key].values.find((e: string) =>e === body[key])){
                        errors.push(`${key} is an string with one of the values(${attributes[key].values.join(',')})`);
                        continue;
                    }
                }
            }
            if(this.typeMap[attributes[key].type.constructor.name] !== typeof body[key] && attributes[key].allowNull === false){
                errors.push(`${key} is of type ${attributes[key].type.constructor.name}`);
                continue;
            }else{
                if(key.includes('email')){
                    reqObj[key] = body[key].trim().toLowerCase();
                }else{
                    reqObj[key] = body[key];
                }
            }

        }

        return errors.length ? errors: reqObj;
    };

    static hasDuplicateId(objectsArray: any[], id: string): boolean{
        if(!objectsArray.length) return false;
        const idSet = new Set();
        for (const obj of objectsArray) {
          if (idSet.has(obj[id])) {
            return true;
          }
          idSet.add(obj[id]);
        }
        return false;
    };

    static isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
    
};

class PasswordValidator {
  static validatePassword(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 6)
      errors.push("password must be at least 6 characters");
    return errors;
  }
}

export { ValidationHelper, PasswordValidator };