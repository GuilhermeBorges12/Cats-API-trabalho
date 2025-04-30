import axios from 'axios';

const API_KEY = 'live_UpTfNg7PkwEs5qWQHupp4Y4W7uSYxtlh3idcg73WzTj2VYo8B3AXedujlHM9i6lt'; // Mantenha sua API Key
const BASE_URL = 'https://api.thecatapi.com/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
  },
});

export const fetchBreeds = async () => {
  try {
    // Pede raças que tenham imagem associada para melhor visualização inicial
    const response = await apiClient.get('/breeds?attach_image=1');
    // Filtra raças que realmente vieram com uma imagem na propriedade 'image'
    return response.data.filter(breed => breed.image?.url);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    throw error; // Propaga o erro para ser tratado na UI
  }
};

// Modificada para buscar MÚLTIPLAS imagens e detalhes completos
export const fetchBreedDetailsWithImages = async (breedId, imageLimit = 5) => {
  try {
    // Busca múltiplas imagens para a raça específica
    const imageResponse = await apiClient.get(`/images/search?breed_ids=${breedId}&limit=${imageLimit}`);

    // Verifica se encontrou imagens e detalhes da raça nelas
    if (imageResponse.data && imageResponse.data.length > 0 && imageResponse.data[0].breeds && imageResponse.data[0].breeds.length > 0) {
      const breedData = imageResponse.data[0].breeds[0];
      // Mapeia as URLs das imagens encontradas
      const imageUrls = imageResponse.data.map(img => img.url);
      // Retorna os detalhes da raça e a lista de URLs de imagem
      return { ...breedData, images: imageUrls };
    } else {
      // Fallback: Se não encontrou imagens ou detalhes nelas, busca a raça diretamente
      // Isso é menos comum se a raça existe, mas é uma salvaguarda
      console.warn(`Could not find images or breed details in image search for ${breedId}. Fetching breed info directly.`);
      const breedResponse = await apiClient.get(`/breeds/${breedId}`);
       // Tenta buscar imagens novamente, pode retornar vazio []
       const fallbackImageResponse = await apiClient.get(`/images/search?breed_ids=${breedId}&limit=${imageLimit}`);
       const fallbackImageUrls = fallbackImageResponse.data.map(img => img.url);
      // Retorna os dados da raça e as imagens (pode ser uma lista vazia)
      return { ...breedResponse.data, images: fallbackImageUrls };
    }
  } catch (error) {
    console.error(`Error fetching details and images for breed ${breedId}:`, error);
    throw error; // Propaga o erro
  }
};