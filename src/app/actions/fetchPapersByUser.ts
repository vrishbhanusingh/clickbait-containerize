'use server';

import { db } from '~/server/db';
import { papers, generatedTitles3 } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export const fetchPapersByUser = async (userId) => {
  try {
    // Fetch all papers for the given userId
    const result = await db
      .select()
      .from(papers)
      .where(eq(papers.userId, userId));

    // Fetch generated titles and add them to the papers
    const resultsWithTitle = await Promise.all(result.map(async (paper) => {
      const generatedTitle = await db.select()
        .from(generatedTitles3)
        .where(eq(generatedTitles3.paperId, paper.id));
        
      // Extract and clean the generated title
      const title = generatedTitle[0]?.generatedTitleGPT.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim() || '';
      const titleLlama = generatedTitle[0]?.generatedTitleLlama;
      // Return the paper object with the added title field
      return { ...paper, title , titleLlama };
    }));

    return resultsWithTitle;
  } catch (error) {
    console.error('Error fetching papers:', error);
    throw error;
  }
};