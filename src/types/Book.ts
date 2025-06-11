export interface Book {
  id: string; // Cosmos DB id
  bookId: string; //partition key
  title: string;
  description: string;
  author: string;
  ageRange: string;
  coverImageUrl: string; //Relative URL to the cover image blob
  createdAt: string; //ISO string
  updatedAt: string;
  version: string;
}


export interface BookDetail {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  coverImageUrl: string;
  description: string;
}


export interface BookCover {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  coverImageUrl: string;
}


export interface Page {
  id: string;
  title: string;
  author: string;
  ageRange: string;
  coverImageUrl: string;
}