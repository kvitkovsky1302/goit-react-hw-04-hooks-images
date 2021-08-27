const API_KEY = '22470352-c65ac8cc67498f5a0ef8fcd03';
const BASE_URL = 'https://pixabay.com/api';

async function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

  const response = await fetch(url);
  const images = await response.json();
  //   this.setState({ loading: false });
  return images;
}

export default fetchImages;
