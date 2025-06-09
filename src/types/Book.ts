export interface Book {
  id: string; // Cosmos DB id
  bookId: string; //partition key
  title: string;
  description: string;
  author: string;
  ageRange: string;
  coverImageBlobUrl: string; //Relative URL to the cover image blob
  createdAt: string; //ISO string
  updatedAt: string;
  version: string;
}
