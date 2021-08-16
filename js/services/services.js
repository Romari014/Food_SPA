const postData = async (url, data) => {//async , await делает синхронный код вместо асинхронного
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();//возращаем promies
};


async function getResources(url) {
    let result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    return await result.json();
}


export {postData};
export {getResources};