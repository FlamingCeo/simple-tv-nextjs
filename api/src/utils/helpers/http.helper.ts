type ReqObj = {
    url: string;
    body?: string | Buffer | undefined;
    headers?: any;
};

const GetRequest = async (r_obj: ReqObj) => {
    return new Promise((resolve, reject)=>{
        fetch(r_obj.url, {method: "GET"}).then(data=>data.json()).then(data=>{
            resolve(data);
        }).catch(err => reject(err));
    });    
}

const PostRequest = async (r_obj: ReqObj) => {
    return new Promise((resolve, reject)=>{
        fetch(r_obj.url, {body: r_obj.body, headers: r_obj.headers, method: "POST"}).then(data=>data.json()).then(data=>{
            resolve(data);
        }).catch(err => reject(err));
    });
}

export const httpHelper = {
    GetRequest,
    PostRequest
};