import {
    plantABI,
    landABI
} from "./abi.js"


let bsc = "https://bsc-dataseed1.ninicoin.io/";
let web3 = new Web3(Web3.givenProvider || bsc);

export const plantContract = new web3.eth.Contract(plantABI, PLANT_CONTRACT);
export const landContract = new web3.eth.Contract(landABI, LAND_CONTRACT);