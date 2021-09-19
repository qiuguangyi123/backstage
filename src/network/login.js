import {request} from "@/network/index";
export function fSignln(url,params,method) {
    return request({url,params,method})
}