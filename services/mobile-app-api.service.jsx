import api from './api.service';

const sampleApiService = {
  test: (data) => api.post('/sample/addtest', data),
  login: (data) => api.post('/app/login', data),

  get: (endpoint) => api.get(endpoint),
  post: (endpoint, data) => api.post(endpoint, data),
  postFile: (endpoint, formData) => api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default sampleApiService;