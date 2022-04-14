  
  //Функция постинга данных, когда мы уже отправляем их на сервер. Делаем код синхронным, чтобы дождаться ответа сервера
  const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

 //Функция получения данных с сервера (карточек)
 const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Невозможно получить ${url}, status ${res.status}`);
    }
    return await res.json();
};

export {postData};
export {getResource};