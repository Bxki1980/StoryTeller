import axiosInstance from '~/api/axiosInstance';

export interface ReadingProgressDto {
  userId: string;
  bookId: string;
  sectionIndex: number;
}

export const ReadingService = {
  async saveProgress(bookId: string, sectionIndex: number, userId: string) {
    const dto: ReadingProgressDto = { bookId, sectionIndex, userId };
    await axiosInstance.post('/reading-progress', dto);
  },

  async getProgress(bookId: string, userId: string): Promise<number | null> {
    try {
      const response = await axiosInstance.get<ReadingProgressDto>(
        '/reading-progress',
        { params: { bookId, userId } }
      );
      return response.data.sectionIndex;
    } catch (err) {
      return null; // if not found, start from 0
    }
  },
};
