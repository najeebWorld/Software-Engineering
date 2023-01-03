export const postMessage = (path, body) => {
    try{
        fetch(`http://10.0.2.2:8080/api/${path}`,{
            method:'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    }catch(err) {
        alert(`${err.message},path:  ${path}`);
    }
}

export const getMessage = async (path) => {
    try{
        const data = await fetch(`http://10.0.2.2:8080/api/${path}`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return data.json();
    }catch(err){
        alert(`${err.message},path:  ${path}`);
    }
}