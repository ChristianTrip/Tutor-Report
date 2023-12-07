export function createRequestWithToken(method: string, bodyValues: any): RequestInit{
    return  {
        method: method,
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Connection': 'keep-alive',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyValues)
    }
}

export function createRequest(method: string, bodyValues: any): RequestInit{
    return  {
        method: method,
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            'Connection': 'keep-alive',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyValues)
    }
}