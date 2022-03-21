import { URLS } from "./Routes";
import axios from "axios";

export class APIService {
    static deleteGrade = (id) => {
        console.log("deleteGrade triggered")
        const url = `${URLS.DELETE.GRADE_BY_ID}${id}`
        axios.delete(url).then((response) => {
            if (response.status === 200) {
                window.location.reload(false);
            }
        }).catch(error => {
            console.log(error)
        });
    }

    static updateGrade = (id, data) => {
        console.log("updateGrade triggered")
        const url = `${URLS.UPDATE.GRADE_BY_ID}${id}`
        const data_json = JSON.stringify(data)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };
        axios.put(url, data_json, { headers }).then((response) => {
            if (response.status === 200) {
                window.location.reload(false);
            }
        }).catch(error => {
            console.log(error)
        });
    }
}

