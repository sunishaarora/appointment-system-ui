import axios from "axios";

const API_BASE_URL = "http://localhost:8080/management-system";

class ApptService {
    saveAppointment(appt) {
        return axios.post(`${API_BASE_URL}/appts`, appt);
    }

    deleteAppt(id) {
        return axios.delete(`${API_BASE_URL}/deleteAppt/${id}`);
    }

    getAppt(id) {
        return axios.get(`${API_BASE_URL}/appts/${id}`);
    }

    updateAppt(id, appt) {
        return axios.put(`${API_BASE_URL}/appts/updateAppt/${id}`, appt);
    }

    getAllAppts() {
        return axios.get(`${API_BASE_URL}/appts`);
    }
}

export default new ApptService();
