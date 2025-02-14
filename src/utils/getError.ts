
export const getErrorMessage = (error : unknown) : string =>{
    let message : string;
    //if error is of type Error constuctor, return the message directly
    if (error instanceof Error){
        message = error.message;
        //if error is an object, check if there is message it in, and then return it
    } else if(error && typeof error === 'object' && 'message' in error){
        message = String(error.message);
        //if error is a string itself, return it
    } else if( typeof error === 'string'){
        message = error;
        //none of the conditions met, return unknow error
    } else {
        message = "Unknown error!"
    }
    return message;
}