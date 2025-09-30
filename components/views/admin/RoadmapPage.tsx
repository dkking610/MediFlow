import React from 'react';
import Card from '../../common/Card';

// Icons for categories
const DeployIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const BackendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const AuthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const UiUxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const FeaturesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const TestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a4 4 0 00-5.656 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>;
const SecurityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l4.5-4.5m-2.121-2.121a2 2 0 012.828 0l2.828-2.828-2.828-2.828a2 2 0 010-2.828l2.828-2.828 2.828 2.828 2.828-2.828a2 2 0 012.828 2.828l-2.828 2.828 2.828 2.828m-4.5 4.5l-4.5 4.5" /></svg>;
const DocsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
// New AI Chatbot Icons
const NlpEngineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ConversationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const IntegrationsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const UserRolesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const AiCapabilitiesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const QualityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m-6-4l-1.5-1.5a1.5 1.5 0 010-2.121L5 7l1.5 1.5a1.5 1.5 0 010 2.121L5 12l-1.5 1.5a1.5 1.5 0 010 2.121L5 17l1.5-1.5a1.5 1.5 0 010-2.121L5 12zM19 3v4m2-2h-4m-2 14v4m2-2h-4m6-4l1.5 1.5a1.5 1.5 0 010 2.121L19 17l-1.5-1.5a1.5 1.5 0 010-2.121L19 12l1.5-1.5a1.5 1.5 0 010-2.121L19 7l-1.5 1.5a1.5 1.5 0 010 2.121L19 12z" /></svg>;

const roadmapData = {
    "project": "MediFlow",
    "improvements": {
      "deployment": [
        "Deploy to Vercel or Netlify with proper environment variables",
        "Add Docker support for consistent setup",
        "Set up CI/CD using GitHub Actions"
      ],
      "backend": [
        "Build Node.js/Express or NestJS backend",
        "Integrate with PostgreSQL or MongoDB for patient/staff data",
        "Implement secure APIs for appointments, billing, inventory"
      ],
      "authentication": [
        "Role-based login (Admin, Doctor, Nurse, Receptionist, Patient)",
        "OAuth2/Google login option",
        "Password reset and multi-factor authentication"
      ],
      "ui_ux": [
        "Responsive design for mobile/tablet",
        "Improve accessibility (ARIA, screen reader support)",
        "Form validation and error handling"
      ],
      "features": [
        "Appointment scheduling with calendar view",
        "Billing and invoice management",
        "Pharmacy and inventory tracking",
        "Automated reports and analytics dashboard",
        "Notification system (SMS/Email/Push)"
      ],
       "nlp_engine": [
        "Use advanced LLMs (OpenAI GPT-4.1 or Google Gemini 1.5) for natural conversations",
        "Fine-tune / customize intents for medical domain",
        "Multilingual support (English + Tamil + other regional languages)"
      ],
      "conversation_features": [
        "Context-aware memory (patient previous queries recall)",
        "Multi-turn conversations with follow-up understanding",
        "Voice input + speech-to-text and text-to-speech output",
        "Sentiment detection to handle patient stress or urgency"
      ],
      "integrations": [
        "Connect to hospital database (patients, doctors, appointments, billing, pharmacy)",
        "Integrate with EHR/EMR systems for secure medical data access",
        "Link with WhatsApp, Telegram, Web chat, and Mobile app",
        "Notification system integration (SMS, email, push alerts)"
      ],
      "user_roles": [
        "Patient: Appointment booking, health FAQs, prescription reminders",
        "Doctor: Quick patient record lookup, schedule reminders, dictation to notes",
        "Nurse/Staff: Duty shift reminders, inventory queries",
        "Admin: Reports, analytics, escalations"
      ],
       "ai_capabilities": [
        "Knowledge base FAQ auto-learning (train from hospital documents)",
        "Medical symptom checker with safe disclaimers",
        "Recommendation engine (nearest available doctor, best slot)",
        "AI-powered analytics (common queries, patient trends)"
      ],
       "security_compliance": [
        "HIPAA/GDPR compliance for patient data",
        "End-to-end encryption of conversations",
        "Role-based access for sensitive queries",
        "Audit logs for chatbot interactions"
      ],
       "professional_quality": [
        "Custom branded chatbot avatar and UI",
        "24x7 uptime with fallback to human agent",
        "Latency optimization for real-time responses",
        "Continuous model updates and monitoring"
      ],
      "testing_monitoring": [
        "Automated testing for conversation flows",
        "Real-time monitoring dashboard",
        "Error handling with graceful fallback",
        "Feedback loop for continuous improvement"
      ],
       "documentation": [
        "Improve README with screenshots and feature list",
        "Add API documentation (Swagger/OpenAPI)",
        "Contribution guidelines for developers"
      ]
    }
};

const categoryIcons: { [key: string]: React.ReactElement } = {
    deployment: <DeployIcon />,
    backend: <BackendIcon />,
    authentication: <AuthIcon />,
    ui_ux: <UiUxIcon />,
    features: <FeaturesIcon />,
    testing_monitoring: <TestIcon />,
    security_compliance: <SecurityIcon />,
    documentation: <DocsIcon />,
    nlp_engine: <NlpEngineIcon />,
    conversation_features: <ConversationIcon />,
    integrations: <IntegrationsIcon />,
    user_roles: <UserRolesIcon />,
    ai_capabilities: <AiCapabilitiesIcon />,
    professional_quality: <QualityIcon />,
};

const RoadmapPage: React.FC = () => {
    const formatTitle = (title: string) => {
        return title.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="space-y-8">
            <p className="text-lg text-text-secondary">
                Here's a look at the planned features and improvements for MediFlow. This roadmap outlines our vision for creating a more robust, secure, and user-friendly hospital management system.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(roadmapData.improvements).map(([category, items], index) => (
                    <Card key={category} className="slide-in-up-content flex flex-col" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="flex items-center mb-4">
                            {categoryIcons[category]}
                            <h3 className="ml-3 text-xl font-bold text-white">
                                {formatTitle(category)}
                            </h3>
                        </div>
                        <ul className="space-y-3 list-inside list-disc text-text-primary marker:text-accent-cyan">
                            {(items as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RoadmapPage;
