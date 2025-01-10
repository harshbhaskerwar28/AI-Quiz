'use server'

const apiKey = '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'

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export async function generateQuestions(category: string, level: number, count: number): Promise<Question[]> {
  const difficulty = getLevelDescription(level);
  const prompt = `Generate ${count} multiple-choice questions about ${category} for ${difficulty} level. Each question should have 4 options with only one correct answer.`;

  const schema = {
    type: "object",
    properties: {
      questions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            options: {
              type: "array",
              items: { type: "string" },
              minItems: 4,
              maxItems: 4
            },
            correctAnswer: { type: "string" }
          },
          required: ["question", "options", "correctAnswer"]
        }
      }
    },
    required: ["questions"]
  };

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a quiz question generator that outputs questions in JSON format. The JSON object must use the following schema: ${JSON.stringify(schema, null, 2)}`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 1,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Unexpected API response format');
    }

    const parsedContent = JSON.parse(data.choices[0].message.content);
    return parsedContent.questions;
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}

function getLevelDescription(level: number): string {
  switch (level) {
    case 1:
      return 'beginner (junior school)'
    case 2:
      return 'intermediate (high school)'
    case 3:
      return 'expert (scientist)'
    case 4:
      return 'master (professor)'
    case 5:
      return 'genius (Nobel laureate)'
    default:
      return 'intermediate'
  }
}

