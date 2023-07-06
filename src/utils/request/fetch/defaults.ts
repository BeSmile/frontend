import { FetchDefaults } from './types';
import { isFormData } from '@/utils/request/utils';

const defaults: FetchDefaults = {
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  },
  transformRequest: [
    function transformRequest(data, headers) {
      if (isFormData(data)) {
        // @ts-ignore
        headers.setContentType('application/x-www-form-urlencoded');
      } else {
        // @ts-ignore
        headers.setContentType('application/json');

        return JSON.stringify(data);
      }
      return data;
    },
  ],
};

export default defaults;
