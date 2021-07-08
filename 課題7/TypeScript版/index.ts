import { clientServer } from "./clientServer";
import { resCacheServer } from "./resCacheServer";
const clientPort = 4040;
const resCachePort = 4000;

resCacheServer(resCachePort);
clientServer(clientPort);