import { GoogleGenAI, Type } from "@google/genai";
import { DATABASES } from "../constants.ts";
import { SEARCH_WORKFLOW_CONFIG } from "../search.config.ts";
import type { DatabaseRecommendation } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      databaseName: {
        type: Type.STRING,
        description: "The name of the recommended database, exactly as it appears in the provided list's `database_name` field.",
      },
      reason: {
        type: Type.STRING,
        description: "A brief, one-sentence justification for recommending this database based on the citation's content and the database's metadata.",
      },
      searchPlan: {
        type: Type.ARRAY,
        description: "A step-by-step plan for using the database's advanced search. This should map dissected citation components to the database's specific search fields.",
        items: {
            type: Type.OBJECT,
            properties: {
                field: {
                    type: Type.STRING,
                    description: "The database search field to use (e.g., 'Title', 'Author', 'Journal'). Must exactly match an entry from that database's `search_fields` list.",
                },
                value: {
                    type: Type.STRING,
                    description: "The corresponding value extracted from the citation to input into the search field.",
                }
            },
            required: ["field", "value"],
        }
      }
    },
    required: ["databaseName", "reason", "searchPlan"],
  },
};

export const findDatabasesForCitation = async (citation: string): Promise<DatabaseRecommendation[]> => {
  const databaseListString = JSON.stringify(DATABASES, null, 2);
  const workflowConfigString = JSON.stringify(SEARCH_WORKFLOW_CONFIG, null, 2);

  const prompt = `You are a hyper-specialized academic research assistant. Your sole purpose is to execute a precise, multi-step search workflow to find the best databases for a given citation. You MUST strictly adhere to the provided workflow and search configuration.

  **CRITICAL INSTRUCTIONS:**
  1.  **Follow the Workflow:** The 'workflow' object below dictates the exact sequence of actions you must take. Follow it step-by-step.
  2.  **Use the Search Configuration:** The 'search_config' object provides the rules for prioritization, normalization, and fallbacks. You must use these rules to make your decisions.
  3.  **Synthesize, Do Not Guess:** Your recommendations must be a direct result of applying the workflow to the citation and the list of available databases. Your 'reason' for each recommendation should explicitly reference the workflow step or search configuration rule that led you to that choice (e.g., "High-priority LIS database as per workflow step 4," or "Secondary database match based on Title and Author search.").
  4.  **Create Precise Search Plans:** For each recommendation, map the dissected citation components (Author, Title, Journal, etc.) to the EXACT field names available in that database's \`search_fields\`. Do not invent fields.

  **Workflow & Configuration:**
  \`\`\`json
  ${workflowConfigString}
  \`\`\`

  **List of Available Databases (with detailed metadata):**
  \`\`\`json
  ${databaseListString}
  \`\`\`

  **User's Citation:**
  "${citation}"

  Now, execute the "Bulletproof Academic Search" workflow. Provide your response ONLY as a JSON array of objects that strictly adheres to the defined schema. Ensure 'databaseName' exactly matches a 'database_name' from the list, and the 'field' in the search plan exactly matches a value from that database's 'search_fields'.`;


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1,
      },
    });

    const jsonText = response.text.trim();
    const recommendations = JSON.parse(jsonText);

    // Filter out any recommendations that are not in the original list
    const validDatabaseNames = DATABASES.map(db => db.database_name);
    const validRecommendations = recommendations.filter((rec: any) =>
      validDatabaseNames.includes(rec.databaseName) && rec.searchPlan && rec.searchPlan.length > 0
    );

    if (validRecommendations.length === 0) {
      throw new Error("AI returned no valid database recommendations with a search plan.");
    }
    
    return validRecommendations;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to process the citation with the AI model.");
  }
};