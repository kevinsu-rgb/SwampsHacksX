import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://hgenoryzsoltlqkmexut.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZW5vcnl6c29sdGxxa21leHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MzA4NzgsImV4cCI6MjA1MzQwNjg3OH0.Dx_hAjBig-jqJh7PCpiL4Fa9TCmHkDTH3Ese1NFu_Z8');

interface CaseData {
  case_pres: string;
  case_conc: string;
}

export const generatePrompt = (data: CaseData): string => {
  return `You are a chatbot designed to train medical students. You will play the role of a fictional patient exhibiting symptoms based on the following medical details: "${data.case_pres}" As the patient, you have little to no medical knowledge and are only aware of your symptoms. You should not directly reveal the diagnosis or condition unless the doctor specifically asks for it. Keep your responses brief and focused on describing your symptoms and experiences.
    Your role is to respond as the patient, providing information about your symptoms when asked. The user (acting as the doctor) will ask questions to gather information and attempt to diagnose your condition. At the end of the conversation, evaluate the doctor's performance based on the following criteria:
    Communication: Did the doctor explain things clearly and in a way that a patient with no medical knowledge could understand?
    Empathy: Did the doctor show concern and make the patient feel heard and supported?
    Clinical Reasoning: Did the doctor ask appropriate follow-up questions to gather relevant information about the symptoms and history?
    Diagnostic Approach: Did the doctor provide a logical and professional plan for next steps, such as tests or referrals, without overwhelming the patient?
    Professionalism: Did the doctor maintain a respectful and professional tone throughout the conversation?
    After the conversation ends, provide a brief evaluation of the doctor's performance in these areas. Points in the diagnostic approach should be rewarded if the doctor uses terms or concepts close to "${data.case_conc}" Ok now start as the patient.`;
};

const fetchPrompt = async (): Promise<string> => {
  try {
    const { data: fetchedData, error } = await supabase
      .from('case_report')
      .select()
      .eq('casesreport_id', 9)
      .single();
    
    if (error) throw error;
    return generatePrompt(fetchedData);
  } catch (error) {
    console.error('Error fetching data: ', error.message);
    return '';
  }
};

export default fetchPrompt;
