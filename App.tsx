import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubjectSelection } from './components/SubjectSelection';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { useAppContext } from './contexts/AppContext';
import { QuizProvider } from './contexts/QuizContext';
import { MainLayout } from './components/MainLayout';

const App: React.FC = () => {
  const { subject, isSubjectLoading } = useAppContext();

  return (
    <div className="relative h-screen overflow-hidden lg:p-6">
      <BackgroundCanvas />
      <AnimatePresence mode="wait">
        {!subject ? (
            <motion.div
              key="subject-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <SubjectSelection />
            </motion.div>
          ) : isSubjectLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-lg font-semibold text-[var(--text-secondary)]">Loading...</div>
            </motion.div>
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <QuizProvider>
                <MainLayout />
              </QuizProvider>
            </motion.div>
          )
        }
      </AnimatePresence>
    </div>
  );
};

export default App;