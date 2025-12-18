'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Landing() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('transformer-book-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setProgress(data.overallProgress || 0);
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 bg-aurora-layer-1" />
      <div className="absolute inset-0 bg-aurora-layer-2" />
      
      {/* Main content */}
      <main className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[clamp(32px,6vw,72px)] font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transformer Architecture
            </h1>
            <p className="text-[clamp(18px,3vw,24px)] text-gray-300 font-light">
              Interactive Learning Book
            </p>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Master transformer architecture from fundamentals to building your first AI agent. 
              Interactive visualizations, quizzes, and hands-on coding exercises.
            </p>
          </div>

          {/* Progress indicator */}
          {progress > 0 && (
            <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Your Progress</span>
                <span className="text-sm font-semibold text-purple-300">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Chapter cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ChapterCard
              number={1}
              title="Foundations"
              description="Tokens, embeddings, and the basics of neural language models"
              href="/chapter/1"
            />
            <ChapterCard
              number={2}
              title="Attention Mechanism"
              description="Self-attention, multi-head attention, and how transformers focus"
              href="/chapter/2"
            />
            <ChapterCard
              number={3}
              title="Transformer Architecture"
              description="Encoders, decoders, and the complete transformer model"
              href="/chapter/3"
            />
            <ChapterCard
              number={4}
              title="Build Your First Agent"
              description="Practical implementation with TypeScript Agent Toolkit"
              href="/chapter/4"
            />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/chapter/1"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChapterCard({ number, title, description, href }: { number: number; title: string; description: string; href: string }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('transformer-book-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompleted(data.chapters?.[number]?.completed || false);
    }
  }, [number]);

  return (
    <Link href={href}>
      <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-200 hover:border-purple-500/50 cursor-pointer">
        {completed && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl font-bold">
            {number}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-300 transition-colors">
              {title}
            </h3>
            <p className="text-gray-400 text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

