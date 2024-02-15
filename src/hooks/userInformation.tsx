import { useState, useEffect } from 'react';
import {
  setKey,
  fromLatLng,
} from "react-geocode";
import axios from 'axios';

const useVisitorData = () => {
  const [country, setCountry] = useState<string>('');

  useEffect(() => {
    const getVisitorInfo = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        const address = await getAddressFromCoords(latitude, longitude);
        setCountry(address.country);
        sendVisitorData(address.country, getDeviceType(), navigator.userAgent);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    const getCurrentLocation = () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const getAddressFromCoords = async (latitude: number, longitude: number) => {
      try {
        setKey(`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
        const response = await fromLatLng(latitude, longitude);
        const address = response.results[0].address_components;
        const countryObj = address.find((component: any) => component.types.includes('country'));
        return {
          country: countryObj.long_name,
          latitude,
          longitude
        };
      } catch (error) {
        console.error('Error getting address from coordinates:', error);
        return {};
      }
    };

    const sendVisitorData = async (country: string, deviceType: string, browserType: string) => {
      try {
        const response = await axios.post('/assessment', {
          country,
          device_type: deviceType,
          browser_type: browserType
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': `${process.env.REACT_APP_GROWTH_APP_KEY}`
          }
        });
        console.log(response.data);
        // Handle API response here (if needed)
      } catch (error) {
        console.error('Error sending visitor data:', error);
        // Handle error here
      }
    };

    const getDeviceType = () => {
      return /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    };

    getVisitorInfo();

  }, []);

  return { country };
};

export default useVisitorData;
