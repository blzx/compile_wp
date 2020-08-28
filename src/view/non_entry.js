let getComponent = async() => {
    const element = document.createElement('div');
    const {default: _} = await import(/* webpackChunkName: "lodash" */ 'lodash' )
    // /* webpackChunkName: "lodash" */  这种写法让 bundle 被命名为 lodash.bundle.js ，
    // 而不是 [id].bundle.js(node_modules_lodash_lodash_js.bundle.js)
    element.innerHTML = _.join(['Hello','Webpack'], ' ');
    return element;
}
getComponent().then(element => {
    document.body.appendChild(element)
})