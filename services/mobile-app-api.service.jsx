import api from './api.service';

const MobileAppApiService = {
  addTest: (data) => api.post('/sample/addtest', data),

  get: (endpoint) => api.get(endpoint),
  post: (endpoint, data) => api.post(endpoint, data),
  
  postFile: (endpoint, formData) => api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default MobileAppApiService;