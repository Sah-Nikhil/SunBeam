import axios from 'axios';

const API_URL = '/api/library';

export const fetchBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const createBook = async (bookData: any) => {
  try {
    const response = await axios.post(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

export const updateBook = async (bookData: any) => {
  try {
    const response = await axios.put(API_URL, bookData);
    return response.data;
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (Book_ID: number) => {
  try {
    const response = await axios.delete(API_URL, { params: { Book_ID } });
    return response.data;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
