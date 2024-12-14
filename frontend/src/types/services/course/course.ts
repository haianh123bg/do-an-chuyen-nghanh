
/**
 * Course Creation
 */

export interface CourseFormData {
    title: string;
    subtitle: string;
    description: string;
    language: string;
    level: string;
    category: string;
    primarySubject: string;
    courseImage?: File;
  }
  
  export type ContentType = 'video' | 'article';
  export type QuestionType = 'multiple_choice' | 'coding';
  export type ItemType = 'lecture' | 'quiz' | 'coding_exercise' | 'practice_test' | 'assignment';
  
  export interface ContentItem {
    type: ContentType;
    title: string;
    content: string | File;
    completed?: boolean;
  }
  
  export interface Question {
    id: string;
    question: string;
    type: 'multiple_choice';
    options: string[];
    correctAnswer: number;
  }
  
  export interface CodingExercise {
    id: string;
    title: string;
    description: string;
    testFile: File;
    completed?: boolean;
  }
  
  export interface PracticeTest {
    id: string;
    title: string;
    questions: Question[];
    completed?: boolean;
  }
  
  export interface Assignment {
    id: string;
    title: string;
    description: string;
    attachments: File[];
    completed?: boolean;
  }
  
  export interface LectureItem {
    id: string;
    type: 'lecture';
    title: string;
    contents: ContentItem[];
    completed?: boolean;
  }
  
  export interface QuizItem {
    id: string;
    type: 'quiz';
    title: string;
    questions: Question[];
    completed?: boolean;
  }
  
  export interface CodingExerciseItem {
    id: string;
    type: 'coding_exercise';
    exercise: CodingExercise;
    completed?: boolean;
  }
  
  export interface PracticeTestItem {
    id: string;
    type: 'practice_test';
    test: PracticeTest;
    completed?: boolean;
  }
  
  export interface AssignmentItem {
    id: string;
    type: 'assignment';
    assignment: Assignment;
    completed?: boolean;
  }
  
  export type CurriculumItem = LectureItem | QuizItem | CodingExerciseItem | PracticeTestItem | AssignmentItem;
  
  export interface Section {
    id: string;
    title: string;
    items: CurriculumItem[];
    completed?: boolean;
  }
  
  export interface SidebarItem {
    id: string;
    title: string;
    selected: boolean;
  }
  
  export function isLectureItem(item: CurriculumItem): item is LectureItem {
    return item.type === 'lecture';
  }
  
  export function isQuizItem(item: CurriculumItem): item is QuizItem {
    return item.type === 'quiz';
  }
  
  export function isCodingExerciseItem(item: CurriculumItem): item is CodingExerciseItem {
    return item.type === 'coding_exercise';
  }
  
  export function isPracticeTestItem(item: CurriculumItem): item is PracticeTestItem {
    return item.type === 'practice_test';
  }
  
  export function isAssignmentItem(item: CurriculumItem): item is AssignmentItem {
    return item.type === 'assignment';
  }
  
  export interface IntendedLearner {
    id: string;
    description: string;
  }
  
  export interface CourseStructure {
    id: string;
    title: string;
    description: string;
    duration: string;
  }
  
  export interface TestVideo {
    id: string;
    title: string;
    video: File;
    thumbnail?: File;
  }
  
  export interface PlanYourCourse {
    intendedLearners: IntendedLearner[];
    courseStructure: CourseStructure[];
    testVideo: TestVideo | null;
  }
  