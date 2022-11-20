const pageName = window.location.pathname.replace(/\/+$/, '');

async function openPage(pageName) {
    const selectedMenuItem = document.querySelector('.selected');
    if (selectedMenuItem) {
        selectedMenuItem.classList.remove('selected');
    }
    const foundMenuItem = document.querySelector(`[data-route-path="${pageName}"]`);
    const defaultPageRoutePath = document.querySelector('.nav-link').dataset.routePath;
    if (foundMenuItem) {
        foundMenuItem.classList.add('selected')
    }
    else {
        console.log('page not found so default');
        const foundMenuItem = document.querySelector(`[data-route-path='${defaultPageRoutePath}']`);
        foundMenuItem.classList.add('selected')
    }
    await fetchHTMLContent(foundMenuItem ? pageName : defaultPageRoutePath);
    const event = new CustomEvent("PageReady");
    document.dispatchEvent(event);
}


const fetchHTMLContent = async (pageName) => {
    await fetch(`./static/src/pages${pageName}.html`)
        .then(res => res.text())
        .then(data => {
            const htmlScripts = data.match(/<script\b[^>]*>(.*?)<\/script>/gm);
            const html = getHTMLWithoutScripts(data, htmlScripts);
            if (window.history.state !== data) {
                window.history.pushState(data, pageName, pageName);
            } else {
                window.history.replaceState(data, pageName, pageName);
            }
            document.getElementById('content').innerHTML = html;

            if (htmlScripts?.length) {
                executeScriptsFromLoadedHTML(htmlScripts);
            }
        });
};

const getHTMLWithoutScripts = (html, scripts) => {
    if (!scripts?.length) return html;

    let htmlWithoutScripts = html;
    for (const htmlScript of scripts) {
        htmlWithoutScripts = htmlWithoutScripts.replace(htmlScript, '');
    }

    return htmlWithoutScripts;
}

const executeScriptsFromLoadedHTML = (scripts) => {
    if (document.getElementById('load-scripts')) {
        document.getElementById('load-scripts').remove();
    }
    const div = document.createElement('div');
    div.id = 'load-scripts';

    for (const htmlScript of scripts) {
        const src = new DOMParser()
            .parseFromString(htmlScript, 'text/html')
            .getElementsByTagName('script')[0]
            .src;
        const script = document.createElement('script');
        script.src = src;
        script.type='text/javascript';

        div.append(script);
    }
    document.body.append(div);
};

const popState = (event) => {
    if (!event.state) return;
    const htmlScripts = event.state.match(/<script\b[^>]*>(.*?)<\/script>/gm);
    const html = getHTMLWithoutScripts(event.state, htmlScripts);
    document.getElementById('content').innerHTML = html;
    const selectedMenuItem = document.querySelector('.selected');
    if (selectedMenuItem) {
        selectedMenuItem.classList.remove('selected');
    }
    const foundMenuItem = document.querySelector(`[data-route-path="${event.currentTarget.location.pathname}"]`);
    if (foundMenuItem) {
        foundMenuItem.classList.add('selected')
    }
    if (htmlScripts?.length) {
        executeScriptsFromLoadedHTML(htmlScripts);
    }

};

window.addEventListener('popstate', popState);


for (const navLink of document.querySelectorAll('.nav-link')) {
    navLink.addEventListener('click', el => {
        openPage(navLink.dataset.routePath);
    });
}

openPage(pageName);
