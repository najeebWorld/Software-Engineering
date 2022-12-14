export const postMessage = async (path, body) => {
  let data = false;
  let payload = JSON.stringify(body);
  try {
    data = await fetch(`http://10.0.2.2:8080/api/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    });
    if (data) {
      return data.json().catch((err) => {
        console.log(
          `error in parsing json ${data.statusText}, error: ${err.message}`
        );
        return null;
      });
    }
  } catch (err) {
    alert(`${err}, path:  ${path}, data ${data}`);
  }
};

export const getMessage = async (path) => {
  try {
    const data = await fetch(`http://10.0.2.2:8080/api/${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if(data){
        return data.json().catch((err) => {
        console.log(
            `error in parsing json ${data}, error: ${err.message}`
        );
        return null;
        });
    }
  } catch (err) {
    alert(`${data},path:  ${path}`);
  }
};
