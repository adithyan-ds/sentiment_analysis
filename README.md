# AI Sentiment Analyzer

A full-stack web application that uses Natural Language Processing (NLP) to analyze the emotional tone of text in real-time. Built with a modern, glassmorphism UI and powered by a state-of-the-art RoBERTa machine learning model.

##  Live Demo
[View Live Application](https://sentiment-analysis-murex-beta.vercel.app)

##  Tech Stack
* **Frontend:** React, Vite, Tailwind CSS v4
* **Backend:** Node.js, Express.js
* **AI/ML:** Hugging Face Inference API (`cardiffnlp/twitter-roberta-base-sentiment-latest`)
* **Deployment:** Vercel (Frontend), Render (Backend)

##  Features
* **Real-time Neural Analysis:** Processes text input instantly to determine if the sentiment is Positive, Negative, or Neutral.
* **Confidence Scoring:** Returns a granular probability percentage mapping the AI's confidence in its assessment.
* **Premium Dark-Mode UI:** Features dynamic CSS glassmorphism, glowing gradients, and animated state transitions based on the API's response.
* **Secure Architecture:** Backend acts as a secure proxy to protect AI API tokens from public client-side exposure.

##  Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/sentiment_analysis.git](https://github.com/your-username/sentiment_analysis.git)