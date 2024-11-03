// src/lib/utils/fetchUtils.js

/**
 * @param {string | URL | Request} url
 */
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * @param {any[]} urls
 */
export async function fetchMultipleData(urls) {
  try {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}