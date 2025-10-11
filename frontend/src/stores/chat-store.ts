import { defineStore } from 'pinia';
import type { ChatMessage } from '../types/data';

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  triageLevel: 'routine' | 'urgent' | 'very-urgent' | 'emergency' | null;
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: [
      {
        id: '1',
        senderId: 'system',
        content: 'Hello! I\'m your virtual health assistant. How can I help you today?',
        timestamp: new Date().toISOString(),
        type: 'system'
      }
    ],
    loading: false,
    error: null,
    triageLevel: null
  }),

  getters: {
    getLastMessage: (state) => 
      state.messages[state.messages.length - 1] || null,
    
    getMessageHistory: (state) => 
      state.messages.filter(msg => msg.type !== 'system'),
  },

  actions: {
    async sendMessage(content: string) {
      this.loading = true;
      this.error = null;
      
      try {
        // Add user message
        const userMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          senderId: 'user',
          content,
          timestamp: new Date().toISOString(),
          type: 'user'
        };
        this.messages.push(userMessage);

        // Analyze symptoms and get bot response
        const response = await this.analyzeSymptoms(content);
        if (response) {
          this.triageLevel = response.level;
          const botMessage: ChatMessage = {
            id: Math.random().toString(36).substr(2, 9),
            senderId: 'bot',
            content: response.message,
            timestamp: new Date().toISOString(),
            type: 'bot',
            triageLevel: response.level
          };
          this.messages.push(botMessage);
        }
      } catch (error) {
        this.error = 'Failed to process message';
        console.error('Error in chat:', error);
      } finally {
        this.loading = false;
      }
    },

    async analyzeSymptoms(text: string) {
      // Mock API call for symptom analysis
      await new Promise(resolve => setTimeout(resolve, 1000));

      const symptoms = text.toLowerCase();
      if (symptoms.includes('chest pain') || symptoms.includes('difficulty breathing')) {
        return {
          level: 'emergency' as const,
          message: 'This appears to be an emergency situation. Please seek immediate medical attention or call emergency services.'
        };
      } else if (symptoms.includes('fever') || symptoms.includes('severe')) {
        return {
          level: 'urgent' as const,
          message: 'These symptoms require prompt medical attention. Please visit the nearest RHU within 24 hours.'
        };
      } else if (symptoms.includes('headache') || symptoms.includes('cough')) {
        return {
          level: 'routine' as const,
          message: 'Your symptoms suggest a routine condition. Would you like to schedule a check-up?'
        };
      }
      return {
        level: 'routine' as const,
        message: 'I understand. Would you like to schedule an appointment to discuss this with a doctor?'
      };
    },

    clearChat() {
      this.messages = [
        {
          id: '1',
          senderId: 'system',
          content: 'Hello! I\'m your virtual health assistant. How can I help you today?',
          timestamp: new Date().toISOString(),
          type: 'system'
        }
      ];
      this.triageLevel = null;
      this.error = null;
    }
  }
});