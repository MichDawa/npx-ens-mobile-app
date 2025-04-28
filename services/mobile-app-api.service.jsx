import api from './api.service';

const mobileAppApiService = {
  test: (data) => api.post('/sample/addtest', data),
  login: (data) => api.post('/app/login', data),
  signup: (data) => api.post('/app/signup', data),
  location: (data) => api.post('/app/inputlocation', data),
  pinglocation: (data) => api.post('/app/pinglocation', data),
  weather: (locationData) => api.post('/app/weather', locationData),
  getEvacuationCenters: () => api.get('/web/getevacuationcenters'),
  getClosedRoads: () => api.get('/web/getclosedroads'),
  
  get: (endpoint) => api.get(endpoint),
  post: (endpoint, data) => api.post(endpoint, data),
  postFile: (endpoint, formData) => api.post(endpoint, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default mobileAppApiService;