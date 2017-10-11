/**
 * middleware 
 */

exports.routes = {
    all:[],
    get:[],
    put:[],
    delete:[],
    post:[],
}

/**
 * creat pathname
 */

const pathRegexp = function(path){
  const keys = [];
  path = path
    .concat(strict ? '' : '/?')
    .replace(/\/\(/g, '?:/')
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,function(_, slash, format, key, capture, optional, star) {
      keys.push(key); //将值存放起来
      slash = slash || '';
      return ''
       +(optional ? '' : slash)
       +'(?:'
       +(optional ? slash : '')
       +(format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
       +(optional || '')
       +(star ? '(/*)?' : '');
    })
    .replace(/([\/.])/g, '\\$1')
    .replace(/\*/g, '(.*)');
    return {
      keys:keys,
      regexp:new RegExp('^'+path+'$')
    }
}

/**
 * handle
 */
const handle = function(req, res, stack){
    const next = function(){
        const middleware = stack.shift();
        if(middleware){
            middleware(req, res, next);
        }
    }
    next();
}


/**
 * use
 * @param path
 */
exports.use = function(path){
    const handle = {
        path:pathRegexp(path),
        stack:Array.prototype.slice(arguments, 1)
    }
    routes.all.push(handle);
}

/**
 * add reflect
 */
exports.get = function(path, action){
    routes['get'].push({
         path:pathRegexp(path),
         stack:Array.prototype.slice(arguments, 1)
    });
    use(path);
}



exports.post = function(path, action){
    routes['post'].push({
         path:pathRegexp(path),
         stack:Array.prototype.slice(arguments, 1)
    });
    use[path];   
}

exports.delete = function(path, action){
    routes['delete'].push({
        path:pathRegexp(path),
        stack:Array.prototype.slice(arguments, 1)
    });
    use(path);
}

exports.put = function(path, action){
    routes['put'].push({
        path:pathRegexp(path),
        stack:Array.prototype.slice(arguments, 1)
    });
    use(path);
}

/**
 * match
 */
exports.match = function(pathname, routes){
    let stacks = [];
    for(const i=0; i<routes.length; i++){
        const route = routes[i];

        const reg = route.path.regexp;
        const keys = route.path.keys;

        const matched = reg.exec(pathname);
        if(matched){
            const param = {};
            for(const j=0; j<keys.length; k++){
                const value = matched[i+1];
                if(value){
                    param[keys[i]] = value;
                }
            }
            req.param = param;
            stacks = stacks.concat(route.stack);
        }
    }
    return stack;
}
module.exports = exports;

