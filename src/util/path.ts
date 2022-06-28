import path from "path";

const appPath = require.main?.filename!;

export default path.dirname(appPath);
