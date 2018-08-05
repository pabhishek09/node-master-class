let environments = {};
let config;

environments['dev'] = {
    env: 'dev',
    port: 3000
}

environments['prod'] = {
    env: 'prod',
    port: 8080
}

const hasUserDefinedEnv = typeof(process.env.NODE_ENV) === 'string'
if (hasUserDefinedEnv) {
    const userDefinedEnv = process.env.NODE_ENV.toLowerCase();
    config = environments.hasOwnProperty(userDefinedEnv)? environments[userDefinedEnv] : environments.dev;
} else {
    config = environments.dev;
}

module.exports = config;
