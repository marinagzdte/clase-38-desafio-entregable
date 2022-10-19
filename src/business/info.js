import os from "os";

export const getInfo = () => {
    return {
        os: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        directory: process.cwd(),
        pid: process.pid,
        path: process.execPath,
        args: process.argv,
        cpus: os.cpus().length
    };
}