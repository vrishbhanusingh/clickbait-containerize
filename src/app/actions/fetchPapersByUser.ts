'use server';

import { db } from '~/server/db';
import { papers, generatedTitles2 } from '~/server/db/schema';
import { eq } from 'drizzle-orm';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';
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
        .from(generatedTitles2)
        .where(eq(generatedTitles2.paperId, paper.id));
        
      // Extract and clean the generated title
      const title = generatedTitle[0]?.generatedTitle.replace("::TITLESTART::", "").replace("::TITLEEND::", "").trim() || '';

      // Return the paper object with the added title field
      return { ...paper, title };
    }));

    return resultsWithTitle;
  } catch (error) {
    console.error('Error fetching papers:', error);
    throw error;
  }
};