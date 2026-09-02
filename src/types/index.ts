export type Grade = 1 | 2;
export type Semester = 1 | 2;

export type UnitCategory = 'numbers' | 'operations' | 'geometry' | 'measurement' | 'multiplication';

export type ManipulativeType = 
  | 'clock' 
  | 'coins' 
  | 'base10' 
  | 'ruler' 
  | 'mult_grid' 
  | 'vertical_arithmetic' 
  | 'ten_split'
  | 'animal_counter'
  | 'shape_lab'
  | 'balance_scale'
  | 'capacity_lab'
  | 'area_grid'
  | 'data_graph'
  | 'fraction_pie'
  | 'calendar_lab'
  | 'unit_length'
  | 'number_line';

export interface LessonStory {
  character: string;
  scene: string;
  dialogue: string;
  task: string;
}

export interface LessonRhyme {
  title: string;
  lines: string[];
}

export interface LessonStep {
  stepNum: number;
  stepTitle: string;
  stepDesc: string;
  tip?: string;
}

export interface LessonWarmup {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Unit {
  id: string;
  grade: Grade;
  semester: Semester;
  category: UnitCategory;
  order: number;
  title: string;
  titleBpmf: string;
  subtitle: string;
  description: string;
  icon: string;
  themeColor: string;
  manipulativeType: ManipulativeType;
  keyConcepts: string[];
  learningGoals: string[];
  story?: LessonStory;
  rhyme?: LessonRhyme;
  lessonSteps?: LessonStep[];
  warmup?: LessonWarmup;
}

export interface QuestionOption {
  id: string;
  text: string;
  textBpmf?: string;
  imageUrl?: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  unitId: string;
  grade: Grade;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'choice' | 'interactive_tool' | 'fill_in' | 'vertical_step';
  title: string;
  titleBpmf: string;
  promptAudioText: string;
  storyContext?: string;
  manipulativeType?: ManipulativeType;
  options?: QuestionOption[];
  correctAnswer: any;
  hint: string;
  hintBpmf?: string;
  explanation: string;
  initialToolState?: any;
}

export interface MistakeRecord {
  questionId: string;
  unitId: string;
  userAnswer?: any;
  wrongCount: number;
  lastWrongTime: string;
  timestamp?: number;
}

export interface UnitProgressData {
  stars: number;
  highScore?: number;
  attempts: number;
  completedAt?: string;
}

export interface UserProgress {
  totalStars: number;
  starsTotal?: number;
  completedQuestions?: string[];
  wrongQuestionIds?: string[];
  mistakeHistory: MistakeRecord[];
  preferences: {
    bopomofo: boolean;
    speechAudio: boolean;
    soundFx: boolean;
  };
  unitProgress: Record<string, UnitProgressData>;
}
