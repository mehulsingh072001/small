const NodeMediaServer = require('node-media-server')
const config = require('./config/default').rtmp_server;
const User = require('./models/User')

nms = new NodeMediaServer(config);

nms.on('prePublish', async(id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath)
    console.log('[NodeEvent on prepublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`)

});

const getStreamKeyFromStreamPath = (path) => {
    let parts = path.split('/')
    return parts[parts.length -1]
};

module.exports = nms;
