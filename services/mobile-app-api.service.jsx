import api from './api.service';

const mobileAppApiService = {
  test: (data) => api.post('/sample/addtest', data),
  login: (data) => api.post('/app/login', data),
  signup: (data) => api.post('/app/signup', data),
  location: (data) => api.post('/app/inputlocation', data),

  get: (endpoint) => api.get(endpoint),
  post: (endpoint, data) => api.post(endpoint, data),
  postFile: (endpoint, formData) => api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default mobileAppApiService;