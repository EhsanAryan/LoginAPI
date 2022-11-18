const dataState = {
    userData : null ,
    isToken : false ,
    loading : false
}

const dataReucer = (prevState = dataState , action) => {
    switch (action.type) {
        case "get-token" :
            return {...prevState , isToken : true}
            break;

        case "send-request" :
            return {...prevState , loading : true}
            break;

        case "get-response":
            return {userData : action.payload , isToken : true , loading : false}
            break;

        case "no-data" :
            return {userData : null , isToken : false , loading : false}
            break;
    
        default:
            return prevState;
            break;
    }
}

export default dataReucer;