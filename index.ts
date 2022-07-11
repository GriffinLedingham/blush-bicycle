import { BlushBicycle } from "./src/BlushBicycle";

const blushBicycle = new BlushBicycle();

setInterval(() => {
  blushBicycle.ride(
    "https://www.pinkbike.com/buysell/list/?lat=48.5081&lng=-123.4809&distance=37&category=2&price=..2000&framesize=23,27,34,35,36,30,31,47,32,37,38,39,40,48,49"
  );
}, 30000);
