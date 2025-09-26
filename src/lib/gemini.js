import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

// Initialize Gemini AI only if API key is available
if (API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
  }
}

// Website content for context
const websiteContext = `
WorkflowGene Cloud is a comprehensive business automation platform that helps organizations transform their operations through intelligent workflow automation.

Key Features:
- Visual Workflow Builder: Drag-and-drop interface for creating complex automation workflows
- AI-Powered Intelligence: Machine learning algorithms for workflow optimization
- 500+ Integrations: Connect with popular business applications
- Industry-Specific Solutions: Tailored for Education, Healthcare, and E-Commerce
- Enterprise Security: SOC 2 Type II, GDPR, HIPAA compliant
- Advanced Analytics: Real-time dashboards and performance metrics

Industries Served:
1. Education: Student enrollment, grading automation, faculty scheduling, FERPA compliant
2. Healthcare: Patient scheduling, medical records, HIPAA compliant workflows
3. E-Commerce: Order processing, inventory management, customer service automation

Pricing:
- Starter: Free plan with 5 workflows, 1,000 monthly executions
- Professional: $200/month with 50 workflows, 10,000 executions
- Enterprise: Custom pricing with unlimited workflows and dedicated support

Company Information:
- Founded in 2019 by Sarah Chen and Marcus Rodriguez
- 500+ enterprise clients
- 50M+ workflows automated
- 99.9% uptime SLA
- 24/7 global support

Contact Information:
- Sales: sales@workflowgene.cloud
- Support: support@workflowgene.cloud
- General: hello@workflowgene.cloud
- Demo booking: https://calendly.com/workflowgene/30min
`;

export const generateResponse = async (userMessage) => {
  // Check if model is available
  if (!model) {
    return {
      success: false,
      error: 'AI service not configured. Please check your Gemini API key configuration.'
    };
  }

  // Validate input
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return {
      success: false,
      error: 'Please provide a valid message.'
    };
  }

  try {
    const prompt = `
You are a helpful AI assistant for WorkflowGene Cloud, a business automation platform. 
Use the following context about the company to answer user questions accurately and helpfully.

Context: ${websiteContext}

User Question: ${userMessage}

Please provide a helpful, accurate response based on the context provided. If the question is outside the scope of WorkflowGene Cloud, politely redirect the conversation back to how WorkflowGene can help with their automation needs.

Keep responses concise but informative, and always be helpful and professional.
`;

    const result = await model.generateContent(prompt);
    
    if (!result || !result.response) {
      throw new Error('Invalid response from AI service');
    }
    
    const response = await result.response;
    const text = response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from AI service');
    }

    return {
      success: true,
      message: text.trim()
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Handle specific error cases
    if (error.message?.includes('API_KEY_INVALID')) {
      return {
        success: false,
        error: 'Invalid API key. Please check your Gemini API configuration.'
      };
    }
    
    if (error.message?.includes('QUOTA_EXCEEDED')) {
      return {
        success: false,
        error: 'API quota exceeded. Please try again later.'
      };
    }
    
    if (error.message?.includes('SAFETY')) {
      return {
        success: false,
        error: 'I cannot process this request due to safety guidelines. Please rephrase your question.'
      };
    }

    return {
      success: false,
      error: 'I\'m experiencing technical difficulties. Please try again or contact our support team at support@workflowgene.cloud'
    };
  }
};